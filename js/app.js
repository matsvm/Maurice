(function(){

	var stage;
	var oldScreen, currentScreen, ticker;
	var firstTime = true;
	var progress = {};
	var instance;
	var isPlaying;	
	var xml;	

	function init(){

		progress = getCookie('progress');
		//console.log(progress);
		if(progress!=''){															//bestaande gebruiker
			firstTime = false;
			progress = JSON.parse(getCookie('progress'));
		}else{//Nieuwe gebruiker
		}
		//progress.currentlvl = 1;

		var canvas = document.getElementById("cnvs");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		stage = new createjs.Stage("cnvs");
		width = stage.canvas.width;						// om mee te geven aan World, om player te volgen
		height = stage.canvas.height;
		stage.enableMouseOver();

		isPlaying = false;

		ticker = createjs.Ticker;
		ticker.setFPS(20);
		ticker.addEventListener("tick",update);

		createjs.Sound.addEventListener("fileload", handleLoadComplete);
		createjs.Sound.registerSound({src:"assets/music/ingame.mp3|assets/music/ingame.ogg", id:"ingame"});
		createjs.Sound.registerSound({src:"assets/music/menu.mp3|assets/music/menu.ogg", id:"menu"});


		/* STAGE UPDATER */
		this.addEventListener('updateStage',function(){
			console.log('[App] update the stage!')
			update();
		})

		/* EVENTLISTENERS SCHERMEN */
		this.addEventListener('removeHomeScreen',function(){
			if(firstTime){
				changeScreen('intro')
			}else{
				//changeScreen('Game');
				changeScreen('progress');
			}
		});
		this.addEventListener('removeIntroScreen',function(){
			console.log('[App] dispatched event received')
			progress = {'currentlvl':1,'points':0};
			//progress = JSON.stringify(progress);
			document.cookie="progress="+JSON.stringify(progress);
			//changeScreen('Game');
			changeScreen('progress');
		});
		this.addEventListener('updateInfoScreen',function(){
			console.log('[App] dispatched event received')
			currentScreen.updateInfoScreen();
		});
		


		/* SPELSCHERMEN */
		this.addEventListener('boomEnded',function(){
			console.log('[App] dispatched event received - boom')
			changeScreen('boomEnded');
		});
		this.addEventListener('sleepyEnded',function(){
			console.log('[App] dispatched event received - sleepy')
			changeScreen('sleepyEnded');
		});

		this.addEventListener('checkPointReached',function(){
			console.log('[App] dispatched event received - checkPointReached')
			changeScreen('checkPointReached');
		});

		this.addEventListener('retakeLevel',function(){
			console.log('[App] dispatched event received - en oppernieuw')
			changeScreen('game');
		});
		

		/* SOUND */
		this.addEventListener('GameStarted',function(){
			console.log('[App] change song!');
			changeScreen('game');
			changeSong("ingame");
		})
		this.addEventListener('nextLevel',function(){
			console.log('[App] change song!');
			progress = JSON.parse(getCookie('progress'));

			changeScreen('game');
			changeSong("ingame");
		})
		/* MUZIEKKNOP (VANUIT DE TOOLBAR) BEHEERSEN */	
		this.addEventListener('musicMaestro',function(){
			isPlaying = !isPlaying;
			console.log("muziek speelt: " + isPlaying);
			if(isPlaying){instance.stop();}else{instance.play();}
		});

		
		
	}	

	function handleLoadComplete(event) {
			if(event.id == "menu"){
				getXML();
			}
	}	

	function changeSong(song){
		createjs.Sound.stop();
		switch(song){
			case "ingame":
			//instance = createjs.Sound.play("ingame");
			break;

			case "menu":
			//instance = createjs.Sound.play("menu",createjs.Sound.INTERRUPT_ANY, 0, 0, 1, 1, 0);
			break;
		}
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
			stage.removeChild(oldScreen.container);
			update();
		}

		console.log(screenName);
		switch(screenName){			//boomEnded
			case "game":
				console.log('change screen to Game');
				currentScreen = new Game(progress, xml);
				console.log( currentScreen.name );
				break;
			case "boomEnded":
				console.log('change screen to Boom');
				currentScreen = new BetweenScreen("boom");
				changeSong("menu");
				break;

			case "checkPointReached":
				console.log('change screen to checkPointReached');
				currentScreen = new BetweenScreen("checkpoint");
				break;

			case "sleepyEnded":
				console.log('change screen to sleepyEnded');
				currentScreen = new BetweenScreen("sleepyEnded");
				break;

			case "progress":
				console.log('change screen to Progress');
				currentScreen = new ProgressScreen(progress, xml);
				console.log( currentScreen.name );
				break;
			case "intro":
				console.log('change screen to Intro');
				currentScreen = new IntroScreen();
				break;
			case "welcome":
				console.log('change screen to Welcome');
				currentScreen = new WelcomeScreen();
				changeSong("menu");
				break;
		}

		stage.addChild(currentScreen.container);
		update();
	}

	function getXML(){
		$.ajax({        	
        	type: "GET",
			url: "xml/tourmap.xml",
			dataType: "xml",
			success: function(data) {
				xml = data;
				changeScreen('welcome');
			}
		});
	}

	function update(){
		stage.update();
		//console.log("fps: " + ticker.getMeasuredFPS());
		if(currentScreen.name === "game"){
			currentScreen.update();	
		} 
	}


	init();

})();
