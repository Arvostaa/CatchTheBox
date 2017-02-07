Menu = function() {


};

Menu.prototype.init = function(game) {
    this.game = game;

};

Menu.prototype.preload = function() {
    //this.game.load.image('buttonMenu', 'assets/buttonMenu.png')
};



Menu.prototype.create = function() {
    this.style = {
        font: "60px rubik",
        fill: "#C04A5A",
        align: "center"
    };
    this.text = this.game.add.text(80, 50, "CATCH THE BOX", this.style);

    this.game.stage.backgroundColor = '#EDEDED';
    ButtonGuiModule.Button(this.game, "PLAY", 10, 500, 'levels');
    ButtonGuiModule.Button(this.game, "SCORES", 10, 600, 'scores');


};

Menu.prototype.onPlaySelected = function() {


};
