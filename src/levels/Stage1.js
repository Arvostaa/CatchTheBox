var Stage1 = function() {

};

Stage1.prototype = {


    init: function(game, animationManager) {
        this.game = game;
        this.animationManager = animationManager;

    },

    preload: function() {

        this._levelNumber = 1;

        this.game.load.image('circle', 'assets/circleStage1.png');
        this.game.load.image('box', 'assets/boxStage1.png');

    },

    create: function() {


        this.inputCreator = new InputCreator(this.game, this.animationManager);
        this.game.add.tileSprite(0, 0, 640, 240, 'riddleBackground');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //

        this.boxBaseR = this.game.add.sprite(233, 13, 'boxBase'); //basered
        this.boxBaseY = this.game.add.sprite(333, 13, 'boxBase'); //baseyellow     
        this.boxBaseG = this.game.add.sprite(233, 113, 'boxBase'); //basegreen
        this.boxBaseB = this.game.add.sprite(333, 113, 'boxBase'); //baseblue



        this.boxR = this.game.add.sprite(240, 20, 'box');
        this.boxY = this.game.add.sprite(340, 20, 'box');
        this.boxG = this.game.add.sprite(240, 120, 'box');
        this.boxB = this.game.add.sprite(340, 120, 'box');


        this.boxBaseR.tint = '0xCD044E'; //basered
        this.boxBaseY.tint = '0xFFBF0F'; //baseyellow
        this.boxBaseB.tint = '0x0057A9'; //baseblue
        this.boxBaseG.tint = '0x3DA239'; //basegreen

        this.boxR.tint = '0x121211'; //red
        this.boxY.tint = '0x121211'; //yellow
        this.boxG.tint = '0x121211'; //green
        this.boxB.tint = '0x121211'; //blue

       // this.boxR.alpha = 1; //red
       // this.boxY.alpha = 1; //red
       // this.boxG.alpha = 1; //red
       // this.boxB.alpha = 1; //red

        this.inputCreator.boxFactory.colorSignal.add(this.onColorPicked, this);

        this.playerWins();
    },

    update: function() {
        this.inputCreator.updateInputCreator();

    },

    render: function() {
        // this.game.debug.body(disk);
        //  this.game.debug.body(ball1);
        //  this.game.debug.body(ball2);
    },

    onColorPicked: function(color) {

        switch (color) {

            case BC.RED:

                this.animationManager.tweenTint(this.boxR, this.boxR.tint, this.boxBaseR.tint, 500);
                // this.boxR.alpha -= 0.2;
                break;
            case BC.GREEN:
                this.animationManager.tweenTint(this.boxG, this.boxG.tint, this.boxBaseG.tint, 500);
                break;
            case BC.BLUE:
                this.animationManager.tweenTint(this.boxB, this.boxB.tint, this.boxBaseB.tint, 500);
                break;
            case BC.YELLOW:
                this.animationManager.tweenTint(this.boxY, this.boxY.tint, this.boxBaseY.tint, 500);
                break;
            default:
                break;

        }




    },

    playerWins: function() {

        // set nr of stars for this level
        LEVEL_DATA[this._levelNumber - 1] = this._levelNumber;

        // unlock next level
        if (this._levelNumber < LEVEL_DATA.length) {
            if (LEVEL_DATA[this._levelNumber] < 0) { // currently locked (=-1)
                LEVEL_DATA[this._levelNumber] = 0; // set unlocked, 0 stars
            }
        };

        // and write to local storage
        window.localStorage.setItem('mygame_progress', JSON.stringify(LEVEL_DATA));
    },

    shutdown: function(pointer) {
        console.log("bye");
        delete this.inputCreator;
        delete this.animationManager;


    }
};