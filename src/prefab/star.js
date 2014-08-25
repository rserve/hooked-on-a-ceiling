var Phaser = require('phaser-unofficial');

var Star = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'star', frame);
};

var proto = Star.prototype = Object.create(Phaser.Sprite.prototype);
proto.constructor = Star;

proto.update = function () {
	if (this.angle > 360) {
		this.angle = 360
	}
	this.angle += 0.3;

};

proto.init = function () {
	this.anchor.setTo(0.5, 0.5);

	this.angle = Math.floor((Math.random() * 360));;
	this.alpha = 0.5;
	this.enableBody = true;

	this.game.add.tween(this).to({
		alpha: 1
	}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
};



exports.create = function (game, x, y, frame) {
	var star = new Star(game, x, y, frame);
	star.init();
	return star;
};