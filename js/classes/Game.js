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

			console.log($(value).attr("id"));
			console.log(progress)
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
				console.log('lvl te doen')
				
				var grond = new createjs.Sprite(grondSheet);
				console.log("laag"+laag);
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
		var toolBar;
		var scale;

		var gridHeight;
		var gridWidth;

		var rows;
		var cols;
		var toolBar;

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
		toolBar = new ToolBar();
		console.log();
		var wereldBreedte = Math.floor(width-(width-toolBar.container.x))+1;
		world = new World(wereldBreedte,height*3,1);			//breedte, hoogte, level


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

						//console.log( "naam: " + returnedBox.name );
						// extra controle anders bleef hij de box maar verwijderen en velY toevoegen
						if(returnedBox.name != "bound"){
							if( returnedBox.box.currentFrame != 7){
							switch (returnedBox.name){
								case "worm":
								if(player.speed <= 0.9) player.speed = 0.9;	
								returnedBox.box.gotoAndStop("empty");
								//console.log("Aangepast");
								break;
								case "bug":
								console.log( "animatie: " + returnedBox.box.currentAnimation );
								bugs++;
								toolBar.bugCount = bugs;
								toolBar.bugCountChanged = true;
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
				var data = {
					images:["./assets/sprites/boxen.png"], 
					frames:{width:83, height:83},
					animations: {worm1:0, worm2:1, worm3:2, bug1:3, bug2:4, bug3:5, wormpower:6, empty:7},
					count:7
				}
				//console.log(xml);
				$(xml).find('level').each(function(index, value){
					console.log(value);
					var id = $(value).attr("id");
					console.log(id);
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



	
		

	

