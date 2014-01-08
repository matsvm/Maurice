
var Box = (function(){

	function Box(x, y, width, height, name, data){

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;
		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;
		
		this.boxSheet = new createjs.SpriteSheet(data);
		this.box = new createjs.Sprite(this.boxSheet);
		this.draw();


	}

	Box.prototype.draw = function(){

		this.box.x = this.x + 17;
		this.box.y = this.y + 17;
		var random = Math.floor(Math.random() * 3) + 1

		switch (this.name){
			case "bug":
			this.box.gotoAndStop("bug" + random);
			console.log(this.box.currentAnimation);
			break;
			case "worm":
			this.box.gotoAndStop("worm" + random);
			break;
			case "gas":
			this.box.gotoAndStop("wormpower");
			break;
			case "magmagas":
			this.box.gotoAndStop("wormpower");
			break;
			case "stone":
			this.box.gotoAndStop("wormpower");
			break;
			case "rock":
			this.box.gotoAndStop("wormpower");
			break;
			}
	};
	return Box;

})();