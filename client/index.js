import Phaser from 'phaser';
import Game from './Game';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: {
    preload: Game.preload,
    create: Game.create,
    update: Game.update,
  },
};

let game = new Phaser.Game(config);

export default game;
