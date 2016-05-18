function startBoxRGB(){
	
var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game', {
        preload: preload,
        create: create,
        update: update
       
    });
var assetsManager;
var boxfactory;

function preload() {
   
       assetsManager = new AssetsManager(game);

     
        
    }

function create(){
	boxfactory = new BoxFactory(game);
	//game.add.sprite(0, 0, 'box1');

}

function update(){

}



};