BoxGroup = function(game, x, boxId) {

    this.boxGroup = game.add.physicsGroup();
    this.boxGroup.enableBody = true;
    
    this.posX = x;
    this.activeBoxId = 0;

    this.game = game;
    this.create();

    this.boxGroup.setAll('body.immovable', false);
    this.boxGroup.setAll('body.velocity.y', 0);

    this.boxTimer = this.game.time.create(false);
    this.boxTimer.start();
    this.startTheBoxes();

};

BoxGroup.prototype.addBox = function(posX, posY, name) {
    //  console.log(this.boxGroup);
    var newBox = this.boxGroup.create(posX, posY, name);
    this.changeRGB(newBox);

};

BoxGroup.prototype.create = function() {

    for (var i = 0; i < 6; i++) {

        this.addBox(this.posX, BC.B_STARTY, 'box1');

    }
};

BoxGroup.prototype.startTheBoxes = function() {

    this.runTheBox();

    //console.log(this.activeBoxId);

    this.boxTimer.add(this.game.rnd.integerInRange(250, 1250), this.startTheBoxes, this);

};

BoxGroup.prototype.runTheBox = function() {

    this.boxGroup.getAt(this.activeBoxId).body.velocity.y = BC.B_SPEED;
    this.setNextActiveIndex();
};

BoxGroup.prototype.setNextActiveIndex = function() {

    for (var i = 0; i < this.boxGroup.children.length; i++) {
        if (this.boxGroup.children[i].body.velocity.y == 0) {
            this.activeBoxId = i;
            break;
        }
    }
};

BoxGroup.prototype.checkOverlap = function() {
    this.boxGroup.forEach(this.checkButtonOverlap, this);
};

BoxGroup.prototype.checkButtonOverlap = function(box) {

    if (BUC.B_Y + BUC.B_H / 2 - box.y < BC.B_H && BUC.B_Y + BUC.B_H / 2 - box.y >= -BC.B_H / 3) { //if box overlaps active button
        if (this.boxGroup.total <= 5)
            this.addBox(this.posX, BC.B_STARTY, 'box1');
        this.removeTheBox(box);
    }
};

BoxGroup.prototype.removeTheBox = function(box) {
    this.boxGroup.remove(box);
    this.setNextActiveIndex();
};

BoxGroup.prototype.checkPosition = function() {
    this.boxGroup.forEach(this.checkEnteredBounds, this);
};

BoxGroup.prototype.checkEnteredBounds = function(box) {
    //console.log(box);
    if (box.y >= 480 + 3 * BC.B_H / 2) {

        this.removeTheBox(box);
        this.addBox(this.posX, BC.B_STARTY, 'box1');

    }
};

BoxGroup.prototype.changeRGB = function(box) {

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
   */
};

BoxGroup.prototype.RGBtoHEX = function(r, g, b) {
    return r << 16 | g << 8 | b;
};