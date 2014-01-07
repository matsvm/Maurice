var IntroScreen = (function(){
var counter = 1;
var background;
	function IntroScreen(){
		console.log("IntroScreen Added");
		this.container = new createjs.Container()

		this.draw();
	}
	IntroScreen.prototype.draw = function() {

		background= new createjs.Bitmap("assets/Intro1.png");

		background.scaleX = background.scaleY= 0.5;
		this.container.addChild(background);

		var btn = new createjs.Bitmap("assets/btnBackground.png");
		btn.x = 900;
		btn.y = 76;

		btn.addEventListener('rollover',function(){
			btn.cursor = "pointer";
		})
		this.container.addChild(btn);

		btn.addEventListener('click',function(){
			counter++;
			if(counter<6){
				dispatchEvent(new Event("updateInfoScreen"),true);	
				console.log(counter);

			}
		})
	}
	
	IntroScreen.prototype.updateInfoScreen = function() {
		//this.container.removeChild(background);

		switch(counter){
			case 2:
			console.log('change background to prt 2');
				background = new createjs.Bitmap("assets/Intro2.png");
				background.scaleX = background.scaleY= 0.5;

				this.container.addChild(background);
			break;
			case 3:
				background = new createjs.Bitmap("assets/Intro3.png");
				background.scaleX = background.scaleY= 0.5;
				this.container.addChild(background);
			break;
			case 4:
				background = new createjs.Bitmap("assets/Intro4.png");
				background.scaleX = background.scaleY= 0.5;
				this.container.addChild(background);	
			break;
			case 5:
				console.log('[IntroScreen] Event dispatched')

				dispatchEvent(new Event("removeIntroScreen"),true);
			break;
		}

	};

	return IntroScreen;


})();