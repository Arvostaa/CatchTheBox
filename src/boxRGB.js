function startBoxRGB() {

    var game = new Phaser.Game(WC.GAME_W, WC.GAME_H, Phaser.CANVAS, 'game', {
        preload: preload,
        create: create,
        update: update

    });
    var assetsManager;
    var buttons;
    var boxFactory;
    var signalsManager;

    function preload() {

        assetsManager = new AssetsManager(game);

    }

    function create() {

        game.stage.backgroundColor = 'rgb(246, 246, 241)';

      


game.add.tileSprite(0, 240, 640, 480, 'inputBackground');
        buttonFactory = new ButtonFactory(game);
        boxFactory = new BoxFactory(game);

        cursorsManager = new CursorsManager(game);

        cursorsManager.keySignal.add(buttonFactory.onKeyDown, buttonFactory);
        cursorsManager.keySignal.add(boxFactory.onKeyDown, boxFactory);

          
        game.add.tileSprite(0, 0, 640, 240, 'riddleBackground');

    }

    function update() {

        cursorsManager.checkKeys();
        boxFactory.updateBoxes();

    }



};