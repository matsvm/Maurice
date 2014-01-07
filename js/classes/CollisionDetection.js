// botst het links, boven, onder,...

var CollisionDetection = (function(){

	function CollisionDetection(){
		
	}

	CollisionDetection.checkCollision = function(shapeA,shapeB){

		/*
		var vX = (shapeA.x + (shapeA.width/2)) - (shapeB.x + (shapeB.width/2));
		var vY = (shapeA.y + (shapeA.height/2)) - (shapeB.y + (shapeB.height/2));

		var hWidths = (shapeA.width/2) + (shapeB.width/2);
		var hHeights = (shapeA.height/2) + (shapeB.height/2);
		*/

		var vX = (shapeA.x) - (shapeB.x + (shapeB.width/2));
		var vY = (shapeA.y-100 + (shapeA.height/2)) - (shapeB.y + (shapeB.height));			//regY is ingesteld op 100
		
		var hWidths = (shapeB.width/2);
		var hHeights = (shapeB.height/2);
		var colDir = "";

		// verschil maken tussen rotsen/boundaries omdat hij daar ni overheen mag gaan
		if(shapeB.name == "bound" || shapeB.name == "rock") vY += 100;
		if(shapeB.name == "gas") vY += 200;	


		if( Math.abs(vX) < hWidths && Math.abs(vY) < hHeights ){
			//console.log('collision detected!')
			
			if( shapeB.name == "bound" || shapeB.name == "rock" ){

				var oX = hWidths - Math.abs( vX );
				var oY = hHeights - Math.abs( vY );
				if( oX >= oY ){
					if(vY > 0){	
						//colDir = "t";	// botsen bovenop
						//shapeA.y += oY;
					}else{
						colDir = "b";	// botsen onder
						shapeA.y -= oY;
					}
				}else{
					if(vX > 0){	
						colDir = "l";	// botsen links
						shapeA.x += oX;
					}else{
						colDir = "r";	// botsen rechts
						shapeA.x -= oX;
					}

					if(shapeB.name == "bound") shapeA.maurice.rotation = 270;
					
				}
			}else{
				//console.log("[CollisionDetection] Shabe B:"+shapeB.box.currentFrame);
				if(shapeB.box.currentFrame != 7){				// zorgen dat als holleke empty is controles niet meer worden gedaan
						
				}
			}
			return shapeB;
		}
		return;
		
	}

	return CollisionDetection;


})();