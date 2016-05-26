CursorsManager = function(game) {

    this.cursors = game.input.keyboard.createCursorKeys();
    this.game = game;
    this.signal = new Phaser.Signal();
    this.direction;
    var cursorPause = 0;

};

CursorsManager.prototype.sendSignal = function() {
    console.log("sendSignal");
};

CursorsManager.prototype.checkCursor = function() {


    if (this.cursorPause > this.game.time.now) {
        console.log("jeszczenot");
        return;
    }

    if (this.cursors.left.isDown) {

        //console.log("time: " + this.game.time.now + ", cPause: " + this.cursorPause);
        this.direction = CC.LEFT;
       
        this.signal.dispatch(this.direction);
        console.log("left");
         this.cursorPause = this.game.time.now + 200;
        return;
    } else if (this.cursors.right.isDown) {
       
        // console.log("time: " + this.game.time.now + ", cPause: " + this.cursorPause);
        this.direction = CC.RIGHT;
        console.log("right");
     //   this.cursorPause = this.game.time.now + 100;
        this.signal.dispatch(this.direction);
        this.cursorPause = this.game.time.now + 200;
        return;
    }
}