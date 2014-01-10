// blokske x,y, width, height = 20pixels, midden in canvastag op vloer

var Player = (function(){

	var maurice;
	function Player(x, y, width, height){
		this.x = x;
		this.y = y;
		
		this.angle = 270;
		this.speed = 5;
		this.grounded = false;
		this.width = width;
		this.height = height;

		console.log("[PLAYER] constructor");
		//console.log(this.x + " - " + this.y);
		//console.log(this.angle + " - " + this.speed);

		// Spritesheet
		this.mauriceSheet = new createjs.SpriteSheet({

				"animations":
				{
					"dig": [0, 23, "dig"]},
					"framerate":25,
					"images": ["./assets/sprites/moldigging.png"],
					"frames":
						{
							"height": 423,
							"width":360,
							"regX": 360/2,
							"regY": 200
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