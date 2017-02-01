InputCreator = function(game, animationManager) {

    this.game = game;
    this._levelNumber = 1;
    this.animationManager = animationManager;
    this.createTheInput();
    this.createAnimation();

};

InputCreator.prototype = {

    createTheInput: function() {

        this.game.stage.backgroundColor = 'rgb(246, 246, 241)';
        this.game.add.tileSprite(0, WC.GAME_H/2, WC.GAME_W, WC.INPUT_H, 'inputBackground');
        this.buttonFactory = new ButtonFactory(this.game);
        this.boxFactory = new BoxFactory(this.game);
        this.cursorsManager = new CursorsManager(this.game);
        this.cursorsManager.keySignal.add(this.buttonFactory.onKeyDown, this.buttonFactory);
        this.cursorsManager.keySignal.add(this.boxFactory.onKeyDown, this.boxFactory);
        this.buttonFactory.activeButtonIndexSignal.add(this.boxFactory.setActiveButtonIndex, this.boxFactory);

    },

    createAnimation: function() {
        this.buttonFactory.fadeInSignal.add(this.animationManager.fadeIn, this.animationManager);
        this.buttonFactory.fadeOutSignal.add(this.animationManager.fadeOut, this.animationManager);
    },

    updateInputCreator: function() {

        this.cursorsManager.checkKeys();
        this.boxFactory.updateBoxes();

        if (this.cursorsManager.escapeKey.isDown) {

            this.game.state.start('levels');
        }
    }
};