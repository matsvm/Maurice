var PriceScreen = (function(){

	function PriceScreen(score, progress,totaleScore){
		console.log("PriceScreen Added");
		this.container = new createjs.Container()

		this.draw();
	}
	PriceScreen.prototype.draw = function() {

		var background = new createjs.Bitmap("assets/bg_gewonnen.png");
		console.log('add elements to PriceScreen')
		this.container.addChild(background);

		var btn = new createjs.Bitmap("assets/btnBackground.png");
		btn.x = 900;
		btn.y = 76;

		btn.addEventListener('rollover',function(){
			btn.cursor = "pointer";
		})
		this.container.addChild(btn);

		btn.addEventListener('click',function(){
	
			dispatchEvent(new Event("nextLevel"),true);	
			
		})
	}
	
	

	return PriceScreen;


})();