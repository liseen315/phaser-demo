import Hello from "./Hello";
class Main extends Phaser.Game {
  constructor () {
    super(400, 400, Phaser.CANVAS, 'content', null);
    new Hello();
  }
}

window.onload = () => {
  new Main();
}