var Stage3 = function() {};

Stage3.prototype = {

    init: function(game, animationManager) {
        this.game = game;
        this.animationManager = animationManager;
        this._levelNumber = 3;

    },

    preload: function() {

        this.game.load.image('circle1', 'assets/lvl3/lvl3Background.png');
        this.game.load.image('blue', 'assets/lvl3/lvl3Blue.png');
        this.game.load.image('green', 'assets/lvl3/lvl3Green.png');
        this.game.load.image('red', 'assets/lvl3/lvl3Red.png');
        this.game.load.image('yellow', 'assets/lvl3/lvl3Yellow.png');
        this.game.load.image('triangle', 'assets/lvl3/lvl3Triangle.png');

    },

    create: function() {

        console.log("STAGE3");

        this.style = {
            font: "30px rubik",
            fill: "#CD044E",
            align: "center"
        };
        this.startPosition = 150;


        this.gratulierenSignal = new Phaser.Signal();
        this.gratulierenSignal.add(this.showWinDialog, this);

        this.inputCreator = new InputCreator(this.game, this.animationManager);
        this.game.add.tileSprite(0, 0, WC.GAME_W, WC.INPUT_H, 'riddleBackground');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.circle = this.game.add.sprite(2 * this.startPosition, this.startPosition, 'circle1');
        this.triangle = this.game.add.sprite(2 * this.startPosition + 57, this.startPosition, 'triangle');
        this.green = this.game.add.sprite(2 * this.startPosition, this.startPosition, 'green');

        this.blue = this.game.add.sprite(2 * this.startPosition, this.startPosition, 'blue');
        this.red = this.game.add.sprite(2 * this.startPosition, this.startPosition, 'red');
        this.yellow = this.game.add.sprite(2 * this.startPosition, this.startPosition, 'yellow');

        this.circle.anchor.set(0.5, 0.5);
        this.green.anchor.set(0.5, 0.5);
        this.blue.anchor.set(0.5, 0.5);
        this.red.anchor.set(0.5, 0.5);
        this.yellow.anchor.set(0.5, 0.5);
        this.triangle.anchor.set(0.5, 0.5);

        this.green.angle = 45;
        this.blue.angle = -45;
        this.red.angle = 45;
        this.yellow.angle = -90;

        this.inputCreator.boxFactory.colorSignal.add(this.onColorPicked, this);

        this.gameWon = false;
        Timer.createTimer(this.game, 50);

    },

    update: function() {
        this.inputCreator.updateInputCreator();
        if (!this.gameWon) this.playerWins();
    },

    render: function() {},

    onColorPicked: function(color) {

        switch (color) {

            case BC.RED:
                this.animationManager.tweenMoveStage3(this.red);
                break;

            case BC.GREEN:
                this.animationManager.tweenMoveStage3(this.green);
                break;

            case BC.BLUE:
                this.animationManager.tweenMoveStage3(this.blue);
                break;

            case BC.YELLOW:
                this.animationManager.tweenMoveStage3(this.yellow);
                break;

            default:
                break;

        }
    },

    playerWins: function() {
        if (this.red.angle == 0 && this.yellow.angle == 0 && this.green.angle == 0 && this.blue.angle == 0) {
            this.gameWon = true;
            Timer.stopTimer(this.game);
            this.gratulierenSignal.dispatch();
            LEVEL_DATA[this._levelNumber + 1] = this._levelNumber + 1;
            window.localStorage.setItem('mygame_progress', JSON.stringify(LEVEL_DATA));
        }
    },

    showWinDialog: function() {
        var level = this._levelNumber + 1;
        LevelDialog.nextLevel(this.game, level);
    }
};
