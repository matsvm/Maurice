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

 */

var Game = (function(){
var progress;
var container;
var progressScreen;
	function Game(){
		console.log("GameKlasse Added");
		this.container = new createjs.Container()
		container = this.container;

		getXML();

	}
	function addProgressScreen(xml){
		progressScreen = new createjs.Container();


		var background = new createjs.Bitmap("assets/ProgressBackground.png");
		background.scaleX = background.scaleY= 0.5;
		progressScreen.addChild(background);

		$(xml).find('level').each(function(index, value){
			console.log($(value).attr("checkpoint"));
			var x=$(value).attr("x")
			var y=$(value).attr("y")
			var progressDot = new createjs.Bitmap("assets/progressLVL.png");
			progressDot.x = x;
			progressDot.y = y;
			
			progressScreen.addChild(progressDot);


		})
		var playBtn = new createjs.Bitmap("assets/btnPlay.png");
		playBtn.x = 900;
		playBtn.y = 650;

		progressScreen.addChild(playBtn);
		container.addChild(progressScreen);
		playBtn.addEventListener('click',function(){
			startGame();
		});	
		playBtn.addEventListener('rollover',function(){
			playBtn.cursor = "pointer";
		})

		
	}


	
	function startGame() {
		console.log('game started');
		var counter = 0;
		var timer = setInterval(function(){console.log(counter);counter ++},1000);

		container.removeChild(progressScreen);
		var TURN_FACTOR = 5;		//how far the ship turns per frame

		var boxes, player, width, height, bugs, platform;
		var ticker, keys, world;

		var gridHeight = 25;
		var gridWidth = 25;

		var rows;
		var cols;

		/* MASK */
		var maskImage, maskedImage;
		var drawingCanvas, isDrawing;
		var oldPt, oldMidPt;
		console.log("Game Started");
		boxes = [];
		keys = [];
		bugs = 0;
		
		stage = new createjs.Stage("cnvs");
		world = new World(800,1200);
		// om mee te geven aan World, om player te volgen
		width = stage.canvas.width;
		height = stage.canvas.height;
		// marges die je hebt om de wereld te bewegen, is een negatieve waarde
		world.boundH = -(world.height - height);
		world.boundW = -(world.width - width);		
		player = new Player( Math.round(world.width/2), 0, 20, 20);
		buildBounds();
		//buildPlatforms();
		//buildBugs();
		
		player.gravity = world.gravity;
		player.friction = world.friction;
		
		/* MASK */
		maskedImage = new Image();
		maskedImage.onload = handleComplete;
		maskedImage.src = "assets/masked.png";

		maskImage = new Image();
		maskImage.onload = handleComplete;
		maskImage.src = "assets/mask.png";

		getXML();

		oldPt = new createjs.Point(player.x, player.y);
		oldMidPt = oldPt;

		ticker = createjs.Ticker;
		ticker.setFPS(60);
		ticker.addEventListener("tick",update);

		window.onkeyup = keyup;
		window.onkeydown = keydown;

		stage.addChild(world.container);

	

		function handleComplete() {
				
				drawingCanvas = new createjs.Shape();
				bitmapMasked = new createjs.Bitmap(maskedImage);
				bitmapMask = new createjs.Bitmap(maskImage);
				
				world.addChild(bitmapMask,bitmapMasked);
				
				world.addChild( player.shape, 0 );
				updateCacheImage(false);

			}



			function handleMouseMove(event) {

				var midPoint = new createjs.Point(oldPt.x + player.x >> 1, oldPt.y + player.y >> 1);

				drawingCanvas.graphics.setStrokeStyle(20, "round", "round")
					.beginStroke("rgba(0,0,0,0.55)")
					.moveTo(midPoint.x + player.width/2, midPoint.y + player.width/2)
					.curveTo(oldPt.x + player.width/2, oldPt.y + player.width/2, oldMidPt.x + player.width/2, oldMidPt.y + player.width/2);

				oldPt.x = player.x;
				oldPt.y = player.y;

				oldMidPt.x = midPoint.x;
				oldMidPt.y = midPoint.y;

				updateCacheImage(true);

			}

			function updateCacheImage(update) {
				if (update) {
					drawingCanvas.updateCache(0, 0, maskedImage.width, maskedImage.height);
				} else {
					drawingCanvas.cache(0, 0, maskedImage.width, maskedImage.height);
				}

				maskFilter = new createjs.AlphaMaskFilter(drawingCanvas.cacheCanvas);

				bitmapMask.filters = [maskFilter];
				if (update) {
					bitmapMask.updateCache(0, 0, maskedImage.width, maskedImage.height);
				} else {
					bitmapMask.cache(0, 0, maskedImage.width, maskedImage.height);
				}

				stage.update();
			}

			function update(){

				/*  MASK */
				//handleMauriceMove();
				
				handleMouseMove();

				// om aantal ticks gaat de snelheid van maurice naar beneden
				if( ticker.getTicks()%120 == 0 ){

					if (player.velY > 0 ){
						player.velY -= 0.1;	
					}else{
						player.velY = 0;
						console.log("in slaap gevallen");
						clearInterval(timer);
					} 
					//console.log( player.velY );

				}
				
				//console.log( player.shape.rotation );
				if( keys[37] ){
					if( player.shape.rotation > -45 ) player.shape.rotation -= TURN_FACTOR;
						
						player.velX = -2;
						//player.velX = -player.velY;
				}
				if( keys[39] ){
					if( player.shape.rotation < 45 ) player.shape.rotation += TURN_FACTOR;
						player.velX = player.velY;
				}
				if( keys[40] ){
					player.shape.rotation = 0;
					player.velX = 0;
				}
				//console.log( player.shape.rotation );

				// check for collision
				player.grounded = false;

				for(var i = 0; i < boxes.length; i++){

					returnedBox = CollisionDetection.checkCollision( player, boxes[i]);
					
					if( typeof(returnedBox) === "object" && returnedBox.name != ""){
						console.log( returnedBox.name );
						// extra controle anders bleef hij de box maar verwijderen en velY toevoegen
						if( world.container.contains( returnedBox.shape ) ||  returnedBox.name == "bound" ){

							switch (returnedBox.name){
								case "box":
								if(player.velY <= 0.9) player.velY = 0.9;	
								break;
								case "bug":
								bugs++;
								break;
								case "power":
								player.velY = 1.9;
								break;
								case "bound":
								//player.velY = 1.9;
								break;
							}
							//console.log( world.container.getNumChildren() );
							world.container.removeChild( returnedBox.shape );
								
						}
						break;
					
					}
					
				}

				// aanpassen van wereld aan positie player
				// offset kan je visueel mee spelen om dynamiek in beeld te brengen
				world.followPlayerX(player, width, 0);
				world.followPlayerY(player, height, 0);
				player.update();
				stage.update();
			}

			function keyup(e){
				keys[e.keyCode] = false;
			}

			function keydown(e){
				keys[e.keyCode] = true;
			}

			// uitlezen xml en plaatsen elementen
			function buildGrid(xml){

				rows = stage.canvas.width / gridWidth;
				cols = stage.canvas.height / gridHeight;

				$(xml).find('line').each(function(index, value){

		 			var split = $(this).text().split(" ");
		 			for( var i=0 ; i < split.length ; i++ ){

		 				switch( split[i] ){

		 					case "w":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,10 , 10, "box" );
							break;

		 					case "-":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,10 , 10, "box" );
							break;

		 					case "b":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,10 , 10, "bug" );
							break;

							case "p":
		 					platform = new Box( i%cols * gridWidth , index%cols * gridHeight ,10 , 10, "power" );
							break;

		 				}

		 				world.addChild(platform.shape,0);
						boxes.push(platform);
						stage.update();

		 			}

				});

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

 				addProgressScreen( xml );
			}
		});
	}

	return Game;
})()



	
		

	

