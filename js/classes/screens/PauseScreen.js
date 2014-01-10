var PauseScreen = (function(){

	function PauseScreen(){
		console.log("PauseScreen Added");
		this.container = new createjs.Container()

		this.draw();
	}
	PauseScreen.prototype.draw = function() {

		this.scale = window.innerHeight/1875;
		this.container.scaleX = this.container.scaleY = this.scale;
		this.container.x =window.innerWidth/2;
		this.container.regX =4167/2;
		this.container.name = "pauzeContainer";
	
		this.background = new createjs.Bitmap("assets/bg_pauze.png");
		
		this.unPauzeBtn = new createjs.Bitmap("assets/btn_continue.png");
		this.unPauzeBtn.x = 1030;
		this.unPauzeBtn.y = 435;

		this.unPauzeBtn.addEventListener('rollover',function(){
			this.unPauzeBtn.cursor = "pointer";
		})
		this.unPauzeBtn.addEventListener('click',function(){
			console.log("unpause please");
			dispatchEvent(new Event("resumeGame"),true);	

			ticker.setPaused(false);	
		})

		this.container.addChild(this.background);
		this.container.addChild(this.unPauzeBtn);

	}
	
	

	return PauseScreen;


})();