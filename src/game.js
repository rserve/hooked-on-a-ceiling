var Phaser = require('phaser-unofficial');

var game;

function preload() {

	console.log('preloading...');
	game.load.image('logo', 'assets/phaser.png');

}

function create() {

	console.log('creating...');
	var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
	logo.anchor.setTo(0.5, 0.5);

}

exports.init = function () {
	console.log('initializing...');
	game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
		preload: preload,
		create: create
	});
};