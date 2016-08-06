ButtonFactory = function(game) {

    this.buttonGroup = game.add.physicsGroup();
    this.game = game;
    this.create();
    this.activateButton(this.buttonGroup.children[0]);
    this.buttonGroup.setAll('body.immovable', true);
    var activeButtonIndex = 0;

};

ButtonFactory.prototype.create = function() {
  //  console.log("CREESAATE");
    this.buttonGroup.create(BC.B_STARTX - BC.B_W / 4 + 7, BUC.B_Y, 'button');
    this.buttonGroup.create(BC.B_STARTX + WC.GAME_W / 4 - BC.B_W / 4 + 8, BUC.B_Y, 'button');
    this.buttonGroup.create(BC.B_STARTX + WC.GAME_W / 2 - BC.B_W / 4 + 8, BUC.B_Y, 'button');
    this.activeButtonIndex = 0;
    console.log("activeButtonIndex:CREATE " + this.activeButtonIndex);
};

ButtonFactory.prototype.test = function(){
    console.log("noelo");
};

ButtonFactory.prototype.onKeyDown = function(direction) {

    if (direction == CC.LEFT) {

        if (this.activeButtonIndex == 0) {
            this.activeButtonIndex = 0;
            WC.BUTTON = 0;

        } else {
            this.activeButtonIndex -= 1;
            WC.BUTTON -= 1;
        }

    } else if (direction == CC.RIGHT) {

        if (this.activeButtonIndex == 2) {
            this.activeButtonIndex = 2;
            WC.BUTTON = 2;
        } else {
            this.activeButtonIndex += 1;
            WC.BUTTON += 1;
        }
    }

    this.activateButton(this.buttonGroup.children[this.activeButtonIndex]);

};

ButtonFactory.prototype.activateButton = function(button) {

    for (var i = 0; i < 3; i++) {
        this.buttonGroup.children[i].tint = this.RGBtoHEX(245, 235, 225); //inactive gray
    }

    button.tint = this.RGBtoHEX(253, 166, 74); // active orange

};

ButtonFactory.prototype.RGBtoHEX = function(r, g, b) {
    return r << 16 | g << 8 | b;
};


ButtonFactory.prototype.updateButtons = function() {
  
   this.cursors.checkCursor();

};