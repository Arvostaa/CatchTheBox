ButtonFactory = function(game) {
    this.fadeInSignal = new Phaser.Signal();
    this.fadeOutSignal = new Phaser.Signal();
    this.activeButtonIndexSignal = new Phaser.Signal();
    this.buttonGroup = game.add.physicsGroup();
    this.game = game;
    this.create();
    this.buttonGroup.setAll('body.immovable', true);
    var activeButtonIndex = 0;

};

ButtonFactory.prototype.create = function() {

    this.buttonGroup.create(WC.BUTTON_X, WC.BUTTON_Y, 'button');
    this.buttonGroup.create(WC.BUTTON_X + WC.BUTTON_SHIFT, WC.BUTTON_Y, 'button');
    this.buttonGroup.create(WC.BUTTON_X + 2*WC.BUTTON_SHIFT, WC.BUTTON_Y, 'button');
    this.activeButtonIndex = 0;

    this.deactivateButtons();
    this.buttonGroup.children[0].tint = '0xFF9C24';
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
    this.activeButtonIndexSignal.dispatch(this.activeButtonIndex);
    this.fadeOutSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex + fadeOutIndexModif]);
    this.fadeInSignal.dispatch(this.buttonGroup.children[this.activeButtonIndex]);

};

ButtonFactory.prototype.deactivateButtons = function() {

    for (var i = 0; i < 3; i++) {
        this.buttonGroup.children[i].tint = '0x62273e'; //inactive gray
    }

};


