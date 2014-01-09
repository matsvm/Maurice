var WelcomeScreen = (function(){

	function WelcomeScreen(){
		console.log("WelcomeScreen Added");
		this.container = new createjs.Container();
		this.scale = window.innerHeight/1875;
		this.container.scaleX = this.container.scaleY = this.scale;
		this.container.x =window.innerWidth/2;
		this.container.regX =4167/2;
		this.draw();
	}
	WelcomeScreen.prototype.draw = function() {

		var background = new createjs.Bitmap("assets/HomeIntro.png");
		this.container.addChild(background);

		var btn = new createjs.Bitmap("assets/PlayBtn.png");
		btn.x = 2500;
		btn.y = 800;
		btn.addEventListener('rollover',function(){
			btn.cursor = "pointer";
		})
		btn.addEventListener('click',function(){
			dispatchEvent(new Event("removeHomeScreen"),true);
		})
		this.container.addChild(btn);
	}
	return WelcomeScreen;


})();