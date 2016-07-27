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
        game.load.image("background", "assets/background.png");
        assetsManager = new AssetsManager(game);

    }

    function create() {

        game.stage.backgroundColor = 'rgb(246, 246, 241)';
        game.add.tileSprite(0, 0, 640, 480, 'background');
        buttons = new ButtonFactory(game);
        boxFactory = new BoxFactory(game);
       // cursorsManager = new CursorsManager(game, boxFactory, buttons);
       // cursorsManager.buttonSignal.add(buttons.setActiveButtonIndex, buttons);
       signalsManager = new SignalsManager(game);
       signalsManager.buttonSignal.add(buttons.setActiveButtonIndex,buttons);
       signalsManager.boxSignal.add(boxFactory.catchTheBox, boxFactory);

    }

    function update() {
      
          signalsManager.sendButtonSignal();
          signalsManager.sendBoxSignal();
          boxFactory.updateBoxes();
     //   buttons.cursors.checkCursor();


    }



};