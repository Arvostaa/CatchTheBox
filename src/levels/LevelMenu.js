var LEVEL_DATA = null;

var animationManager;

LevelMenu = function(game) {
    this.game = game;
    this.holdicons = [];
};

LevelMenu.prototype = {

    preload: function() {
        
        this.initProgressData();
        AssetsManager(this.game);

    },

    create: function() {

        this.game.stage.backgroundColor = '#EDEDED';
        var mainMenuText = this.game.add.text(200, 60, "SELECT A LEVEL");
        mainMenuText.font = 'Rubik';
        mainMenuText.fill = '#7C6F6E';

        animationManager = new AnimationManager(this.game);
        this.game.world.setBounds(0, 0, 640, 220);

        this.createLevelIcons();
        this.animateLevelIcons();

    },

    update: function() {

    },

    
    render: function() {

    },

    initProgressData: function() {

        if (!LEVEL_DATA) {

            var str = window.localStorage.getItem('mygame_progress'); //get data from local storage

            try {
                LEVEL_DATA = JSON.parse(str);
            } catch (e) {
                LEVEL_DATA = [];
            };
            // error checking just to be sure, if localstorage contains something else then a JSON array 
            if (Object.prototype.toString.call(LEVEL_DATA) !== '[object Array]') {
                LEVEL_DATA = [];
            };
        };

    },

    createLevelIcons: function() {
        var levelnr = 0;

        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 3; x++) {
                // next level
                levelnr = levelnr + 1;

                // check if array not yet initialised
                if (typeof LEVEL_DATA[levelnr - 1] !== 'number') {
                    // value is null or undefined, i.e. array not defined or too short between app upgrades with more levels
                    if (levelnr == 1) {
                        LEVEL_DATA[levelnr - 1] = 0; // level 1 should never be locked
                    } else {
                        LEVEL_DATA[levelnr - 1] = -1;
                    };
                };

                // player progress info for this level
                var playdata = LEVEL_DATA[levelnr - 1];

                // decide which icon
                var isLocked = true; // locked

                // check if level is unlocked
                if (playdata > -1) {
                    isLocked = false; // unlocked

                };

                // calculate position on screen
                var xpos = 150 + (x * 128);
                var ypos = 150 + (y * 128);

                // create icon
                this.holdicons[levelnr - 1] = this.createLevelIcon(xpos, ypos, levelnr, isLocked);

                var backicon = this.holdicons[levelnr - 1].getAt(0);

                // keep level nr, used in onclick method
                backicon.health = levelnr;

                // input handler
                backicon.inputEnabled = true;
                backicon.events.onInputDown.add(this.onSpriteDown, this);
            };
        };
    },

    createLevelIcon: function(xpos, ypos, levelnr, isLocked) {

        // create new group
        var IconGroup = this.game.add.group();
        IconGroup.x = xpos;
        IconGroup.y = ypos;

        // keep original position, for restoring after certain tweens
        IconGroup.xOrg = xpos;
        IconGroup.yOrg = ypos;

        // determine background frame
        var frame = 0;
        if (isLocked == false) {
            frame = 1
        };

        var icon1 = this.game.add.sprite(0, 0, 'levelselecticons', frame);
        IconGroup.add(icon1);

        if (isLocked == false) {

            var icon2 = this.game.add.sprite(0, 0, 'levelselecticons', frame);
            var iconText = this.game.add.text(37, 28, '' + levelnr);
            iconText.font = 'Rubik';
            iconText.fill = '#F2657D';

            IconGroup.add(icon2);
            IconGroup.add(iconText);
        };

        return IconGroup;
    },

    onSpriteDown: function(sprite, pointer) {

        // retrieve the iconlevel
        var levelnr = sprite.health;

        if (LEVEL_DATA[levelnr - 1] < 0) {
            // indicate it's locked by shaking left/right
            var IconGroup = this.holdicons[levelnr - 1];
            var xpos = IconGroup.xOrg;

            var tween = this.game.add.tween(IconGroup)
                .to({
                    x: xpos + 6
                }, 20, Phaser.Easing.Linear.None)
                .to({
                    x: xpos - 5
                }, 20, Phaser.Easing.Linear.None)
                .to({
                    x: xpos + 4
                }, 20, Phaser.Easing.Linear.None)
                .to({
                    x: xpos - 3
                }, 20, Phaser.Easing.Linear.None)
                .to({
                    x: xpos + 2
                }, 20, Phaser.Easing.Linear.None)
                .to({
                    x: xpos
                }, 20, Phaser.Easing.Linear.None)
                .start();
        } else {

            // simulate button press animation to indicate selection
            var IconGroup = this.holdicons[levelnr - 1];
            var tween = this.game.add.tween(IconGroup.scale).to({
                x: 0.9,
                y: 0.9
            }, 100, Phaser.Easing.Linear.None).to({
                x: 1.0,
                y: 1.0
            }, 100, Phaser.Easing.Linear.None).start();

            // it's a little tricky to pass selected levelnr to callback function, but this works:

            this.onLevelSelected(levelnr);

        };
    },

    animateLevelIcons: function() {

        // slide all icons into screen
        for (var i = 0; i < this.holdicons.length; i++) {
            // get variables
            var IconGroup = this.holdicons[i];
            IconGroup.y = IconGroup.y + 600;
            var y = IconGroup.y;

            // tween animation
            this.game.add.tween(IconGroup).to({
                y: y - 600
            }, 500, Phaser.Easing.Back.Out, true, (i * 40));
        };


    },

    onLevelSelected: function(levelnr) {

        var stagename = 'stage' + (levelnr - 1);
        this.game.state.start(stagename, true, false, this.game, animationManager);
    }
};
