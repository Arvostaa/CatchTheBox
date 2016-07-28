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

        var arr = this.generateNewPositionY();
        /* 
        

       
        */

        /*
        this.addBox(i, BC.B_STARTY, 'box1');
        this.addBox(i, 0 - BC.B_H, 'box1');
        this.addBox(i, WC.GAME_H / 4 - BC.B_H, 'box1');
        this.addBox(i, WC.GAME_H / 2 - BC.B_H, 'box1');
        this.addBox(i, 3 * WC.GAME_H / 4 - BC.B_H, 'box1');
        this.addBox(i, WC.GAME_H - BC.B_H, 'box1');
*/

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

while(isChanged){
    for(i = 0; i < arr.length-1; i++){
    if(arr[i + 1] - arr[i] < 3*BC.B_H/2){
        arr[i+1]+= 2*BC.B_H;
        arr.sort();
        isChanged = true;
        break;
    }
    else isChanged = false;
}

}
/*
for(i = 0; i < arr.length-1; i++){
    if(arr[i + 1] - arr[i] < 3*BC.B_H/2){
        arr[i+1]+= 3*BC.B_H/2;
        arr.sort();
    }
}
console.log("DODANE:" +arr[0] + " " + arr[1] + " " + arr[2] + " " + arr[3] + " " +arr[4] );
*/
    return arr;
}

//REMOVE CATCHED BOX//

BoxFactory.prototype.catchTheBox = function() {

    console.log("CATCH THE BOX");
    this.boxGroup.forEach(this.checkButtonOverlap, this);

};

//MOVEMENT//

BoxFactory.prototype.wrapBox = function(box) {

    if (box.y >= 480 + 3 * BC.B_H / 2) {
        box.y = BC.B_STARTY - BC.B_H;
        this.changeRGB(box);
    }

};

BoxFactory.prototype.checkButtonOverlap = function(box) {

    if (BUC.B_Y + BUC.B_H / 2 - box.y < BC.B_H && BUC.B_Y + BUC.B_H / 2 - box.y >= -BC.B_H / 3) {

        switch (WC.BUTTON) {

            case 0:
                if (box.z >= 0 && box.z <= 5) { //.Z PROPERTY = OBJECT'S INDEX IN THE GROUP
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