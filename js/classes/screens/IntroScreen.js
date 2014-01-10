var IntroScreen = (function(){
var counter = 1;
var background;
var btn;
	function IntroScreen(){
		console.log("IntroScreen Added");
		this.container = new createjs.Container();
		this.scale = window.innerHeight/1875;
		this.container.scaleX = this.container.scaleY = this.scale;
		this.container.x =window.innerWidth/2;
		this.container.regX =4167/2;
		this.draw();

		this.draw();
	}
	IntroScreen.prototype.draw = function() {

		var background = new createjs.Bitmap("assets/Intro1.png");
		this.container.addChild(background);

		btn = new createjs.Bitmap("assets/VolgendeBtn.png");
		btn.x = 1000;
		btn.y = 1200;
		btn.addEventListener('rollover',function(){
			btn.cursor = "pointer";
		})
		btn.addEventListener('click',function(){
			
			counter++;
			if(counter<6){
				dispatchEvent(new Event("updateInfoScreen"),true);	
				console.log(counter);

			}
			
		})
		this.container.addChild(btn);
	}
	
	IntroScreen.prototype.updateInfoScreen = function() {
		//this.container.removeChild(background);

		switch(counter){
			case 2:
			console.log('change background to prt 2');
				background = new createjs.Bitmap("assets/Intro2.png");
				//background.scaleX = background.scaleY= 0.5;

				this.container.addChildAt(background,this.container.getChildIndex(btn));
				btn.x = 2300;
				btn.y = 1550;
			break;
			case 3:
				dispatchEvent(new Event("removeIntroScreen"),true);

				
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