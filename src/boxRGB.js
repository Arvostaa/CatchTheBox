function startBoxRGB(){
	
var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game', {
        preload: preload,
        create: create,
        update: update
       
    });
var assetsManager;
var boxFactory;

function preload() {
   
       assetsManager = new AssetsManager(game);

     
        
    }

function create(){
	boxFactory = new BoxFactory(game);
 game.stage.backgroundColor = 'rgb(246, 246, 241)';

}

function update(){
boxFactory.updateBoxes();


}



};