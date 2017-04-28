import Config from '../Config';
export default class Start extends Phaser.State {
  private _block: Phaser.Sprite;
  private _player: Phaser.Sprite;
  private _ropeBitmapData: Phaser.BitmapData;
  private _line: Phaser.Sprite;
  public line: Phaser.Line;
  private _ropeAnchorX: number;
  private _ropeAnchorY: number;
  private _rope: Phaser.Physics.P2.Spring;

  private _bananas: Phaser.Group;
  private _pineapples: Phaser.Group;
  private _cherries: Phaser.Group;
  private _playerCollisionGroup: Phaser.Physics.P2.CollisionGroup;
  private _blockCollisionGroup: Phaser.Physics.P2.CollisionGroup;
  private _bananasCollisionGroup: Phaser.Physics.P2.CollisionGroup;
  private _cherriesCollisionGroup: Phaser.Physics.P2.CollisionGroup;
  private _pineapplesCollisionGroup: Phaser.Physics.P2.CollisionGroup;

  private _random: Phaser.RandomDataGenerator;
  constructor() {
    super();
  }

  public create(): void {
    this.game.stage.backgroundColor = '#ccddff';
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 1000;

    this._random = new Phaser.RandomDataGenerator(Date.now().toString());

    this._playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this._blockCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this._bananasCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this._cherriesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this._pineapplesCollisionGroup = this.game.physics.p2.createCollisionGroup();

    this.createBlock();
    this.createPlayer();
    this.createRope();

    this._bananas = this.createObjects('banana');
    this._pineapples = this.createObjects('pineapple');
    this._cherries = this.createObjects('cherries');

    this.game.physics.p2.updateBoundsCollisionGroup();

    this.game.time.events.loop(2500, () => {
      this.spawnObjectLeft();
      this.spawnObjectRight();
    })
  }

  public render():void{
    this.game.debug.text('FPS: ' + this.game.time.fps || '--', 20, 20);   
  }

  public update(): void {
    this.drawRope();
  }

  private createObjects(objectName: any): Phaser.Group {
    let objects = this.game.add.group();
    objects.enableBody = true;
    objects.physicsBodyType = Phaser.Physics.P2JS;
    objects.createMultiple(25, objectName);

    objects.forEach((child: any) => {
      child.body.clearShapes();
      child.body.loadPolygon('sprite_physics', objectName);
    }, this);

    return objects;
  }

  private spawnObjectLeft(): void {
    var object = this.spawnObject();

    object.reset(1, 600);
    object.body.velocity.x = this._random.integerInRange(100, 800);
    object.body.velocity.y = -this._random.integerInRange(1000, 1500);
  }

  private spawnObjectRight(): void {
    var object = this.spawnObject();

    object.reset(this.game.world.width, 600);
    object.body.velocity.x = -this._random.integerInRange(100, 800);
    object.body.velocity.y = -this._random.integerInRange(1000, 1500);
  }

  private spawnObject(): any {
    var objectToSpawn = this._random.integerInRange(1, 3);

    if (objectToSpawn == 1) {
      var object = this._bananas.getFirstDead();
      object.body.setCollisionGroup(this._bananasCollisionGroup);
    }
    else if (objectToSpawn == 2) {
      var object = this._pineapples.getFirstDead();
      object.body.setCollisionGroup(this._pineapplesCollisionGroup);
      object.body.data.gravityScale = 1.5;
    }
    else {
      var object = this._cherries.getFirstDead();
      object.body.setCollisionGroup(this._cherriesCollisionGroup);
      object.body.data.gravityScale = 0.5;
    }

    // set the lifespan
    object.lifespan = 2000;

    // Fruits collide with fruit and the player
    object.body.collides([
      this._blockCollisionGroup,
      this._playerCollisionGroup
    ]);

    return object;
  }

  private createBlock(): void {
    let blockShape = this.game.add.bitmapData(this.game.world.width, 50);
    blockShape.ctx.rect(0, 0, this.game.world.width, 50);
    blockShape.ctx.fillStyle = '000';
    blockShape.ctx.fill();

    this._block = this.game.add.sprite(0, 0, blockShape);
    this.game.physics.p2.enable(this._block);
    this._block.body.static = true;
    this._block.anchor.set(0, 0);

    this._block.inputEnabled = true;
    this._block.events.onInputDown.add(this.changeRope, this);
  }

  private createPlayer(): void {
    this._player = this.game.add.sprite(this.world.centerX, 50, Config.preload.betty);
    this.game.physics.p2.enable([this._player], false);
    this._player.body.clearShapes();
    this._player.body.loadPolygon(Config.preload.sprite_physics, Config.preload.betty);

    this._player.body.setCollisionGroup(this._playerCollisionGroup);
    this._player.body.collides([
      this._blockCollisionGroup,
      this._bananasCollisionGroup,
      this._cherriesCollisionGroup,
      this._pineapplesCollisionGroup
    ]);
  }

  private createRope(): void {
    this._ropeBitmapData = this.game.add.bitmapData(this.game.world.width, this.game.world.height);

    this._ropeBitmapData.ctx.beginPath();
    this._ropeBitmapData.ctx.lineWidth = 4;
    this._ropeBitmapData.ctx.strokeStyle = "#ffffff";
    this._ropeBitmapData.ctx.stroke();
    this._line = this.game.add.sprite(0, 0, this._ropeBitmapData);
    this._ropeAnchorX = (this._block.world.x + 500);
    this._ropeAnchorY = (this._block.world.y + this._block.height);

    this._rope = this.game.physics.p2.createSpring(
      this._block,  // sprite 1
      this._player, // sprite 2
      300,       // length of the rope
      10,        // stiffness
      3,         // damping
      [-(this._block.world.x + 500), -(this._block.world.y + this._block.height)]
    );
    this.line = new Phaser.Line(this._player.x, this._player.y,
      (this._block.world.x + 500), (this._block.world.y + this._block.height));
  }

  private changeRope(sprite: any, pointer: any): void {
    this.game.physics.p2.removeSpring(this._rope);

    //Create new spring at pointer x and y
    this._rope = this.game.physics.p2.createSpring(this._block, this._player, 200, 10, 3, [-pointer.x, -pointer.y]);
    this._ropeAnchorX = pointer.x;
    this._ropeAnchorY = pointer.y
  }

  private drawRope(): void {
    this._ropeBitmapData.clear();
    this._ropeBitmapData.ctx.beginPath();
    this._ropeBitmapData.ctx.beginPath();
    this._ropeBitmapData.ctx.moveTo(this._player.x, this._player.y);
    this._ropeBitmapData.ctx.lineTo(this._ropeAnchorX, this._ropeAnchorY);
    this._ropeBitmapData.ctx.lineWidth = 4;
    this._ropeBitmapData.ctx.stroke();
    this._ropeBitmapData.ctx.closePath();
    this._ropeBitmapData.render();
  }
}