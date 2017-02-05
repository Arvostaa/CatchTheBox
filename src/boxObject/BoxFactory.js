var BoxFactoryModule = (function () {

    var colorSignal = new Phaser.Signal();
    var activeButtonIndex = 0;
    var boxGroup1 = null;
    var boxGroup2 = null;
    var boxGroup3 = null;

    function onCatchedBox(catchedColor) {
        colorSignal.dispatch(catchedColor);
    }

    BoxFactory = function (game) {
        boxGroup1 = new BoxGroup(game, BC.B_STARTX, 1);
        boxGroup2 = new BoxGroup(game, BC.B_STARTX + WC.GAME_W / 4, 2);
        boxGroup3 = new BoxGroup(game, BC.B_STARTX + WC.GAME_W / 2, 3);
        boxGroup1.catchedBoxSignal.add(onCatchedBox, this);
        boxGroup2.catchedBoxSignal.add(onCatchedBox, this);
        boxGroup3.catchedBoxSignal.add(onCatchedBox, this);
    };

//REMOVE CATCHED BOX//

    BoxFactory.prototype.onKeyDown = function (direction) { //if spacebar down - catch the box, pass the color
        if (direction === CC.SPACEBAR) {
            console.log("S: " + activeButtonIndex);
            switch (activeButtonIndex) {
                case 0:
                    boxGroup1.checkOverlap();
                    break;
                case 1:
                    boxGroup2.checkOverlap();
                    break;
                case 2:
                    boxGroup3.checkOverlap();
                    break;
            }
        }
    };

//MOVEMENT//

    BoxFactory.prototype.updateBoxes = function () { //wrap the box if has entered world bounds
        boxGroup1.checkPosition();
        boxGroup2.checkPosition();
        boxGroup3.checkPosition();
    };

    BoxFactory.prototype.setActiveButtonIndex = function (index) {
        activeButtonIndex = index;
    };

    BoxFactory.prototype.getColorSignal = function () {
        return colorSignal;
    };

    return BoxFactory;

})();