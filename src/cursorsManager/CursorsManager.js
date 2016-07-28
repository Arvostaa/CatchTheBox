CursorsManager = function(game) {

    this.cursors = game.input.keyboard.createCursorKeys(); //OGARNIJ KEYBOARD.DURATION
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game = game;
    this.buttonSignal = new Phaser.Signal();//create button signal
    this.boxSignal = new Phaser.Signal();//create box signal
    this.direction;
    var directionPause = 0;
    var spacebarPause = 0;

};
