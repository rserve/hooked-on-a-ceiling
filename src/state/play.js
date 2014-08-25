var Phaser = require('phaser-unofficial');
var Star = require('../prefab/star')

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var ground;
var starGenerator;
var starGroup;

function generateStar() {
	var game = this.game;
	var star = Star.create(game, game.world.randomX, game.world.randomY);
	starGroup.add(star);
}

function collectStar(player, star) {
	star.kill();
}

exports.create = function () {
	var game = this.game;

	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = '#000000';

	bg = game.add.tileSprite(0, 0, 800, 480, 'background');

	ground = game.add.sprite(0, game.world.height - 64, 'ground');

	player = game.add.sprite(32, 32, 'dude');
	game.physics.enable(player, Phaser.Physics.ARCADE);

	player.body.bounce.y = 0.2;
	player.body.collideWorldBounds = true;
	player.body.setSize(20, 32, 5, 16);
	player.body.gravity.y = 300;
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('turn', [4], 20, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);

	starGroup = game.add.group();
	starGroup.enableBody = true;
	
	starGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, generateStar, this);
	starGenerator.timer.start();
		
	cursors = game.input.keyboard.createCursorKeys();
	jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

exports.update = function () {

	var game = this.game;
	game.physics.arcade.overlap(player, starGroup, collectStar, null, this);

	player.body.velocity.x = 0;

	if (cursors.left.isDown) {
		player.body.velocity.x = -150;

		if (facing != 'left') {
			player.animations.play('left');
			facing = 'left';
		}
	} else if (cursors.right.isDown) {
		player.body.velocity.x = 150;

		if (facing != 'right') {
			player.animations.play('right');
			facing = 'right';
		}
	} else {
		if (facing != 'idle') {
			player.animations.stop();

			if (facing == 'left') {
				player.frame = 0;
			} else {
				player.frame = 5;
			}

			facing = 'idle';
		}
	}

	if (jumpButton.isDown && game.time.now > jumpTimer) {
		player.body.velocity.y = -250;
		jumpTimer = game.time.now + 750;
	}

}

exports.render = function () {
	var game = this.game;
	/*game.debug.text(game.time.physicsElapsed, 32, 32);
	game.debug.body(player);
	game.debug.bodyInfo(player, 16, 24);*/

}