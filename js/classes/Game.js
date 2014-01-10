
var Game = (function(){

	var player, width, height, platform;
	var img, maurice;
	var keys;
	var flagSpeed = false;
	var oldSpeed;
	var scale;

	var gridHeight;
	var gridWidth;
	var rows;
	var cols;

	var toolBar;
	var pauzeContainer, pauzeScherm;
	var gasBoxesActive, gasBoxes, gasFlag;
	var decreaseTicks;
	var progress;
	var container;
	var progressScreen;
	var counter;
	var ticker;
	var huidigeLvlData;
	var stage;
	var world;
	var toolBar;
	var energyBar;
	var bugs;
	var timer;
	var gameEnded=false;
	var priceScreen;

	function Game(receivedProgress, receivedXml){

		console.log('[GAME] constructor');

		this.container = new createjs.Container();
		this.scale = window.innerHeight/1875;
		this.container.scaleX = this.container.scaleY = this.scale;
		this.container.x =window.innerWidth/2;
		this.container.regX =4167/2;
		
		this.progress = receivedProgress;
		this.xml = receivedXml;
		this.name = "game";

		this.draw();
		
		/* SETTINGS */
		counter = 0;
		timer = setInterval(function(){counter ++},1000);
		boxes = [];
		keys = [];
		gasBoxes = [];
		gasFlag = false;
		bugs = 0;
		decreaseTicks = 1000;

		console.log(boxes);

		this.container.addEventListener("UpdateGame",this.update);
		//this.container.addEventListener("nextLevel",startGame);
	}

	Game.prototype.update = function(){
		console.log('update');
	}

	Game.prototype.draw = function(){

		width = window.innerWidth;
		height = window.innerHeight;
		
		energyBar = new EnergyBar();
		energyBar.x = energyBar.x = window.innerWidth/2;
		toolBar = new ToolBar(this.progress.currentlvl,7);
		var wereldBreedte = Math.floor(width-(width-toolBar.container.x))+1;
		world = new World(wereldBreedte,2700,this.progress.currentlvl);
		world.boundH = -(world.height - height);
		world.boundW = -(world.width - width);	
		gridWidth = world.width/9;
		gridHeight = world.height/9;
		
		boxes = this.buildBounds();
		console.log( boxes );
		this.buildGrid( this.xml );
		toolBar.x=400;


		window.onkeyup = this.keyup;
		window.onkeydown = this.keydown;
		
		this.container.addChild(world.container);
		this.container.addChild(toolBar.container);
		this.container.addChild(energyBar.container);
	}

	Game.prototype.keyup = function(e){
		keys[e.keyCode] = false;
	}

	Game.prototype.keydown = function(e){
		keys[e.keyCode] = true;
	}

	Game.prototype.buildBounds = function(){

		var localBoxes = [];
		localBoxes.push( new Bounds(0, world.height - 1, world.width, 1, "bound") );				//onderaan
		localBoxes.push( new Bounds(0, 0, 1, world.height, "bound") );							//links
		localBoxes.push( new Bounds(world.width - 1, 0, 1, world.height, "bound") );				//rechts
		return localBoxes;
	}

	Game.prototype.buildGrid = function(xml){

		console.log('building grid')

		/*
		rows = world.width/gridWidth;
		cols = world.height/gridHeight;
				
		console.log(xml);
		$(xml).find('level').each(function(index, value){
			
			var id = $(value).attr("id");
			if(this.progress.currentlvl == id){
				huidigeLvlData=value;
			}
		})
		
		console.log(huidigeLvlData);
		$(huidigeLvlData).find('line').each(function(index, value){

		 	var split = $(this).text().split(" ");
		 	for( var i=0 ; i < split.length ; i++ ){

		 		switch( split[i] ){
		 			case "w":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "worm" );
						break;
		 			case "-":
		 				//platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,10 , 10, "box" );
						break;
		 			case "b":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "bug" );
						break;
					case "g":
						platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "gas" );
		 				gasBoxes.push(new Array(platform,false));
						break;
					case "m":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "magmagas" );
						break;
					case "s":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "stone" );
						break;
					case "r":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "rock" );
						break;
					case "c":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "checkpoint" );
		 				break;
		 		}
		 			world.addChild(platform.box,0);
					boxes.push(platform);
					
					dispatchEvent(new Event("updateStage"),true);
			}
		});

			player = new Player( Math.round(world.width/2), 0, 173, 203);
			world.addChild( player.maurice, 0 );
			world.oldPoint.x = player.x;
			world.oldPoint.y = player.y;
			world.oldMidPoint = world.oldPoint;

			*/	

	}

/*
	function stopLevel(doneWrong){
			ticker.removeAllEventListeners();
			window.clearInterval(timer);
			stage.removeChild(world.container);
			//stage.removeChild(toolBar.container);
			stage.removeChild(energyBar.container);
			console.log( world );
			console.log( toolBar );
			console.log( energyBar );
			stage.update();
			
			console.log( world );
			console.log( toolBar );
			console.log( energyBar );
			stage.autoClear = true; // This must be true to clear the stage.
			stage.clear();
			stage.removeAllChildren();
			stage.removeAllEventListeners();
			stage.update();
			
			console.log('stop het level: ' + doneWrong);
			window.clearInterval(timer);
			console.log( stage.getNumChildren() );
			console.log( stage.children );
			stage.removeChild(world);
			//stage.removeAllChildren();
			
			//stage.update();
			console.log( stage.getNumChildren() );
			console.log( stage.children );
			console.log( world );
			console.log( toolBar );
			console.log( energyBar );
			ticker.setPaused(true);

			

			this.betweenScreen = new BetweenScreen(doneWrong);
			stage.addChild(this.betweenScreen.container);

			this.addEventListener('retakeLevel',function(){
				startGame(savedXml);
				ticker.setPaused(false);
			});

	}*/

	function endLevel(){
		if(gameEnded==false){
			ticker.removeAllEventListeners();
			window.clearInterval(timer);
			stage.removeChild(world.container);
			stage.removeChild(toolBar.container);
			stage.removeChild(energyBar.container);
			gameEnded=true;

			var maxTime = $(huidigeLvlData).attr('maxTime');
			var tijdFactor = (maxTime/counter)
			console.log(tijdFactor);
			var score = Math.floor(tijdFactor*bugs);
			console.log(score);
			priceScreen = new PriceScreen(score,progress.points,progress.points+score);
			progress.points +=score;
			progress.currentlvl +=1;
			document.cookie="progress="+JSON.stringify(progress);
			stage.addChild(priceScreen.container);

			//container.addChild(priceScreen.container);

			//console.log( "einde level bereikt, op naar het volgende" );

		}else{

		}
		//console.log(gameEnded)

		//container.removeChild(progressScreen);
		
	}


	
	function startGame(xml) {
		//console.log('game started');

		
		/* PAUZEREN */
		this.addEventListener('pauzeGame',function(){

			this.pauzeContainer = new createjs.Container();
			this.scale = window.innerHeight/1875;
			this.pauzeContainer.scaleX = this.pauzeContainer.scaleY = this.scale;
			this.pauzeContainer.x =window.innerWidth/2;
			this.pauzeContainer.regX =4167/2;
			this.pauzeContainer.name = "pauzeContainer";
		
			this.pauzeScherm = new createjs.Bitmap("assets/bg_pauze.png");
			
			this.unPauzeBtn = new createjs.Bitmap("assets/btn_continue.png");
			this.unPauzeBtn.x = 1030;
			this.unPauzeBtn.y = 435;

			this.unPauzeBtn.addEventListener('rollover',function(){
				this.unPauzeBtn.cursor = "pointer";
			})
			this.unPauzeBtn.addEventListener('click',function(){
				console.log("unpause please");
				ticker.setPaused(false);	
			})

			this.pauzeContainer.addChild(this.pauzeScherm);
			this.pauzeContainer.addChild(this.unPauzeBtn);
			stage.addChild(this.pauzeContainer);
			
			ticker.setPaused(true);
		})

		

		 function updates(){
			
			if(event.paused){
				stage.removeChild(world.container);
				stage.update();
				console.log( world );
				return;
			}else{
				for(var i = 0; i < stage.children.length; i++){
					if(stage.children[i].name == "pauzeContainer") stage.removeChild(this.pauzeContainer);
				}
				energyBar.updateEnergy(player.speed);

				if( ticker.getTicks()%30 == 0 ){
					if (player.speed > 0.1 ){
						player.speed -= 0.1;	

					}else{
						player.speed = 0;
						stopLevel("asleep");
						//player.maurice.gotoAndStop(0);
					}
				}
				
				// Pijltjes toetsen
				if( keys[37] ){
					if(player.angle<325) player.angle ++;
				}
				if( keys[39] ){
					if(player.angle>215)player.angle --;
				}

				/* GASCOLLISION */
				gasBoxesActive = 0;
				for(var i = 0; i < gasBoxes.length; i++){
						gasBox = CollisionDetection.gasCollision(player, gasBoxes[i]);
						if( gasBox[1] == true){
							gasBoxesActive++;
						}
				}
				if(gasBoxesActive > 0){
					if(!gasFlag){
						console.log();
						gasFlag = true;
						toolBar.vogel.paused = false;
					}
				}else{
					if(gasFlag){
						gasFlag = false;
						toolBar.vogel.gotoAndStop(0);
					}
				}

				//* GEWONE COLLISION *//
				for(var i = 0; i < boxes.length; i++){
					
					returnedBox = CollisionDetection.checkCollision(player, boxes[i]);
					if( typeof(returnedBox) === "object" && returnedBox.name != ""){

						if(returnedBox.name != "bound"){
							
							if( returnedBox.box.currentFrame != 7){
							switch (returnedBox.name){
								case "worm":
								player.speed += 1;	
								returnedBox.box.gotoAndStop("empty");
								break;
								case "bug":
								bugs++;
								toolBar.bugCount = bugs;
								toolBar.bugCountChanged = true;
								returnedBox.box.gotoAndStop("empty");
								break;
								case "gas":
								console.log("boom!");
								returnedBox.box.gotoAndStop("empty");
								ticker.removeAllEventListeners();
								stage.removeAllEventListeners();
								//stopLevel("boom");
								dispatchEvent(new Event("boomEnded"),true);
								break;
								case "magmagas":
								player.speed = 10;
								returnedBox.box.gotoAndStop("empty");
								break;
								case "checkpoint":
								console.log("checkpoint bereikt");
								endLevel();
								break;
								case "rock":
								case "stone":
									if( !flagSpeed ){
										decreaseTicks = 500;
										flagSpeed = true;
										oldSpeed = player.speed;
									}
									if(returnedBox.name == "stone")player.speed = 1;
								break;
							}
								
						}
						}						
						break;
					
					}else{
						if( flagSpeed ){
							flagSpeed = false;
							player.speed = oldSpeed;
							decreaseTicks = 1000;
						}
					}
				}

				// aanpassen van wereld aan positie player
				// offset kan je visueel mee spelen om dynamiek in beeld te brengen
				world.followPlayerX(player, wereldBreedte, 0);				//wereldBreedte, andere breedte klopt ni meer
				world.followPlayerY(player, height, 90);

				toolBar.update(counter);
				player.update();
				world.update(player);
				stage.update();
				//dispatchEvent(new Event('updateStage'))
			}
		}

			

			// uitlezen xml en plaatsen elementen
			

			
		}


	return Game;
})()
