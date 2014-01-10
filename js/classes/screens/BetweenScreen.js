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
		console.log(this.doneWrong)
		this.retakeBtn = new createjs.Bitmap("assets/btn_continue.png");
		this.retakeBtn.x = 1030;
		this.retakeBtn.y = 435;

		this.retakeBtn.addEventListener('rollover',function(){
			this.retakeBtn.cursor = "pointer";
		})

		switch(this.doneWrong){
			case "boom":
			this.background = new createjs.Bitmap("assets/bg_boom.png");
		
			this.retakeBtn.addEventListener('click',function(){
				console.log("retake please");
				dispatchEvent(new Event("retakeLevel"),true);
			})
			break;

			case "sleepyEnded":
			this.background = new createjs.Bitmap("assets/bg_sleepy.png");

			this.retakeBtn.addEventListener('click',function(){
				console.log("retake please");
				dispatchEvent(new Event("retakeLevel"),true);
			})
			break;

			case "checkpoint":
			console.log('checkPointReached')
			this.background = new createjs.Bitmap("assets/bg_gewonnen.png");

			var progress = JSON.parse(getCookie('progress'));
			this.retakeBtn.addEventListener('click',function(){
				console.log("nextLevel please");
				dispatchEvent(new Event("nextLevel"),true);	
			})
			break;
		}



		this.container.addChild(this.background);
		this.container.addChild(this.retakeBtn);

	}
	function getCookie(cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) 
		  {
		  var c = ca[i].trim();
		  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return "";
	}

	return BetweenScreen;

})();