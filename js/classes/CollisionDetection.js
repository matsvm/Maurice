// botst het links, boven, onder,...

var CollisionDetection = (function(){

	function CollisionDetection(){
		
	}

	CollisionDetection.gasCollision = function(shapeA,arrayShape){

		var shapeB = arrayShape[0];
		var vX = (shapeA.x) - (shapeB.x + (shapeB.width/2));
		var vY = ((shapeA.y + (shapeA.height/2)) - (shapeB.y + (shapeB.height))) + 200;

		var hWidths = (shapeB.width/2);
		var hHeights = (shapeB.height/2);

		console.log();
		if( Math.abs(vX) < hWidths && vY < hHeights ){
			console.log("vY: " + Math.abs(vY));
			console.log("hHeights: " + hHeights);

			arrayShape[1] = true;
			return arrayShape;
		}else{
			arrayShape[1] = false;
			return arrayShape;
		}

	}

	CollisionDetection.checkCollision = function(shapeA,shapeB){

		//console.log(shapeB);
		//console.log(shapeB.name);
		var vX = (shapeA.x) - (shapeB.x + (shapeB.width/2));
		var vY = (shapeA.y) - (shapeB.y + (shapeB.height/2));

		// halve breedtes, halve hoogtes
		var hWidths = (shapeA.width/2) + (shapeB.width/2);
		var hHeights = (shapeA.height/2) + (shapeB.height/2);

		// verschil maken tussen rotsen/boundaries omdat hij daar ni overheen mag gaan
		if(shapeB.name == "bound"){
			vY -= 50; 
			if(shapeA.maurice.rotation > 0)vX -= (shapeA.width/2)-20;
			if(shapeA.maurice.rotation < 0)vX -= (shapeA.width/2)+20;	
		}else{
			vX = (shapeA.x) - (shapeB.x + (shapeB.width/2));
			vY = (shapeA.y-100 + (shapeA.height/2)) - (shapeB.y + (shapeB.height));			//regY is ingesteld op 100

			if(shapeB.name == "rock") vY += 100;
			//if(shapeB.name == "gas") vY += 200;

			hWidths = (shapeB.width/2);
			hHeights = (shapeB.height/2);
		}
			
		if( Math.abs(vX) < hWidths && Math.abs(vY) < hHeights ){

			console.log("ik sta er bovenop!");
			
			if( shapeB.name == "bound" || shapeB.name == "rock" ){
				var oX = hWidths - Math.abs( vX );
				var oY = hHeights - Math.abs( vY );

				if( oX >= oY ){
					if(vY > 0){	
						//colDir = "t";	// botsen bovenop
						//shapeA.y += oY;
					}else{
						shapeA.y -= oY;
					}
				}else{
					if(vX > 0){	
						shapeA.x += oX;
					}else{
						shapeA.x -= oX;
					}

					if(shapeB.name == "bound") shapeA.maurice.rotation = 0;
					
				}
			}else{

			}
			return shapeB;
		}
		return;
		
	}

	return CollisionDetection;


})();