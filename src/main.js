var Phaser = require('phaser-unofficial');

var bootState = require('./state/boot');
var playState = require('./state/play');

window.hooked = {
	init: function () {

		var game = new Phaser.Game(800, 480, Phaser.AUTO, 'hooked-on-a-ceiling');

		game.state.add('boot', bootState);
		game.state.add('play', playState);

		game.state.start('boot');
	}
};