// import 'phaser';

// const config = {
//   type: Phaser.AUTO,
//   parent: 'game',
//   width: 800,
//   height: 600,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 0 },
//       debug: true,
//     },
//   },
//   scene: {
//     preload: preload,
//     create: create,
//     update: update,
//   },
// };

// let game = new Phaser.Game(config);
// let player;
// let cursors;
// let playerSpeed = 100;

// function preload() {
//   this.load.image('player', 'assets/player1.png');
// //   this.load.image('background', 'assets/tests/space/nebula.jpg');
// //   this.load.image('stars', 'assets/tests/space/stars.png');
// //   this.load.atlas(
// //     'space',
// //     'assets/tests/space/space.png',
// //     'assets/tests/space/space.json'
// //   );
// }

// function create() {
//   //World
// //   this.textures.addSpriteSheetFromAtlas('mine-sheet', {
// //     atlas: 'space',
// //     frame: 'mine',
// //     frameWidth: 64,
// //   });
// //   this.textures.addSpriteSheetFromAtlas('asteroid1-sheet', {
// //     atlas: 'space',
// //     frame: 'asteroid1',
// //     frameWidth: 96,
// //   });
// //   this.textures.addSpriteSheetFromAtlas('asteroid2-sheet', {
// //     atlas: 'space',
// //     frame: 'asteroid2',
// //     frameWidth: 96,
// //   });
// //   this.textures.addSpriteSheetFromAtlas('asteroid3-sheet', {
// //     atlas: 'space',
// //     frame: 'asteroid3',
// //     frameWidth: 96,
// //   });
// //   this.textures.addSpriteSheetFromAtlas('asteroid4-sheet', {
// //     atlas: 'space',
// //     frame: 'asteroid4',
// //     frameWidth: 64,
// //   });

// //   this.anims.create({
// //     key: 'mine-anim',
// //     frames: this.anims.generateFrameNumbers('mine-sheet', {
// //       start: 0,
// //       end: 15,
// //     }),
// //     frameRate: 20,
// //     repeat: -1,
// //   });
// //   this.anims.create({
// //     key: 'asteroid1-anim',
// //     frames: this.anims.generateFrameNumbers('asteroid1-sheet', {
// //       start: 0,
// //       end: 24,
// //     }),
// //     frameRate: 20,
// //     repeat: -1,
// //   });
// //   this.anims.create({
// //     key: 'asteroid2-anim',
// //     frames: this.anims.generateFrameNumbers('asteroid2-sheet', {
// //       start: 0,
// //       end: 24,
// //     }),
// //     frameRate: 20,
// //     repeat: -1,
// //   });
// //   this.anims.create({
// //     key: 'asteroid3-anim',
// //     frames: this.anims.generateFrameNumbers('asteroid3-sheet', {
// //       start: 0,
// //       end: 24,
// //     }),
// //     frameRate: 20,
// //     repeat: -1,
// //   });
// //   this.anims.create({
// //     key: 'asteroid4-anim',
// //     frames: this.anims.generateFrameNumbers('asteroid4-sheet', {
// //       start: 0,
// //       end: 24,
// //     }),
// //     frameRate: 20,
// //     repeat: -1,
// //   });

//   //  World size is 8000 x 6000

// //   bg = this.add.tileSprite(400, 300, 800, 600, 'background').setScrollFactor(0);

//   //  Add our planets, etc

// //   this.add
// //     .image(512, 680, 'space', 'blue-planet')
// //     .setOrigin(0)
// //     .setScrollFactor(0.6);
// //   this.add
// //     .image(2833, 1246, 'space', 'brown-planet')
// //     .setOrigin(0)
// //     .setScrollFactor(0.6);
// //   this.add
// //     .image(3875, 531, 'space', 'sun')
// //     .setOrigin(0)
// //     .setScrollFactor(0.6);
// //   var galaxy = this.add
// //     .image(5345 + 1024, 327 + 1024, 'space', 'galaxy')
// //     .setBlendMode(1)
// //     .setScrollFactor(0.6);
// //   this.add
// //     .image(908, 3922, 'space', 'gas-giant')
// //     .setOrigin(0)
// //     .setScrollFactor(0.6);
// //   this.add
// //     .image(3140, 2974, 'space', 'brown-planet')
// //     .setOrigin(0)
// //     .setScrollFactor(0.6)
// //     .setScale(0.8)
// //     .setTint(0x882d2d);
// //   this.add
// //     .image(6052, 4280, 'space', 'purple-planet')
// //     .setOrigin(0)
// //     .setScrollFactor(0.6);

// //   for (var i = 0; i < 8; i++) {
// //     this.add
// //       .image(
// //         Phaser.Math.Between(0, 8000),
// //         Phaser.Math.Between(0, 6000),
// //         'space',
// //         'eyes'
// //       )
// //       .setBlendMode(1)
// //       .setScrollFactor(0.8);
// //   }

// //   stars = this.add.tileSprite(400, 300, 800, 600, 'stars').setScrollFactor(0);

//   //Player
//   player = this.physics.add.image(50, 150, 'player');
//   player.setDrag(300);
//   player.setAngularDrag(400);
//   player.setMaxVelocity(600);

// //   const particles = this.add.particles('space');
// //   const emitter = particles.createEmitter({
// //     frame: 'blue',
// //     speed: 100,
// //     lifespan: {
// //       onEmit: function(particle, key, t, value) {
// //         return Phaser.Math.Percent(player.body.speed, 0, 300) * 2000;
// //       },
// //     },
// //     alpha: {
// //       onEmit: function(particle, key, t, value) {
// //         return Phaser.Math.Percent(player.body.speed, 0, 300);
// //       },
// //     },
// //     angle: {
// //       onEmit: function(particle, key, t, value) {
// //         var v = Phaser.Math.Between(-10, 10);
// //         return player.angle - 180 + v;
// //       },
// //     },
// //     scale: { start: 0.6, end: 0 },
// //     blendMode: 'ADD',
// //   });

// //   emitter.startFollow(player);

//   this.cameras.main.startFollow(player);

//   //Controls
//   cursors = this.input.keyboard.createCursorKeys();
// }

// function update() {
//   player.setAcceleration(0);
//   if (cursors.up.isDown) {
//     this.physics.velocityFromRotation(
//       player.rotation,
//       playerSpeed,
//       player.body.acceleration
//     );
//   }
//   if (cursors.left.isDown) {
//     player.setAngularVelocity(-playerSpeed);
//   } else if (cursors.right.isDown) {
//     player.setAngularVelocity(playerSpeed);
//   }
// }

// function render() {}



const socket = io(window.location.origin)
socket.on('connect', () => {
    console.log('test')
})