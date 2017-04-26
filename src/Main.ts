import Facade from './states/Facade'

class Main extends Phaser.Game {
  constructor () {
    super(window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, Phaser.CANVAS, 'content', null);
    this.state.add('Facade',Facade,false);
    this.state.start('Facade');
  }

}

window.onload = () => {
  new Main();
}