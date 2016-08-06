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
    var stage0;

    function preload() {

        assetsManager = new AssetsManager(game);
    }

    function create() {

        game.stage.backgroundColor = 'rgb(246, 246, 241)';

        /*INPUT PART*/

        game.add.tileSprite(0, 240, 640, 480, 'inputBackground');
        buttonFactory = new ButtonFactory(game);
        boxFactory = new BoxFactory(game);
        cursorsManager = new CursorsManager(game);
        cursorsManager.keySignal.add(buttonFactory.onKeyDown, buttonFactory);
        cursorsManager.keySignal.add(boxFactory.onKeyDown, boxFactory);

        /*RIDDLE PART*/

        game.add.tileSprite(0, 0, 640, 240, 'riddleBackground');
        stage0 = new Stage0(game);
        boxFactory.colorSignal.add(stage0.onColorPicked, stage0);


    }

    function update() {

        cursorsManager.checkKeys();
        boxFactory.updateBoxes();

    }



};