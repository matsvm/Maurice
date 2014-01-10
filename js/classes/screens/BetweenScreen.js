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
	BetweenScreen.prototype.checkPointReached = function() {
		console.log("checkpointReached");

		this.background = new createjs.Bitmap("assets/bg_gewonnen.png");

		var data = JSON.parse(getCookie('progress'));
		var score = data.latestPoints;
		console.log(score);

		this.puntenText = new createjs.Text();
		this.puntenText.font = "150px American";
		this.puntenText.textAlgin = "center"
		this.puntenText.color = "#FED214"; 
		this.puntenText.text = score + " punten";
		this.puntenText.textBaseline = "alphabetic";
		this.puntenText.x = 1750; 
		this.puntenText.y = 400;
		this.container.addChildAt(this.puntenText)
		this.retakeBtn.addEventListener('click',function(){
			console.log("nextLevel please");
			dispatchEvent(new Event("nextLevel"),true);	
		})
		this.container.addChild(this.background);
		this.container.addChild(this.retakeBtn);

		this.container.addChild(this.puntenText);

	};
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

			
			break;

			
		}

			this.retakeBtn.addEventListener('click',function(){
				console.log("retake please");
				dispatchEvent(new Event("retakeLevel"),true);
			})

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