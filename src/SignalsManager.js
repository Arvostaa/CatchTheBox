SignalsManager = function(game) {

	this.cursorsManager = new CursorsManager(game);
    this.buttonSignal = new Phaser.Signal();
    this.boxSignal = new Phaser.Signal();


};

SignalsManager.prototype.sendButtonSignal = function() {


    if (this.cursorsManager.cursorPause > this.cursorsManager.game.time.now) {
        console.log("jeszczenot");
        return;
    }

    if (this.cursorsManager.cursors.left.isDown) {

        //console.log("time: " + this.game.time.now + ", cPause: " + this.cursorPause);
        this.cursorsManager.direction = CC.LEFT;
        console.log("SPRAWDZENIE: " + this.cursorsManager.direction);
       

        this.buttonSignal.dispatch(this.cursorsManager.direction);
      

        console.log("left");
         this.cursorsManager.cursorPause = this.cursorsManager.game.time.now + 200;
        return;
    } else if (this.cursorsManager.cursors.right.isDown) {
       
        // console.log("time: " + this.game.time.now + ", cPause: " + this.cursorPause);
        this.cursorsManager.direction = CC.RIGHT;
        console.log("right");
     //   this.cursorPause = this.game.time.now + 100;
        

        this.buttonSignal.dispatch(this.cursorsManager.direction);
        
        this.cursorsManager.cursorPause = this.cursorsManager.game.time.now + 200;
        return;
    }

    else if(this.cursorsManager.spaceKey.isDown){
        console.log("SPACEKEYISDOWN");
     //   this.boxSignal.dispatch();
        return;
    }












  //  this.buttonSignal.dispatch(direction);

};

SignalsManager.prototype.sendBoxSignal = function() {

    this.boxSignal.dispatch();

}