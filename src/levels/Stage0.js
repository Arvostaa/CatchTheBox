Stage0 = function(game) {

    this.game = game;
    this.colorBox = game.add.sprite(295, 70, 'box1');
    this.changeRGB(this.colorBox);

    var style = {
        font: "30px Arial",
        fill: "#91807a",
        align: "center"
    };

    this.catchedCounter = 0;
    this.missedCounter = 0;

    this.catchedText = game.add.text(80, 180, "Catched: 0", style);
    this.missedText = game.add.text(WC.GAME_W - 250, 180, "Missed: 0", style);
    this.pickedColorText = game.add.text(250, 10, "", style);
    // text.setShadow(0, 0, 'rgba(191, 24, 80, 0.3)', 15);
    //  text.anchor.set(0.5);

};

Stage0.prototype.onColorPicked = function(color) {

    if (color != this.colorBox.tint) {

        this.missedCounter++;
        this.missedText.text = "Missed: " + this.missedCounter;

    } else {

        switch (color) {

            case BC.BLUE:

                this.pickedColor = BC.BLUE;
               // this.pickedColorText.text = "BLUE!";
                this.catchedCounter++;
                this.catchedText.text = "Catched: " + this.catchedCounter;
                // console.log("BBBBLLLUE");

                break;

            case BC.RED:
                this.pickedColor = BC.RED;
               // this.pickedColorText.text = "RED!";
                this.catchedCounter++;
                this.catchedText.text = "Catched: " + this.catchedCounter;
                break;

            case BC.YELLOW:
                this.pickedColor = BC.YELLOW;
                //this.pickedColorText.text = "YELLOW!";
                this.catchedCounter++;
                this.catchedText.text = "Catched: " + this.catchedCounter;
                break;

            case BC.GREEN:
                this.pickedColor = BC.GREEN;
                //this.pickedColorText.text = "GREEN!";
                this.catchedCounter++;
                this.catchedText.text = "Catched: " + this.catchedCounter;
                break;
        }
        this.changeRGB(this.colorBox);
    }
};

Stage0.prototype.changeRGB = function(box) {

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
};

Stage0.prototype.RGBtoHEX = function(r, g, b) {
    return r << 16 | g << 8 | b;
};