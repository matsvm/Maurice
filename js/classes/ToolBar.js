var ToolBar = (function(){

	function ToolBar(){
		this.counter = 0;
		this.container = new createjs.Container();
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.scale = this.height/1875;
		this.container.scaleX = this.container.scaleY = this.scale

		this.levelText = new createjs.Text();

		/* TIME */
		this.clockText = new createjs.Text();

		/* BUGS */
		this.bugCount = 0;
		this.bugCountChanged = false;

		this.container.x = this.width - (377*this.scale)*2;				// 377 = breedte background	
		this.draw();
	}

	ToolBar.prototype.draw = function() {
		var background = new createjs.Bitmap("assets/bg_toolbar.png");
		this.container.addChild(background);	

		/* LEVEL */
		this.levelText.font = "70px American";
		this.levelText.color = "#4c4446"; 
		this.levelText.text = "Level 1";
		this.levelText.textBaseline = "alphabetic";
		this.levelText.x = 174; 
		this.levelText.y = 190;

		/* CLOCK */
		this.clockText.font = "50px American";
		this.clockText.textAlign = "center";
		this.clockText.color = "#4c4446"; 
		this.clockText.text = "0";
		this.clockText.text = this.calculateTime(this.counter);
		this.clockText.textBaseline = "alphabetic";
		this.clockText.x = 484; 
		this.clockText.y = 1166;
		
		/* BOKAAL MET BUGS */
		// Spritesheet
		this.bugSheet = new createjs.SpriteSheet({
				images:["./assets/sprites/bugs.png"],
				frames:{width:283, height:430},
				animations: {bugs12:0, bugs11:1, bugs10:2, bugs9:3, bugs8:4, bugs7:5, bugs6:6, bugs5:7, bugs4:8, bugs3:9, bugs2:10, bugs1:11, bugs0:12}
		});
		this.bugs = new createjs.Sprite(this.bugSheet, "bugs0");
		this.bugs.x = 30;
		this.bugs.y = 800;

		this.container.addChild(this.bugs);
		this.container.addChild(this.levelText);
		this.container.addChild(this.clockText);

	}

	ToolBar.prototype.update  =function(counter){
		this.counter = counter;
		this.clockText.text = this.calculateTime(this.counter);

		if(this.bugCountChanged) {
			console.log("bugs changed");
			console.log("bugs"+this.bugCount);
			this.bugs.gotoAndStop("bugs"+this.bugCount);
			this.bugCountChanged = false;
		}
	}

	ToolBar.prototype.calculateTime = function(counter){
		var minutes = Math.floor(counter / 60);
		var seconds = counter - minutes * 60;

		if(seconds<10){ var secondString = "0" + seconds.toString(); }
		else{ secondString=seconds.toString(); }

		var clockString = minutes.toString() + ":" + secondString;
		return clockString;
	}


	return ToolBar;


})();