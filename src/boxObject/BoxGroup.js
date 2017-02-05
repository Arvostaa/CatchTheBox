var BoxGroupModule = (function () {

    function create() {
        for (var i = 0; i < 6; i++) {
            addBox.call(this, this.posX, BC.B_STARTY, 'box1');
        }
    }

    function addBox(posX, posY, name) {
        this.changeRGB(this.boxGroup.create(posX, posY, name));
    }

    BoxGroup = function (game, x, boxId) {
        this.boxGroup = game.add.physicsGroup();
        this.boxGroup.enableBody = true;

        this.posX = x;
        this.activeBoxId = 0;

        this.game = game;
        create.call(this);

        this.boxGroup.setAll('body.immovable', false);
        this.boxGroup.setAll('body.velocity.y', 0);
        this.catchedBoxSignal = new Phaser.Signal();
        this.boxTimer = this.game.time.create(false);
        this.boxTimer.start();
        this.startTheBoxes();
        this.color;
    };

    BoxGroup.prototype.startTheBoxes = function () {

        this.runTheBox();
        this.boxTimer.add(this.game.rnd.integerInRange(250, 1250), this.startTheBoxes, this);

    };

    BoxGroup.prototype.runTheBox = function () {

        this.boxGroup.getAt(this.activeBoxId).body.velocity.y = BC.B_SPEED;
        this.setNextActiveIndex();
    };

    BoxGroup.prototype.setNextActiveIndex = function () {

        for (var i = 0; i < this.boxGroup.children.length; i++) {
            if (this.boxGroup.children[i].body.velocity.y == 0) {
                this.activeBoxId = i;
                break;
            }
        }
    };

    BoxGroup.prototype.checkOverlap = function () {
        this.boxGroup.forEach(this.checkButtonOverlap, this);
    };

    BoxGroup.prototype.checkButtonOverlap = function (box) {

        if (WC.BUTTON_Y + WC.BOX_H / 2 - box.y < WC.BOX_H && WC.BUTTON_Y + WC.BOX_H / 2 - box.y >= -WC.BOX_H / 5) { //if box overlaps active button
            if (this.boxGroup.total <= 5) {
                addBox.call(this, this.posX, BC.B_STARTY, 'box1');
            }

            this.getColor(box);
            box.anchor.setTo(0.2, 1);

            this.game.add.tween(box).to({
                alpha: 0
            }, 250, Phaser.Easing.Linear.None, true);

            this.game.add.tween(box.scale).to({
                x: 2,
                y: 2
            }, 250, Phaser.Easing.Linear.None, true);

            this.game.time.events.add(252, this.removeTheBox, this, box);
            this.catchedBoxSignal.dispatch(this.color); //******SEND SIGNAL*****//
        }
    };

    BoxGroup.prototype.removeTheBox = function (box) {

        this.boxGroup.remove(box);
        this.setNextActiveIndex();
    };

    BoxGroup.prototype.getColor = function (box) {
        this.color = box.tint;
    }

    BoxGroup.prototype.checkPosition = function () {
        this.boxGroup.forEach(this.checkEnteredBounds, this);
    };

    BoxGroup.prototype.checkEnteredBounds = function (box) {

        if (box.y >= WC.GAME_H + 3 * BC.B_H / 2) {
            this.removeTheBox(box);
            addBox.call(this, this.posX, BC.B_STARTY, 'box1');
        }
    };

    BoxGroup.prototype.changeRGB = function (box) {

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
        /*   var rValue = 25;
         for (var i = 0; i < this.boxGroup.length; i++) {
         this.boxGroup.children[i].tint = this.RGBtoHEX(200, 16 + rValue, 48);
         rValue += 90;
         */
    };

    BoxGroup.prototype.RGBtoHEX = function (r, g, b) {
        return r << 16 | g << 8 | b;
    };

})();