InputCreator = function(game, animationManager) {

    this.game = game;
    this._levelNumber = 1;
    this.animationManager = animationManager;

   // var buttons;
   // var boxFactory;
   // var cursorsManager;

    //  var stage0;
    //  var stage1;

    this.createTheInput();
    this.createAnimation();

};

InputCreator.prototype = {

    createTheInput: function() {

        this.game.stage.backgroundColor = 'rgb(246, 246, 241)';

        /*INPUT PART*/

        this.game.add.tileSprite(0, 240, 640, 480, 'inputBackground');

        this.buttonFactory = new ButtonFactory(this.game);
        this.boxFactory = new BoxFactory(this.game);
        this.cursorsManager = new CursorsManager(this.game);
        this.cursorsManager.keySignal.add(this.buttonFactory.onKeyDown, this.buttonFactory);
        this.cursorsManager.keySignal.add(this.boxFactory.onKeyDown, this.boxFactory);


    },

    createAnimation: function() {
        this.buttonFactory.fadeInSignal.add(this.animationManager.fadeIn, this.animationManager);
        this.buttonFactory.fadeOutSignal.add(this.animationManager.fadeOut, this.animationManager);
    },

    updateInputCreator: function() {

        this.cursorsManager.checkKeys();
        this.boxFactory.updateBoxes();

        // click anywhere to go back to the LevelSelect state
        if (this.cursorsManager.escapeKey.isDown) {

            this.game.state.start('levels');
        }
    }



};