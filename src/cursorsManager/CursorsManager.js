CursorsManager = function(game) {

    this.cursors = game.input.keyboard.createCursorKeys(); //OGARNIJ KEYBOARD.DURATION
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game = game;
    this.buttonSignal = new Phaser.Signal();//create s
    this.direction;
    var cursorPause = 0;

};

/*

CursorsManager.prototype.checkCursor = function() {

    if (this.cursorPause > this.game.time.now) {
        console.log("jeszczenot");
        return;
    }

    if (this.cursors.left.isDown) {

        //console.log("time: " + this.game.time.now + ", cPause: " + this.cursorPause);
        this.direction = CC.LEFT;
       
        this.buttonSignal.dispatch(this.direction);
        console.log("left");
         this.cursorPause = this.game.time.now + 200;
        return;
    } else if (this.cursors.right.isDown) {
       
        // console.log("time: " + this.game.time.now + ", cPause: " + this.cursorPause);
        this.direction = CC.RIGHT;
        console.log("right");
     //   this.cursorPause = this.game.time.now + 100;
        this.buttonSignal.dispatch(this.direction);
        this.cursorPause = this.game.time.now + 200;
        return;
    }

    else if(this.spaceKey.isDown){
        console.log("SPACEKEYISDOWN");
        this.boxSignal.dispatch();
        return;
    }

}
*/