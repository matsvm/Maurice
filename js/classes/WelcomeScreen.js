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
		if(this.height/1875>this.width/2917){
			this.scale = this.height/1875;
		}else{
			this.scale = this.width/2917;
		}
		background.scaleX = background.scaleY=this.scale;
		this.container.addChild(background);

		var btn = new createjs.Bitmap("assets/PlayBtn.png");
		btn.scaleX =btn.scaleY=this.scale;
		btn.x = window.innerWidth-300;
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