BoxFactory = function(game) {

    this.boxGroup = game.add.physicsGroup();
    this.game = game;
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

        var arr = this.generateNewPositionY();

        this.addBox(i, BC.B_STARTY + arr[0], 'box1');
        this.addBox(i, BC.B_STARTY + arr[1], 'box1');
        this.addBox(i, BC.B_STARTY + arr[2], 'box1');
        this.addBox(i, BC.B_STARTY + arr[3], 'box1');
        this.addBox(i, BC.B_STARTY + arr[4], 'box1');
        this.addBox(i, BC.B_STARTY + arr[5], 'box1');
    }

};

BoxFactory.prototype.generateNewPositionY = function() { //
    var arr = []
    var isChanged = true;
    while (arr.length < 6) {
        var randomnumber = Math.random() * (BC.MAX_Y - BC.MIN_Y + 1) + BC.MIN_Y;
        // var randomnumber = Math.ceil(Math.random() * 100)
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == randomnumber) {
                found = true;
                break
            }
        }
        if (!found) arr[arr.length] = randomnumber + BC.B_H;
    }
    arr.sort();
    //console.log(arr[0] + " " + arr[1] + " " + arr[2] + " " + arr[3] + " " +arr[4] );

    while (isChanged) {
        for (i = 0; i < arr.length - 1; i++) {
            if (arr[i + 1] - arr[i] < 3 * BC.B_H / 2) {
                arr[i + 1] += 2 * BC.B_H;
                arr.sort();
                isChanged = true;
                break;
            } else isChanged = false;
        }

    }

    return arr;
}

//REMOVE CATCHED BOX//

BoxFactory.prototype.onKeyDown = function(direction) {

if(direction == CC.SPACEBAR){

    this.boxGroup.forEach(this.checkButtonOverlap, this);

}

};

//MOVEMENT//

BoxFactory.prototype.waitForWrap = function(box) {

    if (box.y >= 480 + 3 * BC.B_H / 2) {

        this.setWrapTimer(box);

    }
};

BoxFactory.prototype.setWrapTimer = function(box) {


    box.body.velocity.y = 0;

    if (this.doBoxesCollide(box)) {

        this.setWrapTimer(box);
    } else

        this.game.time.events.add(this.game.rnd.integerInRange(250, 750), this.wrapTheBox, this, box);
};



BoxFactory.prototype.wrapTheBox = function(box) {

    box.y = BC.B_STARTY - BC.B_H;
    this.changeRGB(box);
    if(!this.doBoxesCollide(box)){
         box.body.velocity.y = BC.B_SPEED;
    }
    else this.setWrapTimer(box);

};

BoxFactory.prototype.doBoxesCollide = function(box) {
    var index = box.z;

    switch (index) {
        case 0:
            index = 5;
            break;
        case 5:
            index = 0;
            break;
        case 6:
            index = 11;
            break;
        case 11:
            index = 6;
            break;
        case 12:
            index = 17;
            break;
        case 17:
            index = 12;
            break;
        default:
            index = box.z;
            break;
    }

    if (this.boxGroup.children[index].posY - box.posY < 3 * BC.B_H / 2) {
        return true;
    } else

        return false;
};

BoxFactory.prototype.checkButtonOverlap = function(box) {

    if (BUC.B_Y + BUC.B_H / 2 - box.y < BC.B_H && BUC.B_Y + BUC.B_H / 2 - box.y >= -BC.B_H / 3) { //if box overlaps active button

        switch (WC.BUTTON) { // chceck active button

            case 0:
                if (box.z >= 0 && box.z <= 5) { //.Z PROPERTY = OBJECT'S INDEX IN THE GROUP
                    this.wrapTheBox(box); //wrap the box 
                    this.setWrapTimer(box); 
                }
                break;

            case 1:
                if (box.z >= 6 && box.z <= 11) {
                    this.wrapTheBox(box);
                    this.setWrapTimer(box);
                }
                break;

            case 2:
                if (box.z >= 12 && box.z <= 17) {
                    this.wrapTheBox(box);
                    this.setWrapTimer(box);
                }
                break;
        }
    }
};

BoxFactory.prototype.updateBoxes = function() {
    this.boxGroup.forEach(this.waitForWrap, this);
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