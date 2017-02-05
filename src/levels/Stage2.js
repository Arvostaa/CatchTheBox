var Stage2 = function() {};

Stage2.prototype = {

    init: function(game, animationManager) {
        this.game = game;
        this.animationManager = animationManager;
        this._levelNumber = 2;

    },

    preload: function() {

        this.game.load.image('circle', 'assets/circle.png');
        this.game.load.image('box', 'assets/boxStage1.png');
        this.game.load.image('triangle', 'assets/triangle.png');
        this.game.load.image('rhombus', 'assets/rhombus.png');

    },

    create: function() {
        console.log("STAGE2");

        this.style = {
            font: "30px rubik",
            fill: "#CD044E",
            align: "center"
        };
        this.startPosition = 50;

        this.gratulierenSignal = new Phaser.Signal();
        this.gratulierenSignal.add(this.showWinDialog, this);

        this.inputCreator = new InputCreator(this.game, this.animationManager);
        this.game.add.tileSprite(0, 0, WC.GAME_W, WC.INPUT_H, 'riddleBackground');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.finalSquare = this.game.add.sprite(100, this.startPosition, 'box');
        this.finalCircle = this.game.add.sprite(235, this.startPosition, 'circle');
        this.finalTriangle = this.game.add.sprite(375, this.startPosition, 'triangle');
        this.finalRhombus = this.game.add.sprite(500, this.startPosition, 'rhombus');

        this.square = this.game.add.sprite(100, WC.INPUT_H - 150, 'box');
        this.circle = this.game.add.sprite(235, WC.INPUT_H - 150, 'circle');
        this.triangle = this.game.add.sprite(375, WC.INPUT_H - 150, 'triangle');
        this.rhombus = this.game.add.sprite(500, WC.INPUT_H - 150, 'rhombus');

        this.square.tint = '0x121211'; //red
        this.circle.tint = '0x121211'; //yellow
        this.triangle.tint = '0x121211'; //green
        this.rhombus.tint = '0x121211'; //blue

        this.square.alpha = 0.04;
        this.circle.alpha = 0.04;
        this.triangle.alpha = 0.04;
        this.rhombus.alpha = 0.04;

        this.finalSquare.tint = '0x121211'; //red
        this.finalCircle.tint = '0x121211'; //yellow
        this.finalTriangle.tint = '0x121211'; //green
        this.finalRhombus.tint = '0x121211'; //blue

        this.alpha = 0.24;

        this.inputCreator.boxFactory.colorSignal.add(this.onColorPicked, this);

        this.gameWon = false;
        Timer.createTimer(this.game, 25);

        LEVEL_DATA[this._levelNumber + 1] = this._levelNumber + 1;
        window.localStorage.setItem('mygame_progress', JSON.stringify(LEVEL_DATA));

    },

    update: function() {
        this.inputCreator.updateInputCreator();
        if (!this.gameWon) this.playerWins();
    },

    render: function() {},

    onColorPicked: function(color) {

        switch (color) {

            case BC.RED:
                this.square.tint = '0xCD044E'; //basered           
                this.animationManager.tweenMoveStage2(this.square.x, this.square.y - this.startPosition, this.square, this.startPosition);
                break;
            case BC.GREEN:
                this.circle.tint = '0x3DA239'; //basegreen            
                this.animationManager.tweenMoveStage2(this.circle.x, this.circle.y - this.startPosition, this.circle, this.startPosition);
                break;
            case BC.BLUE:
                this.triangle.tint = '0x0057A9'; //baseblue          
                this.animationManager.tweenMoveStage2(this.triangle.x, this.triangle.y - this.startPosition, this.triangle, this.startPosition);
                break;
            case BC.YELLOW:
                this.rhombus.tint = '0xFFBF0F'; //baseyellow           
                this.animationManager.tweenMoveStage2(this.rhombus.x, this.rhombus.y - this.startPosition, this.rhombus, this.startPosition);
                break;
            default:
                break;

        }
    },

    playerWins: function() {
        if (this.square.y == this.startPosition && this.triangle.y == this.startPosition && this.rhombus.y == this.startPosition && this.circle.y == this.startPosition) {
            this.gameWon = true;
            Timer.stopTimer(this.game);
            this.gratulierenSignal.dispatch();
        }

    },

    showWinDialog: function() {
        var level = this._levelNumber + 1;
        LevelDialog.nextLevel(this.game, level);
    }
};
