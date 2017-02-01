BoxFactory = function(game) {

    this.game = game; //tablicaaa + underscore

    this.boxGroup1 = new BoxGroup(game, BC.B_STARTX, 1);
    this.boxGroup2 = new BoxGroup(game, BC.B_STARTX + WC.GAME_W / 4, 2);
    this.boxGroup3 = new BoxGroup(game, BC.B_STARTX + WC.GAME_W / 2, 3);

    this.boxGroup1.catchedBoxSignal.add(this.onCatchedBox, this);
    this.boxGroup2.catchedBoxSignal.add(this.onCatchedBox, this);
    this.boxGroup3.catchedBoxSignal.add(this.onCatchedBox, this);

    this.color;
    this.colorSignal = new Phaser.Signal();
    this.activeButtonIndex = 0;

};

//REMOVE CATCHED BOX//

BoxFactory.prototype.onKeyDown = function(direction) { //if spacebar down - catch the box, pass the color

    if (direction == CC.SPACEBAR) {
        console.log("S: " + this.activeButtonIndex);
        switch (this.activeButtonIndex) {

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

BoxFactory.prototype.updateBoxes = function() { //wrap the box if has entered world bounds

    this.boxGroup1.checkPosition();
    this.boxGroup2.checkPosition();
    this.boxGroup3.checkPosition();

};

BoxFactory.prototype.onCatchedBox = function(color) {
    this.color = color;
    this.colorSignal.dispatch(this.color);
};

BoxFactory.prototype.setActiveButtonIndex = function(index){
    console.log(index);
   this.activeButtonIndex = index;
}
