var Bounds = (function(){

	function Bounds(x, y, width, height, name){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;

		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;
		//this.draw();

	}
	// om te testen of grenzen goed gezet werden
	Bounds.prototype.draw = function(){
			console.log(this.width);
			console.log(this.height);
			this.shape.graphics.c();
			this.shape.graphics.f("#000000");
			this.shape.graphics.dr(0,0, this.width, this.height);
			this.shape.graphics.ef();
	}
	
	return Bounds;


})();