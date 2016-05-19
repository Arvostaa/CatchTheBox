BoxFactory = function(game) {

    this.boxGroup = game.add.physicsGroup();
    this.game = game;
    this.addBoxSignal = true;
    this.create();
    this.boxGroup.setAll('body.immovable', false);
    this.boxGroup.setAll('body.velocity.y', BC.B_SPEED);
    this.restartFirstBoxes(0, false);

};

BoxFactory.prototype.restartFirstBoxes = function(velocity, visibility) {

    this.boxGroup.children[0].body.velocity.y = velocity;
    this.boxGroup.children[1].body.velocity.y = velocity;
    this.boxGroup.children[2].body.velocity.y = velocity;

    this.boxGroup.children[0].visible = visibility;
    this.boxGroup.children[1].visible = visibility;
    this.boxGroup.children[2].visible = visibility;
    this.addBoxSignal = false;

}

BoxFactory.prototype.addBox = function(posX, posY, name) {

    var newBox = this.boxGroup.create(posX, posY, name);
    this.changeRGB(newBox);

};


BoxFactory.prototype.create = function() {

    var y0 = WC.GAME_W / 4 - BC.B_W / 2;
    this.addBox(WC.GAME_W / 4 - BC.B_W / 2, y0, 'box1');
    this.addBox(WC.GAME_W / 2 - BC.B_W / 2, y0, 'box1');
    this.addBox(3 * WC.GAME_W / 4 - BC.B_W / 2, y0, 'box1');

    for (var i = WC.GAME_W / 4 - BC.B_W / 2; i < WC.GAME_W - BC.B_W; i += WC.GAME_W / 4) {
        this.addBox(i, WC.GAME_H / 4 - BC.B_H / 2, 'box1');
        this.addBox(i, WC.GAME_H / 2 - BC.B_H / 2, 'box1');
        this.addBox(i, 3 * WC.GAME_H / 4 - BC.B_H / 2, 'box1');

    }

};

//MOVEMENT//


BoxFactory.prototype.wrapBox = function(box) {

    if (box.y <= 0) {
        box.y = 0;
        this.changeRGB(box);
    }
    if (box.y >= 480) {
        box.y = 0;
        this.changeRGB(box);
    }

};

BoxFactory.prototype.updateBoxes = function() {


    if (this.boxGroup.children[3].y > WC.GAME_H / 2 + BC.B_H / 4) {
        if (this.addBoxSignal = true) {
            this.restartFirstBoxes(100, true);
        }
    }
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