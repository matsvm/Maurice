(function(){
	var stage;
	var oldScreen, currentScreen,ticker;
	var firstTime = true;
	var progress = {};
	function init(){
		progress = getCookie('progress');
		if(progress!=''){
			console.log("existing user");
			firstTime = false;
			progress = JSON.parse(getCookie('progress'));
			console.log(progress);
			//progress.currentStage = document.cookie="username=John Doe";
		}else{
			console.log("new user");


		}
		var canvas = document.getElementById("cnvs");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		stage = new createjs.Stage("cnvs");
		width = stage.canvas.width;						// om mee te geven aan World, om player te volgen
		height = stage.canvas.height;
		stage.enableMouseOver();
		changeScreen('welcome');

		ticker = createjs.Ticker;
		ticker.setFPS(60);
		ticker.addEventListener("tick",update);


		this.addEventListener('removeHomeScreen',function(){
			console.log('[App] dispatched event received')
			if(firstTime){
				changeScreen('intro')
			}else{
				changeScreen('Game');
			}
		})
		
		this.addEventListener('removeIntroScreen',function(){
			console.log('[App] dispatched event received')
			progress = {'currentlvl':'1','points':'0'};
			//progress = JSON.stringify(progress);
			document.cookie="progress="+JSON.stringify(progress);

			changeScreen('Game');
		})
		this.addEventListener('updateInfoScreen',function(){
			console.log('[App] dispatched event received')
			currentScreen.updateInfoScreen();
		})
		this.addEventListener('updateStage',function(){
			console.log('[App] update the stage!')
			console.log(stage);
			update();
		})


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

	function changeScreen(screenName){
		if(currentScreen!=null){
			oldScreen = currentScreen;
			console.log(stage);
			stage.removeChild(oldScreen.container);

		}
		switch(screenName){
			case "Game":
				console.log('change screen to Game');
				//startGame();
				//console.log(progress);
				currentScreen = new Game(progress);

				//currentScreen.init();
				break;
			case "welcome":
				console.log('change screen to Welcome');
				currentScreen = new WelcomeScreen();
				break;
			case "intro":
				console.log('change screen to Intro');
				currentScreen = new IntroScreen();
				break;

		}
		stage.addChild(currentScreen.container);

		update();
	}
	function update(){
		stage.update();
	}


	init();

})();
