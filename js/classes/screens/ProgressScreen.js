var progress;
//var xml;
var btnContainer;
var btnPlay;
var spriteSheet;

var ProgressScreen = (function(){

	function ProgressScreen(receivedProgress, xml){

		console.log('[ProgressScreen] constructor');
		this.container = new createjs.Container();
		this.scale = window.innerHeight/1875;
		this.container.scaleX = this.container.scaleY = this.scale;
		this.container.x =window.innerWidth/2;
		this.container.regX =4167/2;
		this.name = "ProgressScreen";

		progress = receivedProgress;
		console.log(progress.currentlvl);
		this.xml = xml;

		spriteSheet = new createjs.SpriteSheet({
				images:["assets/sprites/grondsoorten.png"], 
				frames:{width:117, height:117},
				animations: {laag1:0, laag2:1, laag3:2, laag4:3, laag5:4, laag6:5},
				count:6
		});

		this.draw();
		
	}
	ProgressScreen.prototype.draw = function() {
		console.log(this.xml)
		console.log('drawing');
		this.background = new createjs.Bitmap("assets/ProgressBackground.png");
		this.container.addChild(this.background);

		btnContainer = new createjs.Container();
		var tempContainer = new createjs.Container();

		$(this.xml).find('level').each(function(index, value){
			//console.log(progress)
			//console.log(this.container);
			var id = $(value).attr("id");
			var laag = $(value).attr("layer");
			//console.log(laag)

			if(progress.currentlvl>id){
				console.log("Lvl gepasseerd");
			}
			else if(progress.currentlvl == id){

				var x=$(value).attr("x")
				var y=$(value).attr("y")
				
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
					dispatchEvent(new Event('GameStarted'),true);
				});	
				btnContainer.addChild(btnPlay);	
				
			}else if(progress.currentlvl<id){
				this.sprite = new createjs.Sprite(spriteSheet);

				this.sprite.gotoAndStop('laag'+laag);
				this.sprite.x=$(value).attr("x");
				this.sprite.y=$(value).attr("y");
				//console.log(this.container);

				tempContainer.addChild(this.sprite);
			}
			//
			
		});
		this.container.addChild(tempContainer);
		var overlay  = new createjs.Bitmap("assets/NumberOverlay_wormpjes.png");
		this.container.addChild(overlay);
		this.container.addChild(btnContainer);
			
	}

	ProgressScreen.prototype.drawProgress = function(progress, spriteSheet){

	}

	return ProgressScreen;

})();