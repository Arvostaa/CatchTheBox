MainGame = function(game) {

    this.game = game;
    this._levelNumber = 1;

    var buttons;
    var boxFactory;
    var signalsManager;
    var stage0;
    var animationManager;

};

MainGame.prototype = {
    create: function() {

        this.game.stage.backgroundColor = 'rgb(246, 246, 241)';

        /*INPUT PART*/

        this.game.add.tileSprite(0, 240, 640, 480, 'inputBackground');
        buttonFactory = new ButtonFactory(this.game);
        boxFactory = new BoxFactory(this.game);
        cursorsManager = new CursorsManager(this.game);
        cursorsManager.keySignal.add(buttonFactory.onKeyDown, buttonFactory);
        cursorsManager.keySignal.add(boxFactory.onKeyDown, boxFactory);
        animationManager = new AnimationManager(this.game);

        /*RIDDLE PART*/

        this.game.add.tileSprite(0, 0, 640, 240, 'riddleBackground');
        stage0 = new Stage0(this.game);
        boxFactory.colorSignal.add(stage0.onColorPicked, stage0);

        stage0.fadeSignal.add(animationManager.fadeAndRecolor, animationManager);
        buttonFactory.fadeSignal.add(animationManager.fade, animationManager);
     
		this.playerWins();
		
    },

    update: function() {


        cursorsManager.checkKeys();
        boxFactory.updateBoxes();
     
		// click anywhere to go back to the LevelSelect state
		if (cursorsManager.escapeKey.isDown)
		{
          
			this.state.start('levels');
		}
		
    },

    playerWins: function() {
        
        // just testing, award random nr of stars
        var randstars = this.game.rnd.integerInRange(1, 3);
   
        // set nr of stars for this level
        LEVEL_DATA[this._levelNumber - 1] = randstars;

        // unlock next level
        if (this._levelNumber < LEVEL_DATA.length) {
            if (LEVEL_DATA[this._levelNumber] < 0) { // currently locked (=-1)
                LEVEL_DATA[this._levelNumber] = 0; // set unlocked, 0 stars
            }
        };

        // and write to local storage
        window.localStorage.setItem('mygame_progress', JSON.stringify(LEVEL_DATA));
    }

};