var Timer = (function() {

    var game;
   // var animation;
    var timer = 0;
    var timerEvent;

    var timerDialogText;

    var _CreateTimer = function(game, time) {

        this.style = {
            font: "30px rubik",
            fill: "#e0ebeb",
            align: "center"
        };

        game = game;
        timer = time;
       // animation = animation;

        this.timerDialogGroup = game.add.group();

        this.timerDialog = game.add.graphics(120, 50);
        this.timerDialog.beginFill(0x532339, 0.7);
        this.timerDialog.x = 10;
        this.timerDialog.y = 10;
        this.timerDialog.drawRect(10, 10, 120, 50);

        timerDialogText = game.add.text(60, 30, timer, this.style);
        timerEvent = game.time.events.loop(Phaser.Timer.SECOND, _UpdateTimer, this, game);

        this.timerDialogGroup.add(this.timerDialog);
        this.timerDialogGroup.add(timerDialogText);

    };

    var _Stop = function(game) {

        game = game;
        game.time.events.remove(timerEvent);
    };

    var _UpdateTimer = function(game) {
        game = game;
      //  animation = animation;
        timer--;
        if (timer == 0) {
            _Stop(game);
            LevelDialog.repeatLevel(game);
            game.time.events.add(Phaser.Timer.SECOND * 2, restart, this, game);
        }

        timerDialogText.setText(timer.toString());

    };

    var CreateTimer = function(game, c) {
        _CreateTimer(game, c);
    };
    var restart = function(game) {
        game = game;
        // game.state.start(game.state.current, game, animation); // HOW TO PASS GAME AND ANIMATION MANAGER ARGUMENTS ??
        game.state.start(game.state.current, true, false, game, animationManager);//HOW?DOES?IT?WORK?!!
    };

    var Stop = function(game) {
        _Stop(game);
    };

    var UpdateTimer = function() {
        _UpdateTimer(game);

    };

    return {
        createTimer: CreateTimer,
        stopTimer: Stop,
        updateTimer: UpdateTimer
    };

})();
