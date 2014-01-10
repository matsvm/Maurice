var ToolBar = (function(){

	this.soundBtn;

	function ToolBar(level, punten){
		this.counter = 0;
		this.level = level.toString();
		this.punten = punten.toString();
		this.container = new createjs.Container();
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.scale = this.height/1875;
		//this.container.scaleX = this.container.scaleY = this.scale;

		this.levelText = new createjs.Text();

		/* TIME */
		this.clockText = new createjs.Text();

		/* BUGS */
		this.bugCount = 0;
		this.bugCountChanged = false;

		/* VOGEL */
		this.vogelSheet = new createjs.SpriteSheet({
				"animations":
				{
					"panic": [0, 15, "panic"]},
					"framerate":240,
					"images": ["./assets/sprites/vogel.png"],
					"frames":
						{
							"height": 345,
							"width":188
						}
				});
		/* PUNTEN */
		this.puntenText = new createjs.Text();
		this.draw();
	}


	ToolBar.prototype.draw = function() {
		var background = new createjs.Bitmap("assets/bg_toolbar.png");
		this.container.addChild(background);	

		/* LEVEL */
		this.levelText.font = "34px American";
		this.levelText.color = "#4c4446"; 
		this.levelText.text = "Level " +this.level;
		this.levelText.textBaseline = "alphabetic";
		this.levelText.x = 82; 
		this.levelText.y = 87;

		/* CLOCK */
		this.clockText.font = "24px American";
		this.clockText.textAlign = "center";
		this.clockText.color = "#4c4446"; 
		this.clockText.text = "0";
		this.clockText.text = this.calculateTime(this.counter);
		this.clockText.textBaseline = "alphabetic";
		this.clockText.x = 238; 
		this.clockText.y = 560;
		
		/* BOKAAL MET BUGS */
		// Spritesheet
		this.bugSheet = new createjs.SpriteSheet({
				images:["./assets/sprites/bugs.png"],
				frames:{width:136, height:207},
				animations: {bugs12:0, bugs11:1, bugs10:2, bugs9:3, bugs8:4, bugs7:5, bugs6:6, bugs5:7, bugs4:8, bugs3:9, bugs2:10, bugs1:11, bugs0:12}
		});
		this.bugs = new createjs.Sprite(this.bugSheet, "bugs0");
		this.bugs.x = 15;
		this.bugs.y = 384;

		/* PAUZEBUTTON */
		this.pauzeButton = new createjs.Bitmap("assets/btn_pauze.png");
		this.pauzeButton.x = 60;
		this.pauzeButton.y = 260;

		this.pauzeButton.addEventListener('rollover',function(){ this.pauzeButton.cursor = "pointer"; });
		this.pauzeButton.addEventListener('click',function(){
			console.log('[ToolBar] Click');
			dispatchEvent(new Event("pauzeGame"),true);
		})

		/* MUSICBUTTON */
		this.soundBtnSheet = new createjs.SpriteSheet({
			images:["./assets/btn_geluid.png"], 
			frames:{width:93, height:93},
			animations: {musicoff:0, musicon:1},
			count:2
		});
		this.soundBtn = new createjs.Sprite(this.soundBtnSheet);
		this.soundBtn.gotoAndStop("musicoff");
		this.soundBtn.x = 80;
		this.soundBtn.y = 150;

		this.soundBtn.addEventListener('rollover',function(){ this.soundBtn.cursor = "pointer"; });
		this.soundBtn.addEventListener('click',function(evt){
			//console.log( evt.target.cu );
			if( evt.target.currentAnimation == "musicon" ){evt.target.gotoAndStop("musicoff")}else{evt.target.gotoAndStop("musicon")}
			dispatchEvent(new Event("musicMaestro"),true);
		})

		/* PUNTEN */
		this.puntenText.font = "20px American";
		this.puntenText.color = "#DDDDDD"; 
		this.puntenText.text = this.punten + " PTS";
		this.puntenText.textBaseline = "alphabetic";
		this.puntenText.x = 62; 
		this.puntenText.y = 540;

		/* VOGEL */
		this.vogel = new createjs.Sprite(this.vogelSheet);
		this.vogel.gotoAndStop(0);
		this.vogel.x = 177;
		this.vogel.y = 0;

		/* ALLES TOEVOEGEN */
		this.container.addChild(this.vogel);
		this.container.addChild(this.soundBtn);
		this.container.addChild(this.bugs);
		
		this.container.addChild(this.levelText);
		this.container.addChild(this.clockText);
		this.container.addChild(this.pauzeButton);
		this.container.addChild(this.puntenText);


	}

	ToolBar.prototype.update  =function(counter){
		this.counter = counter;
		this.clockText.text = this.calculateTime(this.counter);

		if(this.bugCountChanged) {
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