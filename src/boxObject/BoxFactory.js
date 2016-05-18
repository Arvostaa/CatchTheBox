BoxFactory = function(game){
this.boxGroup = game.add.group();
this.game = game;
this.create();
this.changeRGB();



};


BoxFactory.prototype.create = function(){
	for(var i = 90; i <800; i+=200){
		this.addBox(i, 0, 'box1');
	}

};

BoxFactory.prototype.changeRGB = function(){
	var rValue = 25;
	for(var i = 0; i < this.boxGroup.length; i++){
		this.boxGroup.children[i].tint = this.RGBtoHEX(200, 16 + rValue, 48);
		rValue += 90;
	}
}
BoxFactory.prototype.RGBtoHEX = function(r, g, b){
		return r << 16 | g << 8 | b;
}


BoxFactory.prototype.addBox = function(posX, posY, name){
var newBox = this.boxGroup.create(posX,posY, name);

};

BoxFactory.prototype.get = function(id){
	return this.boxGroup[id];
};