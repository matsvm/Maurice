var ProgressScreen = (function(){
var loadedXml;
	function ProgressScreen(xml){
		console.log("ProgressScreen Added");
		this.container = new createjs.Container()
		this.xml = xml;
		this.draw();
		
		
	}
	ProgressScreen.prototype.draw = function() {
		console.log(this.xml);
		var tempContainer= new createjs.Container();
		var background = new createjs.Bitmap("assets/ProgressBackground.png");
		background.scaleX = background.scaleY= 0.5;
		this.container.addChild(background);

		$(this.xml).find('level').each(function(index, value){
			console.log($(value).attr("checkpoint"));
			var x=$(value).attr("x")
			var y=$(value).attr("y")
			var progressDot = new createjs.Bitmap("assets/progressLVL.png");
			progressDot.x = x;
			progressDot.y = y;
			
			tempContainer.addChild(progressDot);


		})
		this.container.addChild(tempContainer);



		/*btn.addEventListener('rollover',function(){
			btn.cursor = "pointer";
		})
		btn.addEventListener('click',function(){
			console.log('[WelcomeScreen] Event dispatched')
			dispatchEvent(new Event("removeHomeScreen"),true);
		})
		this.container.addChild(btn);*/


	}


	return ProgressScreen;


})();