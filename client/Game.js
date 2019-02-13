import 'phaser';
import Client from './Client';
import game from './index';

let player;
let cursors;
let playerSpeed = 150;
let bg;
let bullets;
let fire;
let lastFired = 0;

let Game = {};

Game.preload = function() {
  this.load.image('player', 'assets/player.png');
  this.load.image('background', 'assets/nebula.jpg');
  this.load.atlas('space', 'assets/space.png', 'assets/space.json');
};

Game.create = function() {
  //World
  bg = this.add.tileSprite(400, 300, 800, 600, 'background').setScrollFactor(0);

  //Player
  let Bullet = new Phaser.Class({
    Extends: Phaser.Physics.Arcade.Image,

    initialize: function Bullet(scene) {
      Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'space', 'bullet');

      this.setBlendMode(1);
      this.setDepth(1);

      this.speed = 1000;
      this.lifespan = 1000;

      this._temp = new Phaser.Math.Vector2();
    },

    fire: function(player) {
      this.lifespan = 1000;

      this.setActive(true);
      this.setVisible(true);
      this.setAngle(player.body.rotation);
      this.setPosition(player.x, player.y);
      this.body.reset(player.x, player.y);

      let angle = Phaser.Math.DegToRad(player.body.rotation);

      this.scene.physics.velocityFromRotation(
        angle,
        this.speed,
        this.body.velocity
      );

      this.body.velocity.x *= 2;
      this.body.velocity.y *= 2;
    },

    update: function(time, delta) {
      this.lifespan -= delta;

      if (this.lifespan <= 0) {
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();
      }
    },
  });

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
    scale: { start: 0.6, end: 0 },
    blendMode: 'ADD',
  });

  player = this.physics.add.image(0, 0, 'player').setDepth(2);
  player.setDrag(300);
  player.setAngularDrag(400);
  player.setMaxVelocity(600);

  emitter.startFollow(player);

  //Camera
  this.cameras.main.startFollow(player);

  bullets = this.physics.add.group({
    classType: Bullet,
    maxSize: 30,
    runChildUpdate: true,
  });

  //Controls
  cursors = this.input.keyboard.createCursorKeys();
  fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  //SOCKETS
  Client.addPlayer();

  console.log(this);
};

Game.addNewPlayer = function(id, x, y) {
  player.playerId = id;
  game.scene.scenes[0].add.sprite(x, y, 'player');
};

Game.update = function update(time, delta) {
  player.setAcceleration(0);
  player.setAngularVelocity(0);
  if (cursors.up.isDown) {
    this.physics.velocityFromRotation(
      player.rotation,
      playerSpeed,
      player.body.acceleration
    );
    Client.updatePlayerMovement(player.x, player.y)
  }
  if (cursors.left.isDown) {
    player.setAngularVelocity(-playerSpeed);
  } else if (cursors.right.isDown) {
    player.setAngularVelocity(playerSpeed);
  }

  if (fire.isDown && time > lastFired) {
    const bullet = bullets.get();

    if (bullet) {
      bullet.fire(player);
      lastFired = time + 100;
    }
  }

  bg.tilePositionX += player.body.deltaX() * 0.5;
  bg.tilePositionY += player.body.deltaY() * 0.5;
};

Game.render = function() {};

export default Game;
