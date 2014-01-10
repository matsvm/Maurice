
var Box = (function(){

	function Box(x, y, width, height, name){

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;
		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;

		this.draw();
	}

	Box.prototype.draw = function(){

		switch (this.name){

			case "bug":
			var data = {
	            images:["./assets/sprites/bugboxes.png"], 
	            frames:{width:83, height:83},
	            animations: {bug1:0, bug2:1, bug3:2, bug4:3},
	            count:4
	        }
	        break;

	        case "worm":
			var data = {
	            images:["./assets/sprites/wormboxes.png"], 
	            frames:{width:83, height:83},
	            animations: {worm1:0, worm2:1, worm3:2, worm4:3},
	            count:4
	        }
	        break;

	        case "checkpoint":
			var data = {
	            images:["./assets/sprites/emptyboxes.png"], 
	            frames:{width:83, height:83},
	            animations: {empty1:0, empty2:1, empty3:2, empty4:3},
	            count:4
	        }
	        break;

	        case "gas":
			var data = {
	            images:["./assets/sprites/gas.png"], 
	            frames:{width:83, height:83},
	            animations: {empty1:0, empty2:1, empty3:2, empty4:3},
	            count:4
	        }
	        break;
	        
	        case "rock":
			var data = {
	            images:["./assets/sprites/rockboxes.png"], 
	            frames:{width:83, height:83},
	            animations: {empty1:0, empty2:1, empty3:2, empty4:3},
	            count:4
	        }
	        break;

	        case "stone":
			var data = {
	            images:["./assets/sprites/stoneboxes.png"], 
	            frames:{width:83, height:83},
	            animations: {empty1:0, empty2:1, empty3:2, empty4:3},
	            count:4
	        }
	        break;
	    }

	    var random = Math.floor(Math.random() * 2) + 1;    
		this.boxSheet = new createjs.SpriteSheet(data);
        this.box = new createjs.Sprite(this.boxSheet);
		this.box.x = this.x + 17;
        this.box.y = this.y + 17;
        this.box.gotoAndStop(random);
		console.log("huidigeframe");
        console.log(this.box.currentFrame);

	};

	Box.prototype.random = function(max){
		var random = Math.floor(Math.random() * max) + 1;
	}
	return Box;

})();