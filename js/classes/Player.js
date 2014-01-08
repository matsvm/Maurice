// blokske x,y, width, height = 20pixels, midden in canvastag op vloer

var Player = (function(){

	var maurice;
	function Player(x, y, width, height){
		this.x = x;
		this.y = y;

		this.angle = 270;
		this.speed = 3;
		this.grounded = false;
		this.width = width;
		this.height = height;

		// Spritesheet
		this.mauriceSheet = new createjs.SpriteSheet({

				"animations":
				{
					"dig": [0, 23, "dig"]},
					"framerate":15,
					"images": ["./assets/sprites/moldigging.png"],
					"frames":
						{
							"height": 203,
							"width":173,
							"regX": 173/2,
							"regY": 100
						}
				});
		this.maurice = new createjs.Sprite(this.mauriceSheet, "dig");
		this.maurice.x = this.x;
		this.maurice.y = this.y;
		
	}

Player.prototype.update = function() {
	this.x -= this.speed * Math.cos(this.angle * Math.PI / 180);
	this.y -= this.speed * Math.sin(this.angle * Math.PI / 180);

	this.maurice.rotation = this.angle - 270;
	this.maurice.x = this.x;
	this.maurice.y = this.y;
};

	return Player;


})();