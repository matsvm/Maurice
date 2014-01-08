
var EnergyBar = (function(){
var container;
	function EnergyBar(x, y, width, height, name, data){

		this.x = x;
		this.y = y;

		this.name = name;
		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;
		this.container = new createjs.Container()
		container = this.container;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.scale = this.height/1875;
		this.container.scaleX = this.container.scaleY = this.scale

		this.draw();


	}

	EnergyBar.prototype.draw = function(){

		var background =  new createjs.Bitmap("assets/energyBar/background.png");
		this.container.addChild(background);
		this.energyBar =  new createjs.Bitmap("assets/energyBar/worm.png");
		this.container.addChild(this.energyBar);
		var badge = new createjs.Bitmap("assets/energyBar/badge.png");
		this.container.addChild(badge);

		this.mask = new createjs.Shape();
		this.mask.graphics.c();
		this.mask.graphics.f("rgba(0, 0, 0, .5)");
 		this.mask.graphics.dr(0, 0, 1328, 264);
 		this.mask.graphics.ef();
 		this.mask.cache(0, 0, 1328, 264);
		
		this.maskFilter = new createjs.AlphaMaskFilter(this.mask.cacheCanvas);
		this.energyBar.filters = [
			this.maskFilter
 		];



	}
	EnergyBar.prototype.updateEnergy = function(energy) {
		
		var currentEnergy = mapNumber(energy,0,10,1100,0)
		this.energyBar.x = -currentEnergy;



	};
	function mapNumber (x,in_min,in_max,out_min,out_max){

    	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

		
	return EnergyBar;

})();