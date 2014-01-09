/* DEURTIE CODE & BASIS MAAR WERKEND:
1. INLEZEN XML en AANMAKEN VERSCHILLENDE BLOKJES
2. OPETEN BLOKJES (EET ZE WEL NI ALTIJD OP)
3. MASK + VOLGEN PLAYER
4. VERTRAGEN VELY NA TE WEINIG WORMEN ETEN + UITEINDELIJK IN SLAAP VALLEN
5. INSTELLEN SNELHEID NA ETEN WORM
6. SNELLER NA POWERUP
7. VERZAMELEN BUGS OM POWERUPS TE VERZAMELEN

TODO:
2. PRINCIPE TIJD + STRAFTIJD (BIJ IN SLAAP VALLEN) ED
4. PROPER MAKEN CODE DIE NU BIJZONDER VUIL IS
5. STOPPEN VAN DE MOL EENS HIJ HET EINDE VAN DE 'WORLD' HEEFT BEREIKT
4. ... EN NOG VEEL MEER :)
HALLO

 */

var Game = (function(){
var progress;
var container;
var progressScreen;
var progress;
	function Game(receivedProgress){
		console.log("GameKlasse Added");
		this.container = new createjs.Container()
		container = this.container;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.scale = this.height/1875;
		
		container.scaleX = container.scaleY=this.scale;
		container.x =window.innerWidth/2;
		container.regX =4167/2;
		//console.log(progress);
		progress=receivedProgress;
		getXML();

	}
	function addProgressScreen(xml){
		progressScreen = new createjs.Container();
		var currentP;
		var tempCont;
		var background = new createjs.Bitmap("assets/ProgressBackground.png");
		progressScreen.addChild(background);

		var data = {
			images:["./assets/sprites/grondsoorten.png"], 
			frames:{width:117, height:117},
			animations: {laag1:0, laag2:1, laag3:2, laag4:3, laag5:4, laag6:5}
		}


		var grondSheet = new createjs.SpriteSheet(data);
		console.log(xml)
		$(xml).find('level').each(function(index, value){

			//console.log($(value).attr("id"));
			//console.log(progress)
			var id = $(value).attr("id");
			var laag = $(value).attr("layer");
			if(progressScreen.currentlvl>id){
				console.log("Lvl gepasseerd");
			}
			else if(progress.currentlvl == id){
				console.log("ben op de moment aan deze lvl")
				var x=$(value).attr("x")
				var y=$(value).attr("y")
				tempCont= new createjs.Container();
				tempCont.regX=3;
				tempCont.regY= 280;

				currentP = new createjs.Bitmap("assets/progressLVL.png");
				currentP.x = x;
				currentP.y = y;

				//currentP.hitArea();


				currentP.addEventListener('click',function(){
					console.log('click');
					startGame(xml);
				});	
				currentP.addEventListener('rollover',function(){
					currentP.cursor = "pointer";
				})
			}else if(progress.currentlvl<id){
				//console.log('lvl te doen')
				
				var grond = new createjs.Sprite(grondSheet);
				
				//console.log("laag"+laag);
				grond.gotoAndStop('laag'+laag);
				grond.x=$(value).attr("x");
				grond.y=$(value).attr("y");
				progressScreen.addChild(grond);


			}
		})
		var overlay  = new createjs.Bitmap("assets/NumberOverlay_wormpjes.png");
		progressScreen.addChild(overlay);
		progressScreen.addChild(tempCont);
		tempCont.addChild(currentP);
		container.addChild(progressScreen);

		
	}

	function endLevel(){
		console.log( "einde level bereikt, op naar het volgende" );
		//container.removeChild(progressScreen);
		//stage.removeChild(world.container);
		//stage.removeChild(toolBar.container);
	}


	
	function startGame(xml) {
		//console.log('game started');
		var counter = 0;
		var timer = setInterval(function(){counter ++},1000);

		container.removeChild(progressScreen);
		dispatchEvent(new Event("GameStarted"),true);
		var boxes, stage, player, width, height, bugs, platform;
		var img, maurice;
		var ticker, keys, world;
		var flagSpeed = false;
		var oldSpeed;
		var toolBar;
		var scale;

		var gridHeight;
		var gridWidth;

		var rows;
		var cols;
		var toolBar;
		var pauzeContainer, pauzeScherm;
		var gasBoxesActive, gasBoxes, gasFlag;

		console.log("Game Started");
		boxes = [];
		keys = [];
		gasBoxes = [];
		gasFlag = false;
		
		bugs = 0;
		var energyBar = new EnergyBar();
		energyBar.x = window.innerWidth/2;
		
		
		

		var canvas = document.getElementById("cnvs");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		stage = new createjs.Stage("cnvs");
		width = stage.canvas.width;						// om mee te geven aan World, om player te volgen
		height = stage.canvas.height;
		// nog punten uit te lezen
		toolBar = new ToolBar(progress.currentlvl,7);
		
		var wereldBreedte = Math.floor(width-(width-toolBar.container.x))+1;
		world = new World(wereldBreedte,2700,progress.currentlvl);			//breedte, hoogte, huidige level

		// marges die je hebt om de wereld te bewegen, is een negatieve waarde
		world.boundH = -(world.height - height);
		world.boundW = -(world.width - width);	
		gridWidth = world.width/9;
		gridHeight = world.height/9;
		
		buildBounds();
		
		//getXML();
		buildGrid( xml );

		ticker = createjs.Ticker;
		ticker.setFPS(30);
		ticker.addEventListener("tick",update);
		

		window.onkeyup = keyup;
		window.onkeydown = keydown;

		stage.addChild(world.container);
		stage.addChild(toolBar.container);
		stage.addChild(energyBar.container);

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

		

		function update(event){
			
			if(event.paused){

				stage.update();
				
				if( ticker.getTicks()%1000 == 0 ){
					ticker.setPaused(false);
				}
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
						player.maurice.gotoAndStop(0);
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
								break;
								case "magmagas":
								player.speed = 10;
								returnedBox.box.gotoAndStop("empty");
								break;
								case "rock":
								console.log("stuck!");
								break;
								case "checkpoint":
								console.log("checkpoint bereikt");
								endLevel();
								break;
								case "stone":
									if( !flagSpeed ){
										flagSpeed = true;
										oldSpeed = player.speed;
									}
								player.speed = 1;
								break;
							}
								
						}
						}						
						break;
					
					}else{
						if( flagSpeed ){
							flagSpeed = false;
							player.speed = oldSpeed;
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

			function keyup(e){
				keys[e.keyCode] = false;
			}

			function keydown(e){
				keys[e.keyCode] = true;
			}

			// uitlezen xml en plaatsen elementen
			function buildGrid(xml){

				console.log('building grid')

				rows = world.width / gridWidth;
				cols = world.height / gridHeight;

				var huidigeLvlData;
				//console.log(xml);
				$(xml).find('level').each(function(index, value){
					//console.log(value);
					var id = $(value).attr("id");
					//console.log(id);
					if(progress.currentlvl == id){
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
						stage.update();
		 			}

				});

				player = new Player( Math.round(world.width/2), 0, 173, 203);
				world.addChild( player.maurice, 0 );
				world.oldPoint.x = player.x;
				world.oldPoint.y = player.y;
				world.oldMidPoint = world.oldPoint;

				

			}

			function buildBounds(){
				boxes.push( new Bounds(0, world.height - 1, world.width, 1, "bound") );				//onderaan
				boxes.push( new Bounds(0, 0, 1, world.height, "bound") );							//links
				boxes.push( new Bounds(world.width - 1, 0, 1, world.height, "bound") );				//rechts
			}
		}

	function getXML(){
		$.ajax({        	
        	type: "GET",
			url: "xml/tourmap.xml",
			dataType: "xml",
			success: function(xml) {
 				addProgressScreen	( xml );
			}
		});
	}


	return Game;
})()



	
		

	

