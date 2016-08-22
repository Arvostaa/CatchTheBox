ButtonFactory = function(game) {
this.fadeInSignal = new Phaser.Signal();
    this.fadeOutSignal = new Phaser.Signal();
    this.buttonGroup = game.add.physicsGroup();
    this.game = game;
    this.create();
    this.buttonGroup.setAll('body.immovable', true);
    var activeButtonIndex = 0;

};

ButtonFactory.prototype.create = function() {
    //  console.log("CREESAATE");
    this.buttonGroup.create(BC.B_STARTX - BC.B_W / 4 - 2, BUC.B_Y, 'button');
    this.buttonGroup.create(BC.B_STARTX + WC.GAME_W / 4 - BC.B_W / 4 - 2, BUC.B_Y, 'button');
    this.buttonGroup.create(BC.B_STARTX + WC.GAME_W / 2 - BC.B_W / 4 - 2, BUC.B_Y, 'button');
    this.activeButtonIndex = 0;

    this.deactivateButtons();
    this.buttonGroup.children[0].tint = '0xfb3968';
};

ButtonFactory.prototype.onKeyDown = function(direction) {

    if (direction == CC.LEFT) {

        if (this.activeButtonIndex == 0) {
            this.activeButtonIndex = 0;
            WC.BUTTON = 0;
            this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);

        } else {
            this.activeButtonIndex -= 1;
            WC.BUTTON -= 1;
            this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex + 1]);

        }

    } else if (direction == CC.RIGHT) {

        if (this.activeButtonIndex == 2) {
            this.activeButtonIndex = 2;
            WC.BUTTON = 2;
            this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);

        } else {
            this.activeButtonIndex += 1;
            WC.BUTTON += 1;
            this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex - 1]);
        }
    }
  // this.deactivateButton(this.buttonGroup.children[this.activeButtonIndex]);
    this.fadeInSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);

    // this.fadeSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);
};

ButtonFactory.prototype.deactivateButtons = function() {

    for (var i = 0; i < 3; i++) {
        this.buttonGroup.children[i].tint = '0x62273e'; //inactive gray
    }

    // button.tint = this.RGBtoHEX(253, 166, 74); // active orange

};

ButtonFactory.prototype.RGBtoHEX = function(r, g, b) {
    return r << 16 | g << 8 | b;
};


ButtonFactory.prototype.updateButtons = function() {

    this.cursors.checkCursor();

};