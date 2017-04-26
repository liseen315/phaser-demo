import Config from '../Config';
export default class Facade extends Phaser.State {
  private loaderText: Phaser.Text;
  constructor() {
    super();
  }
  public preload(): void {
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    this.game.scale.forceOrientation(true, false);
    this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this);
    this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this);

    this.game.load.image(Config.preload.Bg, Config.staticPath + 'images/bg.jpg');
    this.game.load.onLoadComplete.add(this.loadCompleteHandler, this);
  }

  public create(): void {
    this.game.stage.backgroundColor = "#4488AA";
    this.game.add.image(0, 0, Config.preload.Bg).anchor.set(0);
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