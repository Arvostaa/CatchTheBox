

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
        font: "50px rubik",
        fill: "#e0ebeb",
        align: "center"
    };
    this.game.stage.backgroundColor = '#EDEDED';

    this.buttonGroup = this.game.add.group();

    this.button = this.game.add.graphics(200, 100);
    this.button.beginFill(0x532339, 0.7);
    this.button.x = 0;
    this.button.y = 200;
    this.button.drawRect(0, 200, 200, 100);
    this.buttonText = this.game.add.text(30, 440, "PLAY", this.style);

    this.buttonGroup.add(this.button);
    this.buttonGroup.add(this.buttonText);

    this.button.inputEnabled = true;
    this.button.events.onInputDown.add(this.onPlaySelected, this);
};

Menu.prototype.onPlaySelected = function() {
  
    this.game.state.start('levels', true, false, game);
};

