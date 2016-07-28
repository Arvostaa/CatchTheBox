SignalsManager = function(game) {

    this.cursorsManager = new CursorsManager(game);
    this.buttonSignal = new Phaser.Signal();
    this.boxSignal = new Phaser.Signal();

};

SignalsManager.prototype.sendButtonSignal = function() { // LEFT-RIGHT: choose the button


    if (this.cursorsManager.directionPause > this.cursorsManager.game.time.now) {

        return;
    }

    if (this.cursorsManager.cursors.left.isDown) {

        this.cursorsManager.direction = CC.LEFT;
        this.buttonSignal.dispatch(this.cursorsManager.direction);
        this.cursorsManager.directionPause = this.cursorsManager.game.time.now + 150;

        return;
    } else if (this.cursorsManager.cursors.right.isDown) {
        this.cursorsManager.direction = CC.RIGHT;

        this.buttonSignal.dispatch(this.cursorsManager.direction);

        this.cursorsManager.directionPause = this.cursorsManager.game.time.now + 150;

        return;
    }

};

SignalsManager.prototype.sendBoxSignal = function() { //SPACEBAR - catch the box by pressing chosen button

    if (this.cursorsManager.spacebarPause > this.cursorsManager.game.time.now) {

        return;
    }

    if (this.cursorsManager.spaceKey.isDown) {

        this.boxSignal.dispatch();
        this.cursorsManager.spacebarPause = this.cursorsManager.game.time.now + 150;

        return;
    }
}