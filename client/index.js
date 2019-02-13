import 'phaser';

// const socket = io(window.location.origin)
// socket.on('connect', () => {
//     console.log('test')
// })

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
let playerSpeed = 150;
let bg;

function preload() {
  this.load.image('player', 'assets/player1.png');
  this.load.image('background', 'assets/nebula.jpg');
//   this.load.image('stars', 'assets/tests/space/stars.png');
  this.load.atlas(
    'space',
    'assets/space.png',
    'assets/space.json'
  );
}

function create() {
  //World
  bg = this.add.tileSprite(400, 300, 800, 600, 'background').setScrollFactor(0);

  //Player
  let particles = this.add.particles('space');
  let emitter = particles.createEmitter({
    frame: 'red',
    speed: 100,
    lifespan: {
      onEmit: function(particle, key, t, value) {
        return Phaser.Math.Percent(player.body.speed, 0, 300) * 2000;
      },
    },
    alpha: {
      onEmit: function(particle, key, t, value) {
        return Phaser.Math.Percent(player.body.speed, 0, 300);
      },
    },
    angle: {
      onEmit: function(particle, key, t, value) {
        const v = Phaser.Math.Between(-10, 10);
        return player.angle - 180 + v;
      },
    },
    scale: { start: 0.2, end: 0 },
    blendMode: 'ADD',
  });

  player = this.physics.add.image(0, 0, 'player')
  player.setDrag(300);
  player.setAngularDrag(400);
  player.setMaxVelocity(600);
  emitter.startFollow(player);
  this.cameras.main.startFollow(player);

  //Controls
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  player.setAcceleration(0);
  player.setAngularVelocity(0);
  if (cursors.up.isDown) {
    this.physics.velocityFromRotation(
      player.rotation,
      playerSpeed,
      player.body.acceleration
    );
  }
  if (cursors.left.isDown) {
    player.setAngularVelocity(-playerSpeed);
  } else if (cursors.right.isDown) {
    player.setAngularVelocity(playerSpeed);
  }

  bg.tilePositionX += player.body.deltaX() * 0.5;
  bg.tilePositionY += player.body.deltaY() * 0.5;
}

function render() {}



