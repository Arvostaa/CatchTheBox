boxConstants = {
B_NAME: 'box1',
B_SPEED: 350,
B_W: 50,
B_H: 50,
B_STARTY:0,
B_STARTX:0,
MIN_Y: 0,
MAX_Y: 0

};

boxConstants.B_STARTY = 0-boxConstants.B_H- worldConstants.GAME_H/4;
boxConstants.B_STARTX = worldConstants.GAME_W / 4 - boxConstants.B_W / 2;
boxConstants.MIN_Y = 3*boxConstants.B_H/2;
boxConstants.MAX_Y = worldConstants.GAME_H;


BC = boxConstants;