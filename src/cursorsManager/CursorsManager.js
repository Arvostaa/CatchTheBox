CursorsManager = function(game) {

    this.cursors = game.input.keyboard.createCursorKeys(); //OGARNIJ KEYBOARD.DURATION
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game = game;
    this.direction;
    this.keySignal = new Phaser.Signal();

    var directionPause = 0;
    var spacebarPause = 0;

};


CursorsManager.prototype.checkKeys = function() {

    if (this.directionPause > this.game.time.now) {

        return;
    }
    if (this.spacebarPause > this.game.time.now) {

        return;
    }

    if (this.cursors.left.isDown) { //onKeyLeft

        this.direction = CC.LEFT;
        this.keySignal.dispatch(this.direction);

        this.spacebarPause = this.game.time.now + 200;
        this.directionPause = this.game.time.now + 1;

        return;

    } else if (this.cursors.right.isDown) { //onkeyRight

        this.direction = CC.RIGHT;
        this.keySignal.dispatch(this.direction);

        this.spacebarPause = this.game.time.now + 200;
        this.directionPause = this.game.time.now + 1;

        return;

    } else if (this.spaceKey.isDown) { //onSpacebarDown

        this.direction = CC.SPACEBAR;
        this.keySignal.dispatch(this.direction);
        
        this.spacebarPause = this.game.time.now + 200;
      //  this.directionPause = this.game.time.now + 5;

        return;
    }
};