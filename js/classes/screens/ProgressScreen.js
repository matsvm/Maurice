var progress;
var xml;
var btnContainer;
var btnPlay;

var ProgressScreen = (function(){

	

	function ProgressScreen(receivedProgress, xml){

		console.log('[ProgressScreen] constructor');
		this.container = new createjs.Container();
		this.scale = window.innerHeight/1875;
		this.container.scaleX = this.container.scaleY = this.scale;
		this.container.x =window.innerWidth/2;
		this.container.regX =4167/2;
		this.container.name = "ProgressScreen";

		progress = receivedProgress;
		console.log(progress.currentlvl);
		xml = xml;

		this.spriteSheet = new createjs.SpriteSheet({
				images:["./assets/sprites/grondsoorten.png"], 
				frames:{width:117, height:117},
				animations: {laag1:0, laag2:1, laag3:2, laag4:3, laag5:4, laag6:5},
				count:6
		});
		
		this.draw();
		
	}
	ProgressScreen.prototype.draw = function() {
		console.log( );
		this.background = new createjs.Bitmap("assets/ProgressBackground.png");
	
		$(xml).find('level').each(function(index, value){

			var id = $(value).attr("id");
			var laag = $(value).attr("layer");

			if(progress.currentlvl>id){
				console.log("Lvl gepasseerd");
			}
			else if(progress.currentlvl == id){

				var x=$(value).attr("x")
				var y=$(value).attr("y")
				btnContainer = new createjs.Container();
				btnContainer.regX = 3;
				btnContainer.regY = 280;

				btnPlay = new createjs.Bitmap("assets/progressLVL.png");
				btnPlay.x = x;
				btnPlay.y = y;

				btnPlay.addEventListener('rollover',function(){
					this.btnPlay.cursor = "pointer";
				})
				btnPlay.addEventListener('click',function(){
					console.log('start het spel');
				});	
				
			}else if(progress.currentlvl<id){
				this.sprite = new createjs.Sprite(this.spriteSheet);
				this.sprite.gotoAndStop('laag'+laag);
				this.sprite.x=$(value).attr("x");
				this.sprite.y=$(value).attr("y");
				this.container.addChild(this.sprite);


			}
		});

		this.container.addChild(this.background);
		var overlay  = new createjs.Bitmap("assets/NumberOverlay_wormpjes.png");
		
		this.container.addChild(overlay);
		this.container.addChild(btnContainer);
		btnContainer.addChild(btnPlay);
		this.container.addChild(progressScreen);		
	}

	ProgressScreen.prototype.drawProgress = function(progress, spriteSheet){

		

	}

	return ProgressScreen;

})();