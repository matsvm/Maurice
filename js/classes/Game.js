
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
	var gasBoxesActive;
	var gasFlag;
	var gasBoxes;
	var decreaseTicks;
	var progress;
	var container;
	var progressScreen;
	var counter;
	var huidigeLvlData;
	var world;
	var toolBar;
	var energyBar;
	var bugs;
	var timer;
	var wereldBreedte

	var gameEnded;
	var priceScreen;
	var secondBoxes;
	var secondGasBoxes;

	function Game(receivedProgress, receivedXml){

		console.log('[GAME] constructor');

		this.container = new createjs.Container();
		//this.scale = window.innerHeight/1875;
		//this.container.scaleX = this.container.scaleY = this.scale;
		this.container.width = window.innerWidth;
		console.log(this.container.width);
		this.container.x = 0;
		//this.container.regX =4167/2;

		this.progress = receivedProgress;
		console.log(this.progress);

		this.xml = receivedXml;
		this.name = "game";
		this.ticks = 0;
		gasBoxes = [];
		if(this.progress.currentlvl>=13){
			dispatchEvent(new Event('comingSoon'),true);
		}
		this.draw();
		
		/* SETTINGS */
		gameEnded=false;
		counter = 0;
		window.clearInterval(timer);

		timer = setInterval(function(){counter ++},1000);
		boxes = [];
		keys = [];
		
		gasFlag = false;
		bugs = 0;
		decreaseTicks = 1000;



	}
	Game.prototype.pauseTimer = function() {
		console.log('[Game] dispatched event received - en pauzeGame');

		window.clearInterval(timer);
	};
	Game.prototype.resumeTimer = function() {
		timer = setInterval(function(){counter ++},1000);
	};

	Game.prototype.update = function(){
		 //CHEAT
		$(window).keydown(function(e){
			//console.log(e.keyCode);
			switch(e.keyCode){
				case 16:
				shift = true;
				break;

				case 187:
				if(shift== true){
					player.speed+=1;
					shift=false;
				}
				break;
				case 83: 
					if(gameEnded==false){
						var maxTime = $(huidigeLvlData).attr('maxTime');
						var tijdFactor = (maxTime/counter)
						console.log(tijdFactor);
						this.score = Math.floor(tijdFactor*bugs);
						console.log(this.score);
						//priceScreen = new PriceScreen(score,progress.points,progress.points+score);
						this.progress.points +=this.score;
						this.progress.currentlvl +=1;
						this.progress.latestPoints = this.score;
						document.cookie="progress="+JSON.stringify(this.progress);

						dispatchEvent(new Event("checkPointReached"),true);
						gameEnded=true;
					}
				break;
			}
		})
		
		this.ticks++;
				for(var i = 0; i < this.container.children.length; i++){
					if(this.container.children[i].name == "pauzeContainer") this.container.removeChild(this.pauzeContainer);
				}
				energyBar.updateEnergy(player.speed);

		if( this.ticks%30 == 0 ){
			if (player.speed > 0.1 ){
				player.speed -= 0.3;	
			}else{
				player.speed = 0;
				dispatchEvent(new Event("sleepyEnded"),true);
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
						gasFlag = true;
						toolBar.vogel.paused = false;
					}
				}else if(gasBoxesActive == 0){
					if(gasFlag){
						console.log("er is geen gas");
						gasFlag = false;
						toolBar.vogel.gotoAndStop(0);
					}
				}

				//* GEWONE COLLISION *//
				for(var i = 0; i < secondBoxes.length; i++){
					returnedBox = CollisionDetection.checkCollision(player, secondBoxes[i]);
					if( typeof(returnedBox) === "object" && returnedBox.name != ""){
						if(returnedBox.name != "bound"){
							
							console.log(returnedBox.sprite);
							if( returnedBox.box.currentFrame != 3){
							switch (returnedBox.name){
								case "worm":
								player.speed += 1;	
								returnedBox.box.gotoAndStop(3);
								break;
								case "bug":
								bugs++;
								toolBar.bugCount = bugs;
								toolBar.bugCountChanged = true;
								returnedBox.box.gotoAndStop(3);
								break;
								case "gas":
								console.log("boom!");
								dispatchEvent(new Event("boomEnded"),true);
								break;
								case "checkpoint":
								dispatchEvent(new Event("checkPointReached"),true);
								break;
								case "rock":
								case "stone":
									if( !flagSpeed ){
										decreaseTicks = 500;
										flagSpeed = true;
										oldSpeed = player.speed;
									}
									if(returnedBox.name == "stone"){
										player.speed = 1;	
									}
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
			//}
	}

	Game.prototype.draw = function(){

		width = window.innerWidth;
		height = window.innerHeight;
		
		energyBar = new EnergyBar();
		energyBar.x = energyBar.x = window.innerWidth/2;
		toolBar = new ToolBar(this.progress.currentlvl,7);
		//toolBar.container.x = window.innerWidth - (785*this.scale);				// 785 = breedte background	
		toolBar.container.x = window.innerWidth-378;
		
		wereldBreedte = Math.floor(width-(width-toolBar.container.x))+1;
		world = new World(1728,3239,this.progress.currentlvl);
		world.boundH = -(world.height - height);
		world.boundW = -(world.width - width);	
		gridWidth = world.width/9;
		gridHeight = world.height/34;
		console.log("breedte wereld: " + world.width);
		
		boxes = this.buildBounds();
		console.log("voor grid");
		console.log(boxes);
		this.buildGrid( this.xml );
		console.log("na grid");
		toolBar.x=400;
		console.log(boxes);

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

		console.log(gasBoxes);
		rows = world.width/gridWidth;
		cols = world.height/gridHeight;
		var progressie = this.progress;
		$(xml).find('level').each(function(index, value){
			var id = $(value).attr("id");

			if(progressie.currentlvl == id){
				huidigeLvlData=value;
			}
		})
		
		console.log(huidigeLvlData);
		var secondGasBoxes = [];
		$(huidigeLvlData).find('line').each(function(index, value){
			var split = $(this).text().split(" ");
			var types = [];

		 	for( var i=0 ; i < split.length ; i++ ){

		 		switch( split[i] ){
		 			case "w":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "worm" );
		 				break;
		 			case "-":
		 			break;
		 			case "b":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "bug" );
		 				break;
					case "g":
						platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "gas" );
						console.log("gasBoxen pushen");
		 				gasBoxes.push(new Array(platform,false));
						break;
					case "m":
		 				platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "magmagas" );
		 				//world.addChild(platform.wormBox,0);
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
		 		console.log(platform.box);
		 		world.addChild(platform.box);
		 		console.log(world.container.getNumChildren());
		 		if(split[i] != "-"){ boxes.push(platform); }
		 		console.log(boxes.length);
			}
		});

		this.boxSheet = new createjs.SpriteSheet({
				images:["./assets/sprites/wormboxes.png"],
				frames:{width:83, height:83}
				//animations:{worm1:0,worm2:1,worm3:2,worm4:3}
			});
		this.box = new createjs.Sprite(this.boxSheet, 0);
		this.box.x = window.width/2;
		this.box.y = 300;
		world.addChild(platform.box);
			
		player = new Player( Math.round(world.width/2), 0, 173, 203);
		world.addChild( player.maurice, 0 );
		world.oldPoint.x = player.x;
		world.oldPoint.y = player.y;
		world.oldMidPoint = world.oldPoint;

		secondBoxes = boxes;
		console.log("grid aangemaakt");
		console.log(boxes);

	}

	return Game;
})()
