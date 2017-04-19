
class Main extends Phaser.Game {
  constructor () {
    super(400, 400, Phaser.CANVAS, 'content', null);
  }
}
window.onload = () => {
  new Main();
}