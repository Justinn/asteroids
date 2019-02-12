import 'phaser';

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
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);
let player;
let cursors;
let playerSpeed = 100;

function preload() {
  this.load.image('player', 'assets/player1.png');
}

function create() {
  //World
  // game.physics.startSystem(Phaser.Physics.ARCADE);

  //Player
  player = this.physics.add.sprite(400, 150, 'player');

  //Controls
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  player.setVelocityY(0);
  if (cursors.up.isDown) {
    player.setVelocityY(-playerSpeed);
  }
  if (cursors.down.isDown) {
    player.setVelocityY(playerSpeed);
  }
}

function render() {}
