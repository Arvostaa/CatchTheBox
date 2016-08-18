 var ball1;
 var ball2;
 var disk;

 
 var Stage1 = function() {

 };

 Stage1.prototype = {


     init: function(game, animationManager) {
         this.game = game;
         this.animationManager = animationManager;
         
     },

     preload: function() {

         this._levelNumber = 1;

         this.game.load.image('circle', 'assets/circleStage1.png');
         this.game.load.image('box', 'assets/boxStage1.png');

     },

     create: function() {

          
        this.inputCreator = new InputCreator(this.game, this.animationManager);
        this.game.add.tileSprite(0, 0, 640, 240, 'riddleBackground');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

         disk = this.game.add.sprite(80, 20, 'box');
         ball1 = this.game.add.sprite(20, 20, 'circle');
         ball2 = this.game.add.sprite(700, 240, 'circle');


         this.game.physics.arcade.enable([disk, ball1, ball2]);

         //  By default the Body is a rectangle. Let's turn it into a Circle with a radius of 45 pixels

         ball1.body.setCircle(30);
         ball2.body.setCircle(30);

         // ball1.body.immovable = true;
         // ball2.body.mass = 3;

         //  Set the ball to collide with the world, have gravity, bounce, and move.
         ball1.body.collideWorldBounds = true;
         ball2.body.collideWorldBounds = true;
         disk.body.collideWorldBounds = true;

         ball1.body.bounce.set(0.3); // bounce: heavy material
         ball1.tint = '#000000';
         ball2.body.bounce.set(1.2);
        // disk.body.bounce.set(1);

         ball1.body.gravity.y = 100;
         ball2.body.gravity.y = 100;
         disk.body.gravity.y = 0;
         disk.body.immovable = true;
         // ball1.body.velocity.x = 50;
         // ball2.body.velocity.x = -50;

         ball1.body.velocity.set(150);
         ball2.body.velocity.set(-50, 60);
         
          /**************!!!!!!!!!!!!!!!!!!!!!!!!!!!**********************/
         // this.game.input.onDown.add(function() { console.log(this.game.physics.arcade.intersects(ball1.body, ball2.body)); });
         // game.input.onDown.add(function() { console.log(game.physics.arcade.intersects(ball1.body, disk.body)); });
this.playerWins();
     },

     update: function() {
         this.inputCreator.updateInputCreator();

         this.game.physics.arcade.collide(ball1, ball2);
         this.game.physics.arcade.collide(ball1, disk);
         this.game.physics.arcade.collide(ball2, disk);
     },

     render: function() {
       // this.game.debug.body(disk);
       //  this.game.debug.body(ball1);
       //  this.game.debug.body(ball2);
     },
      playerWins: function() {
             
        // set nr of stars for this level
        LEVEL_DATA[this._levelNumber - 1] = this._levelNumber;

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