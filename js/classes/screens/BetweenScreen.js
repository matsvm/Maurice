var BetweenScreen = (function(){

	function BetweenScreen(doneWrong){

		this.doneWrong = doneWrong;
		this.container = new createjs.Container();
		this.scale = window.innerHeight/1875;
		this.container.scaleX = this.container.scaleY = this.scale;
		this.container.x =window.innerWidth/2;
		this.container.regX =4167/2;
		this.container.name = "BetweenScreen";
		this.draw();

		console.log('[BetweenScreen] constructor');
	}
	BetweenScreen.prototype.draw = function() {

		if( this.doneWrong == "boom" ){
			this.background = new createjs.Bitmap("assets/bg_boom.png");
		}else{
			this.background = new createjs.Bitmap("assets/bg_sleepy.png");
		}
		

		this.retakeBtn = new createjs.Bitmap("assets/btn_continue.png");
		this.retakeBtn.x = 1030;
		this.retakeBtn.y = 435;

		this.retakeBtn.addEventListener('rollover',function(){
			this.retakeBtn.cursor = "pointer";
		})
		this.retakeBtn.addEventListener('click',function(){
			console.log("retake please");
			dispatchEvent(new Event("retakeLevel"),true);
		})

		this.container.addChild(this.background);
		this.container.addChild(this.retakeBtn);

	}

	return BetweenScreen;

})();