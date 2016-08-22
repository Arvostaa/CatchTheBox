function AssetsManager(game) {

    this.game = game;
    this.game.load.image("inputBackground", "assets/inputBackground.png");
    this.game.load.image("riddleBackground", "assets/riddleBackground.png");
    this.game.load.image('box1', 'assets/box1.png');
    this.game.load.image('boxBase', 'assets/boxBase.png');
    this.game.load.image('boxStage0', 'assets/boxStage0.png');
    this.game.load.image('button', 'assets/button.png');
    this.game.load.spritesheet('levelselecticons', 'assets/levelselecticons.png', 95, 96);

    this.game.load.image('circle', 'assets/circleStage1.png');
    this.game.load.image('box', 'assets/boxStage1.png');
};