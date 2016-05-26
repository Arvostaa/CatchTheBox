var game;

window.onload = function() {
    game = new Phaser.Game(480, 640, Phaser.AUTO, "");
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}

var playGame = function(game) {};
playGame.prototype = {
    create: function() {
        this.myVar = "hello world";
        game.input.onDown.add(function() {
            console.log(this.myVar) // on  down: print "hello"
        }, this);
        var newClass = new NewClass(game);
        newClass.signal.add(this.writeMyVar, this); // add as callback function writeMyVar method, with this context.
        newClass.sendSignal();
        this.writeMyVar();
    },
    writeMyVar: function() {
        console.log("from the function: " + this.myVar);
    }
}

NewClass = function(game) {
    console.log("I am a new class");
    this.signal = new Phaser.Signal();
};

NewClass.prototype.constructor = NewClass;

NewClass.prototype.sendSignal = function() {
    this.signal.dispatch(); //here is how we dispatch a signal.
    //, this method only dispatches a signal. In this example we call it manually from the code, in a real world example
    // inside NewClass the signal can be dispatched when a coin is collected / an enemy is killed and so on.
}