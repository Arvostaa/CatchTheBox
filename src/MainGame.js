MainGame = function(game) {

    this.game = game;
    this._levelNumber = 1;
    
    var animationManager;
};

MainGame.prototype = {
   
    create: function() {


        this.game.state.start('stage0', true, false, this.game, animationManager);

        // this.playerWins();

    },
};