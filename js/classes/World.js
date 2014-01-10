
var World = (function(){

	function World(width, height, level){
		console.log(width);
		this.width = width;
		this.height = height;
		this.container = new createjs.Container();
		this.container.regX = this.width/2;
		this.container.x = this.width/2;

		/* verborgen achtergrond inladen */
		var bg_path = "./assets/bg/bg_level" + level + ".png"
		this.background = new createjs.Bitmap(bg_path);

		/* voorgrond + pad */
		var fg_path = "./assets/bg/fg_level" + level + ".png"
		this.forground = new createjs.Bitmap(fg_path);

		/* mask */
		this.mask = new createjs.Shape();
		this.mask.graphics.c();
		this.mask.graphics.f("rgba(0, 0, 0, .5)");
 		this.mask.graphics.dr(0, 0, this.width, this.height);
 		this.mask.graphics.ef();
 		this.mask.cache(0, 0, this.width, this.height);

 		this.container.addChild(this.background, this.forground);

		/* toepassing mask */
		this.maskFilter = new createjs.AlphaMaskFilter(this.mask.cacheCanvas);
		this.forground.filters = [
			this.maskFilter
 		];
 		this.forground.cache(0, 0, this.width, this.height);

 		/* pad */
 		this.oldPoint = new createjs.Point();
 		this.oldMidPoint = new createjs.Point();
 		this.oldPoint.x = 0;
		this.oldPoint.y = 0;
		this.oldMidPoint.x = 0;
		this.oldMidPoint.y = 0;

	}

	World.prototype.addChild = function(element) {
		this.container.addChild(element);
	};

	// update mask
	World.prototype.update = function(player){
		var midPoint = new createjs.Point(this.oldPoint.x + player.x>>1, this.oldPoint.y+player.y>>1);
		
		this.mask.graphics.c;
		this.mask.graphics.setStrokeStyle(140, "round", "round")
			.beginStroke("rgba(0,0,0,1)")
			.moveTo(midPoint.x, midPoint.y)
			.curveTo(this.oldPoint.x, this.oldPoint.y, this.oldMidPoint.x, this.oldMidPoint.y);

		this.oldPoint.x = player.x;
        this.oldPoint.y = player.y;

        this.oldMidPoint.x = midPoint.x;
        this.oldMidPoint.y = midPoint.y;
			
		this.mask.updateCache(0, 0, this.width, this.height);
		this.forground.updateCache(0, 0, this.width, this.height);
	}

	// player, width van onze canvastag, offset = karakter ni perfect in midden
	World.prototype.followPlayerX = function(player,breedte,offset) {

		//console.log(player.x + " - " + player.y);
		var x = -(player.x - (breedte/2)) + offset;
		if( x < 0 && x > -(this.width-breedte)) {
			this.container.x = x + 1728/2;	
		}
	};

	World.prototype.followPlayerY = function(player,height,offset) {		
		var y = -(player.y - (height/2)) + offset;
		if( y < this.boundH ){
			this.container.y = this.boundH;
		}else if( y > 0){
			this.container.y = 0;
		}else{
			this.container.y = y;
		}
	};

	return World;

})();