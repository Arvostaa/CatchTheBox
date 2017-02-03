var LevelDialog = (function() {

    var game;
    var nextStageName;

    var _NextLevelDialog = function(game, levelnr) {

        _LevelDialog(game, "NEXT LEVEL", 2000);

        nextStageName = 'stage' + levelnr;
        game.time.events.add(Phaser.Timer.SECOND * 2, _NextLevel, this, game);


    };

    var _NextLevel = function(game) {
        game.state.start(nextStageName, true, false, game, animationManager)
    };

    var _RepeatLevelDialog = function(game) {

        _LevelDialog(game, "TRY AGAIN", 2000);

    };

    var _LevelDialog = function(game, text, fadeTime) {

        game = game;
        this.dialogGroup = game.add.group();

        this.dialog = game.add.graphics(300, 300);
        this.dialog.beginFill(0x000000, 0.7);
        this.dialog.x = 0;
        this.dialog.y = 0;
        this.dialog.drawRect(0, 0, game.width, game.height);
        this.text = game.add.text(90, 300, text, this.style);

        this.dialogGroup.add(this.dialog);
        this.dialogGroup.add(this.text);

        game.add.tween(this.dialogGroup).to({
            alpha: 0
        }, fadeTime, Phaser.Easing.Linear.None, true);
    };



    //****PUBLIC METHODS****//

    var NextLevelDialog = function(game, level) {

        _NextLevelDialog(game, level);
    };

    var RepeatLevelDialog = function(game) {
        _RepeatLevelDialog(game);

    };

    return {
        nextLevel: NextLevelDialog,
        repeatLevel: RepeatLevelDialog
    };

})();
