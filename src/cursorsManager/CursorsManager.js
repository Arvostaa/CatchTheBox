CursorsManager = function(game) {

    this.cursors = game.input.keyboard.createCursorKeys(); //OGARNIJ KEYBOARD.DURATION
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.game = game;
    this.direction;
    this.keySignal = new Phaser.Signal();

    var directionPause = 0;
    var spacebarPause = 0;

};

CursorsManager.prototype.checkKeys = function() {



    if (this.cursors.left.isDown) { //onKeyLeft


        if (this.directionPause > this.game.time.now) {

            return;
        }

        this.direction = CC.LEFT;
        this.directionPause = this.game.time.now + 250;
        this.keySignal.dispatch(this.direction);

        //    console.log("LEFT " + this.directionPause + ", WORLD: " + this.game.time.now);

    }
    if (this.cursors.right.isDown) { //onkeyRight

        if (this.directionPause > this.game.time.now) {

            return;
        }

        this.direction = CC.RIGHT;
        this.directionPause = this.game.time.now + 250;
        this.keySignal.dispatch(this.direction);

     //   console.log("RIGHT " + this.directionPause + ", WORLD: " + this.game.time.now);

    }
    if (this.spaceKey.isDown) { //onSpacebarDown


        if (this.spacebarPause > this.game.time.now) {

            return;
        }

        this.direction = CC.SPACEBAR;
        this.spacebarPause = this.game.time.now + 300;
        this.keySignal.dispatch(this.direction);

      //  console.log("SPACE " + this.spacebarPause + ", WORLD: " + this.game.time.now);

    }
};