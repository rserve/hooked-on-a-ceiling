var Phaser = require('phaser-unofficial');

exports.preload = function () {
	var game = this.game;

	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.image('star', 'assets/star.png', 32, 32);

	game.load.image('background', 'assets/background.png');
	game.load.image('ground', 'assets/groundDirt.png');
}

exports.create = function () {
	this.game.state.start('play');
}