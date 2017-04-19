import Hello from "./Hello";
class Main extends Phaser.Game {
  constructor () {
    super(window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, Phaser.AUTO, 'content', null);
    console.log('->>>>',this.scale.scaleMode);
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  }
}

window.onload = () => {
  new Main();
}