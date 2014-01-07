/* DEURTIE CODE & BASIS MAAR WERKEND:
1. INLEZEN XML en AANMAKEN VERSCHILLENDE BLOKJES
2. OPETEN BLOKJES (EET ZE WEL NI ALTIJD OP)
3. MASK + VOLGEN PLAYER
4. VERTRAGEN VELY NA TE WEINIG WORMEN ETEN + UITEINDELIJK IN SLAAP VALLEN
5. INSTELLEN SNELHEID NA ETEN WORM
6. SNELLER NA POWERUP
7. VERZAMELEN BUGS OM POWERUPS TE VERZAMELEN

TODO:
1. IMPLEMENTEREN LEVELS
2. PRINCIPE TIJD + STRAFTIJD (BIJ IN SLAAP VALLEN) ED
3. GRIDHEIGHT/WIDTH AFSTELLEN
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
		//console.log(progress);
		progress=receivedProgress;
		getXML();

	}
	function addProgressScreen(xml){
		progressScreen = new createjs.Container();


		var background = new createjs.Bitmap("assets/ProgressBackground.png");
		progressScreen.addChild(background);

		this.width = window.innerWidth;
	
		this.scale = this.height/1875;
		
		background.scaleX = background.scaleY=this.scale;
		background.x =window.innerWidth/2;
		background.regX =4167/2;
		console.log(xml)
		$(xml).find('level').each(function(index, value){
			console.log($(value).attr("id"));
			console.log(progress)
			var id = $(value).attr("id");
			if(progress.currentlvl == id){
				var x=$(value).attr("x")
				var y=$(value).attr("y")
				var progressDot = new createjs.Bitmap("assets/progressLVL.png");
				progressDot.x = x;
				progressDot.y = y;
				
				progressScreen.addChild(progressDot);
			}else if(progress.currentlvl<id){

			}
			


		})
		var playBtn = new createjs.Bitmap("assets/btnPlay.png");
		playBtn.x = 900;
		playBtn.y = 650;

		progressScreen.addChild(playBtn);
		container.addChild(progressScreen);
		playBtn.addEventListener('click',function(){
			startGame(xml);
		});	
		playBtn.addEventListener('rollover',function(){
			playBtn.cursor = "pointer";
		})

		
	}


	
	function startGame(xml) {
		//console.log('game started');
		var counter = 0;
		var timer = setInterval(function(){console.log(counter);counter ++},1000);

		container.removeChild(progressScreen);
		var boxes, stage, player, width, height, bugs, platform;
		var img, maurice;
		var ticker, keys, world;
		var flagSpeed = false;
		var oldSpeed;

		var gridHeight;
		var gridWidth;

		var rows;
		var cols;

		console.log("Game Started");
		boxes = [];
		keys = [];
		bugs = 0;
		
		var canvas = document.getElementById("cnvs");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		stage = new createjs.Stage("cnvs");
		width = stage.canvas.width;						// om mee te geven aan World, om player te volgen
		height = stage.canvas.height;
		world = new World(width-200,height*3,1);			//breedte, hoogte, level
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

	

		function update(){
				// om x aantal ticks gaat de snelheid van maurice naar beneden
				if( ticker.getTicks()%120 == 0 ){
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

				//player.grounded = false;

				for(var i = 0; i < boxes.length; i++){
					returnedBox = CollisionDetection.checkCollision(player, boxes[i]);
					if(boxes[i].name!='bound'){
						//console.log("Frame: "+boxes[i].box.currentFrame);
					}

					if( typeof(returnedBox) === "object" && returnedBox.name != ""){

						// extra controle anders bleef hij de box maar verwijderen en velY toevoegen
						if( returnedBox.box.currentFrame != 7 ||  returnedBox.name == "bound" ){
							switch (returnedBox.name){
								case "worm":
								if(player.speed <= 0.9) player.speed = 0.9;	
								returnedBox.box.gotoAndStop("empty");
								console.log("Aangepast");
								break;
								case "bug":
								bugs++;
								console.log(bugs);
								returnedBox.box.gotoAndStop("empty");
								break;
								case "gas":
								player.speed = 10;
								returnedBox.box.gotoAndStop("empty");
								break;
								case "magmagas":
								player.speed = 10;
								returnedBox.box.gotoAndStop("empty");
								break;
								case "bound":
								case "rock":
								console.log("stuck!");
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
						break;
					
					}else{
						if( flagSpeed ){
							flagSpeed = false;
							player.speed = oldSpeed;
						}
					}
					//console.log(player.speed);
					
				}

				// aanpassen van wereld aan positie player
				// offset kan je visueel mee spelen om dynamiek in beeld te brengen
				world.followPlayerX(player, width, 0);
				world.followPlayerY(player, height, 90);

				//maskUpdate();
				player.update();
				world.update(player);
				stage.update();
				//dispatchEvent(new Event('updateStage'))
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

				var data = {
					images:["./assets/sprites/boxen.png"], 
					frames:{width:83, height:83},
					animations: {worm1:0, worm2:1, worm3:2, bug1:3, bug2:4, bug3:5, wormpower:6, empty:7}
				}

				$(xml).find('line').each(function(index, value){

		 			var split = $(this).text().split(" ");
		 			for( var i=0 ; i < split.length ; i++ ){

		 				switch( split[i] ){
		 					case "w":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "worm", data );
							break;
		 					case "-":
		 					//platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,10 , 10, "box" );
							break;
		 					case "b":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "bug", data );
							break;
							case "g":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "gas", data );
							break;
							case "m":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "magmagas", data );
							break;
							case "s":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "stone", data );
							break;
							case "r":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,83 , 83, "rock", data );
							break;

		 				}
	 					//console.log("[Game] Build gride: platform: "+platform.box.currentFrame)
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

			// haalt de wormpjes, bugs, powers,... op

			// bepaalt de grenzen van het spel
			function buildBounds(){
				boxes.push( new Bounds(0, world.height - 1, world.width, 1, "bound") );
				boxes.push( new Bounds(0, 0, world.width, 1, "bound") );
				boxes.push( new Bounds(0, 0, 1, world.height, "bound") );
				boxes.push( new Bounds(world.width - 1, 0, 1, world.height, "bound") );
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



	
		

	

