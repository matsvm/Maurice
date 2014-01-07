var WelcomeScreen = (function(){

	function WelcomeScreen(){
		console.log("WelcomeScreen Added");
		this.container = new createjs.Container()

		this.draw();
	}
	WelcomeScreen.prototype.draw = function() {

		var background = new createjs.Bitmap("assets/HomeIntro.png");
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		//this.scale = this.width/2917;
		console.log(this.height/1875);
		console.log(this.width/2917);
		
		this.scale = this.height/1875;
		
		background.scaleX = background.scaleY=this.scale;
		background.x =window.innerWidth/2;
		background.regX =4167/2;
		//console.log(background.regX);
		//console.log(background.width);
		this.container.addChild(background);

		var btn = new createjs.Bitmap("assets/PlayBtn.png");
		btn.scaleX =btn.scaleY=this.scale;
		btn.x = window.innerWidth-500;
		btn.y = 400;

		btn.addEventListener('rollover',function(){
			btn.cursor = "pointer";
		})
		btn.addEventListener('click',function(){
			console.log('[WelcomeScreen] Event dispatched')
			dispatchEvent(new Event("removeHomeScreen"),true);
		})
		this.container.addChild(btn);


	}


	return WelcomeScreen;


})();