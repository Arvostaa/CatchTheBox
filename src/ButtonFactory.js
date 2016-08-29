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
    var activeButtonModif = 0,
        fadeOutIndexModif = 0;
    if (direction == CC.LEFT) {
        if (this.activeButtonIndex !== 0) {
            activeButtonModif = -1;
            fadeOutIndexModif = 1;
        }
    } else if (direction == CC.RIGHT) {
        if (this.activeButtonIndex !== 2) {
            activeButtonModif = 1;
            fadeOutIndexModif = -1;
        }
    }

    this.activeButtonIndex += activeButtonModif;
    WC.BUTTON = this.activeButtonIndex;
    this.fadeInSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);
    this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex + fadeOutIndexModif]);

    // if (direction == CC.LEFT) {
    //     if (this.activeButtonIndex == 0) {
    //         this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);
    //     } else {
    //         this.activeButtonIndex -= 1;
    //         WC.BUTTON -= 1; //pousuwaj
    //         this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex + 1]);
    //     }
    // } else if (direction == CC.RIGHT) {
    //     if (this.activeButtonIndex == 2) {
    //         this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);
    //     } else {
    //         this.activeButtonIndex += 1;
    //         WC.BUTTON += 1;
    //         this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex - 1]);
    //     }
    // }

    // this.fadeInSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);
};

ButtonFactory.prototype.deactivateButtons = function() {

    for (var i = 0; i < 3; i++) {
        this.buttonGroup.children[i].tint = '0x62273e'; //inactive gray
    }

};

ButtonFactory.prototype.updateButtons = function() {

    this.cursors.checkCursor();

};