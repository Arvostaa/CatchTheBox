BoxFactory = function(game) {

    this.game = game;

    this.boxGroup1 = new BoxGroup(game, BC.B_STARTX, 1);
    this.boxGroup2 = new BoxGroup(game, BC.B_STARTX + WC.GAME_W / 4, 2);
    this.boxGroup3 = new BoxGroup(game, BC.B_STARTX + WC.GAME_W / 2, 3);

};

//REMOVE CATCHED BOX//

BoxFactory.prototype.onKeyDown = function(direction) {

    if (direction == CC.SPACEBAR) {
        switch (WC.BUTTON) {

            case 0:
                this.boxGroup1.checkOverlap();
                break;
            case 1:
                this.boxGroup2.checkOverlap();
                break;
            case 2:
                this.boxGroup3.checkOverlap();
                break;
        }
    }
};

//MOVEMENT//

BoxFactory.prototype.updateBoxes = function() {

   
    this.boxGroup1.checkPosition();
    this.boxGroup2.checkPosition();
    this.boxGroup3.checkPosition();
    
};


/*

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
*/
