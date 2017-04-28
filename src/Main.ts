import Facade from './states/Facade'
import Start from './states/Start';

class Main extends Phaser.Game {
  constructor () {
    super(window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, Phaser.CANVAS, 'content', null);

    this.state.add('Facade',Facade,false);
    this.state.add('Start',Start,false);
    this.state.start('Facade');
  }

}

window.onload = () => {
  new Main();
}