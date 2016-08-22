var Stage0 = function() {

};

Stage0.prototype = {

    init: function(game, animationManager) {
        this.game = game;
        this.animationManager = animationManager;
        this._levelNumber = 0;

    },
    preload: function() {

    },

    create: function() {

        this.inputCreator = new InputCreator(this.game, this.animationManager);
        this.game.add.tileSprite(0, 0, 640, 240, 'riddleBackground');
        this.colorBox = this.game.add.sprite(280, 70, 'boxStage0');
        this.changeRGB(this.colorBox);

        var style = {
            font: "30px Arial",
            fill: "#91807a",
            align: "center"
        };

        this.catchedCounter = 0;
        this.missedCounter = 0;
        this.catchedText = this.game.add.text(80, 180, "Catched: 0", style);
        this.missedText = this.game.add.text(WC.GAME_W - 250, 180, "Missed: 0", style);
        this.pickedColorText = this.game.add.text(250, 10, "", style);

        this.fadeSignal = new Phaser.Signal();
        this.inputCreator.boxFactory.colorSignal.add(this.onColorPicked, this);
        this.fadeSignal.add(this.animationManager.fadeAndRecolor, this.animationManager);

        this.playerWins();
    },

    update: function() {
        this.inputCreator.updateInputCreator();
    },

    onColorPicked: function(color) {

        if (color != this.colorBox.tint) {
            this.missedCounter++;
            this.missedText.text = "Missed: " + this.missedCounter;
            this.catchedText.fill = "#91807a"
            this.missedText.fill = "#fb3968";

        } else {

            switch (color) {

                case BC.BLUE:

                    this.pickedColor = BC.BLUE;
                    break;

                case BC.RED:
                    this.pickedColor = BC.RED;
                    break;

                case BC.YELLOW:
                    this.pickedColor = BC.YELLOW;
                    break;

                case BC.GREEN:
                    this.pickedColor = BC.GREEN;
                    break;
            }
            this.catchedCounter++;
            this.catchedText.text = "Catched: " + this.catchedCounter;
            this.catchedText.fill = "#fb3968"
            this.missedText.fill = "#91807a";

            this.fadeSignal.dispatch(this.colorBox);
        }

    },

    changeRGB: function(box) {

        var color = Math.floor(Math.random() * 4) + 1
        switch (color) {
            case 1:
                box.tint = this.RGBtoHEX(255, 195, 0); // yellow
                break;
            case 2:
                box.tint = this.RGBtoHEX(213, 71, 109); //red
                break;
            case 3:
                box.tint = this.RGBtoHEX(86, 207, 130); // green
                break;
            case 4:
                box.tint = this.RGBtoHEX(39, 162, 227); //blue
                break;
        }
    },

    RGBtoHEX: function(r, g, b) {
        return r << 16 | g << 8 | b;

    },

     playerWins: function() {
     
        LEVEL_DATA[this._levelNumber + 1] = this._levelNumber + 1;
        window.localStorage.setItem('mygame_progress', JSON.stringify(LEVEL_DATA));
    },

      shutdown: function (pointer) {

     delete this.inputCreator;
     delete this.animationManager;        

    }

};