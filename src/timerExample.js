var game = new Phaser.Game(800, 600, Phaser.AUTO, {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.bitmapFont('desyrel', '/assets/fonts/desyrel.png', '/assets/fonts/desyrel.xml');
}
var textStyle = {
    font: '64px Desyrel',
    align: 'center'
};
var timer;
var milliseconds = 0;
var seconds = 0;
var minutes = 0;

function create() {
    timer = game.add.bitmapText(250, 250, '00:00:00', textStyle);
}

function update() { //Calling a different function to update the timer just cleans up the update loop if you have other code.
    updateTimer();
}

function updateTimer() {
    minutes = Math.floor(game.time.time / 60000) % 60;
    seconds = Math.floor(game.time.time / 1000) % 60;
    milliseconds = Math.floor(game.time.time) % 100; //If any of the digits becomes a single digit number, pad it with a zero
    if (milliseconds < 10) milliseconds = '0' + milliseconds;
    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
    timer.setText(minutes + ':' + seconds + ':' + milliseconds);
}