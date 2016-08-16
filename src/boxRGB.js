function startBoxRGB() {

    // LEVEL SELECTION BASED ON: https://github.com/BdR76/phaserlevelselect

    var game = new Phaser.Game(WC.GAME_W, WC.GAME_H, Phaser.WEBGL, 'game');
    
    game.state.add('levels', LevelMenu); 
    game.state.add('game', MainGame);
    game.state.start('levels');

};