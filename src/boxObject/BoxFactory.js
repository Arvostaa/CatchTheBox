BoxFactory = function(game) {
    this.boxGroup = game.add.physicsGroup();
    this.game = game;
    this.create();
    this.boxGroup.setAll('body.immovable', false);
    this.boxGroup.setAll('body.velocity.y', 100);

    this.boxGroup.forEach(this.changeRGB, this);

};

BoxFactory.prototype.addBox = function(posX, posY, name) {

    var newBox = this.boxGroup.create(posX, posY, name);

};


BoxFactory.prototype.create = function() {

    for (var i = 90; i < 800; i += 200) {
        this.addBox(i, 0, 'box1');
        this.addBox(i, 150, 'box1');
        this.addBox(i, 300, 'box1');

    }

};

//MOVEMENT//

BoxFactory.prototype.wrapBox = function(box) {
    if (box.y <= 0){
        box.y = 0;
        this.changeRGB(box);
    }
    else if (box.y >= 480){
        box.y = 0;
        this.changeRGB(box);
    }
};
BoxFactory.prototype.updateBoxes = function() {
    this.boxGroup.forEach(this.wrapBox, this);
};

//COLORS//

BoxFactory.prototype.changeRGB = function(box) {
    var color = Math.floor(Math.random() * 4) + 1
    switch (color) {
        case 1:
            box.tint = this.RGBtoHEX(255, 195, 0); // yellow
            break;
        case 2:
            box.tint = this.RGBtoHEX(213, 71, 109); //red
            break;
        case 3:
            box.tint = this.RGBtoHEX(86, 207, 130); // green
            break;
        case 4:
            box.tint = this.RGBtoHEX(39, 162, 227); //blue
            break;
    }
    /*   var rValue = 25;
    for (var i = 0; i < this.boxGroup.length; i++) {
        this.boxGroup.children[i].tint = this.RGBtoHEX(200, 16 + rValue, 48);
        rValue += 90;
    }*/

}
BoxFactory.prototype.RGBtoHEX = function(r, g, b) {
    return r << 16 | g << 8 | b;
}