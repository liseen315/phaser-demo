import Config from '../Config';
export default class Facade extends Phaser.State {
  private scaleRatio:number;
  constructor() {
    super();
  }
  public preload(): void {
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.USER_SCALE;

    let deviceW:number = window.innerWidth;
    let deviceH:number = window.innerHeight;
    let originW:number = 1136;
    let originH:number = 640;

    let scaleX = deviceW/originW;
    let scaleY = deviceH/originH;

    this.game.scale.setUserScale(scaleX,scaleY);
    this.game.scale.refresh();

    this.game.scale.forceOrientation(true, false);
    this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this);
    this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this);
    this.scaleRatio = window.devicePixelRatio / 3;
    this.game.load.image(Config.preload.Bg, Config.staticPath + 'images/bg.jpg');
    this.game.load.image(Config.preload.betty,Config.staticPath + 'images/betty.png');
    this.game.load.image(Config.preload.pineapple,Config.staticPath + 'images/pineapple.png');
    this.game.load.image(Config.preload.banana,Config.staticPath + 'images/banana.png');
    this.game.load.image(Config.preload.cherries,Config.staticPath + 'images/cherries.png');
    this.game.load.physics(Config.preload.sprite_physics,Config.staticPath + 'images/sprite_physics.json');
    this.game.load.onLoadComplete.add(this.loadCompleteHandler, this);

  }

  public create(): void {
    this.state.start('Start');
  }

  private loadCompleteHandler(): void {
    console.log('loadComplete!');
  }

  private handleIncorrect(): void {
    if (!this.game.device.desktop) {
      document.getElementById("sdirection").style.display = "block";
    }
  }

  private handleCorrect(): void {
    if (!this.game.device.desktop) {
      document.getElementById("sdirection").style.display = "none";
    }
  }
}