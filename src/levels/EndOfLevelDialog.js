var LevelDialog = (function() {

    var game;

    var _NextLevelDialog = function(game) {
    
        game = game;
        this.winDialogGroup = game.add.group();

        this.winDialog = game.add.graphics(300, 300);
        this.winDialog.beginFill(0x000000, 0.7);
        this.winDialog.x = 0;
        this.winDialog.y = 0;
        this.winDialog.drawRect(0, 0, game.width, game.height);
        this.winText = game.add.text(90, 300, "NEXT STAGE", this.style);

        this.winDialogGroup.add(this.winDialog);
        this.winDialogGroup.add(this.winText);

        game.add.tween(this.winDialogGroup).to({ // fade out in 50ms 
            alpha: 0
        }, 4000, Phaser.Easing.Linear.None, true);

    };

     var _RepeatLevelDialog = function(game) {
    
        game = game;
        this.winDialogGroup = game.add.group();

        this.winDialog = game.add.graphics(300, 300);
        this.winDialog.beginFill(0x000000, 0.7);
        this.winDialog.x = 0;
        this.winDialog.y = 0;
        this.winDialog.drawRect(0, 0, game.width, game.height);
        this.winText = game.add.text(90, 300, "TRY AGAIN", this.style);

        this.winDialogGroup.add(this.winDialog);
        this.winDialogGroup.add(this.winText);

        game.add.tween(this.winDialogGroup).to({ // fade out in 50ms 
            alpha: 0
        }, 4000, Phaser.Easing.Linear.None, true);

    };

    var NextLevelDialog = function(game) {

        _NextLevelDialog(game);
    };

     var RepeatLevelDialog = function(game) {
       _RepeatLevelDialog(game);

    };

    return {
        nextLevel: NextLevelDialog,
        repeatLevel: RepeatLevelDialog
    };


})();
