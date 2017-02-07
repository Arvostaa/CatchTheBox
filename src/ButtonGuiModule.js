var ButtonGuiModule = (function() {

            var Button = function(game, text, posX, posY, state) {
           
                this.style = {
                    font: "50px rubik",
                    fill: "#e0ebeb",
                    align: "center"
                };
                this.dialogGroup = game.add.group();
                this.dialog = game.add.graphics(250, 90);
                this.dialog.beginFill(0x000000, 0.7);
                this.dialog.x = posX;
                this.dialog.y = posY;
                this.dialog.drawRect(0, 0, 250, 90);
                this.text = game.add.text(posX + 30, posY + 25, text, this.style);

                this.dialogGroup.add(this.dialog);

                this.dialog.inputEnabled = true;
                this.dialog.events.onInputDown.add(function(){
                	 game.state.start(state, true, false, game);
                	}, this);                                           
                };

                var _Button = function(game, text, posX, posY, state) {
                    Button(game, text, posX, posY, state);
                };

                var onSelected = function(game) {
                	console.log(game);
                   game.state.start('levels', true, false, game);
                };

                return {
                    Button: _Button

                };

})();
