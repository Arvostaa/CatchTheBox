BoxFactory = function(game) {

    this.boxGroup = game.add.physicsGroup();
    this.game = game;

    this.boxSignal = new Phaser.Signal(); //create s

    this.create();
    this.boxGroup.setAll('body.immovable', false);
    this.boxGroup.setAll('body.velocity.y', BC.B_SPEED);

};


BoxFactory.prototype.addBox = function(posX, posY, name) {

    var newBox = this.boxGroup.create(posX, posY, name);
    this.changeRGB(newBox);

};


BoxFactory.prototype.create = function() {

    for (var i = BC.B_STARTX; i < WC.GAME_W - BC.B_W; i += WC.GAME_W / 4) {


        this.addBox(i, BC.B_STARTY, 'box1');
        this.addBox(i, 0 - BC.B_H, 'box1');
        this.addBox(i, WC.GAME_H / 4 - BC.B_H, 'box1');
        this.addBox(i, WC.GAME_H / 2 - BC.B_H, 'box1');
        this.addBox(i, 3 * WC.GAME_H / 4 - BC.B_H, 'box1');
        this.addBox(i, WC.GAME_H - BC.B_H, 'box1');

    }

};

//REMOVE CATCHED BOX//

BoxFactory.prototype.catchTheBox = function() {

    console.log("CATCH THE BOX");
    this.boxGroup.forEach(this.checkButtonOverlap, this);

};

//MOVEMENT//

BoxFactory.prototype.wrapBox = function(box) {

    if (box.y >= 480 + 3 * BC.B_H / 2) {
        box.y = BC.B_STARTY;
        this.changeRGB(box);
    }

};

BoxFactory.prototype.checkButtonOverlap = function(box) {

    if (BUC.B_Y + BUC.B_H/2 - box.y< BC.B_H && BUC.B_Y + BUC.B_H/2 - box.y>= -BC.B_H/3) {

        switch (WC.BUTTON) {

            case 0:
                if (box.z >= 0 && box.z <= 5) {//.Z PROPERTY = OBJECT'S INDEX IN THE GROUP
                    box.y = BC.B_STARTY;
                    this.changeRGB(box);
                }
                break;

            case 1:
                if (box.z >= 6 && box.z <= 11) {
                    box.y = BC.B_STARTY;
                    this.changeRGB(box);
                }
                break;

            case 2:           
                if (box.z >= 12 && box.z <= 17) {
                    box.y = BC.B_STARTY;
                    this.changeRGB(box);
                }
                break;
        }
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

};
BoxFactory.prototype.RGBtoHEX = function(r, g, b) {
    return r << 16 | g << 8 | b;
};