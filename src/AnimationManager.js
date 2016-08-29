AnimationManager = function(game) {

    this.game = game;
}


AnimationManager.prototype.fadeAndRecolor = function(object) { //Stage0

    this.game.time.events.add(10, function() {

        this.game.add.tween(object).to({ // fade out in 50ms 
            alpha: 0
        }, 100, Phaser.Easing.Linear.None, true);

    }, this);

    this.game.time.events.add(110, function() { //fade in

        this.game.add.tween(object).to({
            alpha: 1
        }, 100, Phaser.Easing.Linear.None, true);

    }, this);

    this.game.time.events.add(210, function() {
        this.changeRGB(object);
    }, this);

};

AnimationManager.prototype.increaseAlpha = function(object, a){

var alpha = object.alpha + a;
if(alpha<0) alpha = 0;
 this.game.add.tween(object).to({ // fade out in 50ms 
            alpha: alpha
        }, 250, Phaser.Easing.Linear.None, true);

};



AnimationManager.prototype.fadeIn = function(object) {
this.tweenTint(object, '0x62273e','0xfb3968',150); // tween the tint of sprite from red to blue over 2 seconds (2000ms)

};

AnimationManager.prototype.fadeOut = function(object) {

this.tweenTint(object,'0xfb3968','0x62273e',150); // tween the tint of sprite from red to blue over 2 seconds (2000ms)

};

AnimationManager.prototype.fadeCatch = function(object) {

this.tweenTint(object,'0xfb3968','0xffab3d',100); // tween the tint of sprite from red to blue over 2 seconds (2000ms)

};

AnimationManager.prototype.erlargeAndFade = function(object){

this.tweenTint(object,'0xf50039','0xF0FDFF',250);

this.game.add.tween(object).to({ // fade out in 50ms 
            alpha: 0
        }, 250, Phaser.Easing.Linear.None, true);

};

AnimationManager.prototype.tweenTint = function(obj, startColor, endColor, time) {
    // create an object to tween with our step value at 0  
    var colorBlend = {
        step: 0
    };
    // create the tween on this object and tween its step property to 100 
    var colorTween = this.game.add.tween(colorBlend).to({
        step: 100
    }, time);
    // run the interpolateColor function every time the tween updates, feeding it the   
    // updated value of our tween each time, and set the result as our tint 
    colorTween.onUpdateCallback(function() {
        obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
    });
    // set the object to the start color straight away    
    obj.tint = startColor;
    // start the tween  
    colorTween.start();
};

//

AnimationManager.prototype.changeRGB = function(box) {

    var color = Math.floor(Math.random() * 4) + 1
    switch (color) {
        case 1:
            box.tint = this.RGBtoHEX(255, 195, 0); // yellow
            break;
        case 2:
            box.tint = this.RGBtoHEX(213, 71, 109); //red
            break;
        case 3:
            box.tint = this.RGBtoHEX(86, 207, 130); // green
            break;
        case 4:
            box.tint = this.RGBtoHEX(39, 162, 227); //blue
            break;
    }

};

AnimationManager.prototype.RGBtoHEX = function(r, g, b) {
    return r << 16 | g << 8 | b;
};