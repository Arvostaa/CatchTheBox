function startBoxRGB() {

    // LEVEL SELECTION BASED ON: https://github.com/BdR76/phaserlevelselect

    var game = new Phaser.Game(WC.GAME_W, WC.GAME_H, Phaser.WEBGL, 'game');

    game.state.add('menu', Menu);
    game.state.add('levels', LevelMenu);

    game.state.add('stage0', Stage0);
    game.state.add('stage1', Stage1);
    game.state.add('stage2', Stage2);
    game.state.add('stage3', Stage3);

     game.state.start('menu', true, false, game);


};
