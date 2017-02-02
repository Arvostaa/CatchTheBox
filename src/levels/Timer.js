var Timer = (function() {

    var game;

    var timer = 0;

    var timerDialogText;


    var _CreateTimer = function(game, time) {

        this.style = {
            font: "30px rubik",
            fill: "#e0ebeb",
            align: "center"
        };

        game = game;
        timer = time;
        this.timerDialogGroup = game.add.group();

        this.timerDialog = game.add.graphics(120, 50);
        this.timerDialog.beginFill(0x532339, 0.7);
        this.timerDialog.x = 10;
        this.timerDialog.y = 10;
        this.timerDialog.drawRect(10, 10, 120, 50);

        timerDialogText = game.add.text(60, 30, timer, this.style);
        game.time.events.loop(Phaser.Timer.SECOND, _UpdateTimer, this);

        this.timerDialogGroup.add(this.timerDialog);
        this.timerDialogGroup.add(timerDialogText);

    };

    var _StopTimer = function(game) {

        game = game;
        this.winDialogGroup = game.add.group();

        this.winDialog = game.add.graphics(300, 100);
        this.winDialog.beginFill("#871B4C", 0.7);
        this.winDialog.x = 50;
        this.winDialog.y = 50;
        this.winDialog.drawRect(50, 50, 300, game.height);
        this.winText = game.add.text(90, 300, "TRY AGAIN", this.style);

        this.winDialogGroup.add(this.winDialog);
        this.winDialogGroup.add(this.winText);

        game.add.tween(this.winDialogGroup).to({ // fade out in 50ms 
            alpha: 0
        }, 4000, Phaser.Easing.Linear.None, true);

    };

    var _UpdateTimer = function() {
 timer--;
        timerDialogText.setText(timer.toString());
       

    };

    var CreateTimer = function(game, c) {
        _CreateTimer(game, c);
    };

    var StopTimer = function(game) {
        _StopTimer(game);

    };

    var UpdateTimer = function() {
        _UpdateTimer();

    };

    return {
        createTimer: CreateTimer,
        stopTimer: StopTimer,
        updateTimer: UpdateTimer
    };


})();
