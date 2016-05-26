TestGame.Unit = function(game, x, y, faction, job) {
    var frameIdx = faction * TestGame.jobs.length + job;
    Phaser.Sprite.call(this, game, x, y, 'spritesheet-units', frameIdx);
    this.name = 'unit'; /* INITIALIZATION */
    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(this.select, this);
    this.events.onInputUp.add(this.release, this);
    return this;
};

TestGame.Unit.prototype = Object.create(Phaser.Sprite.prototype);
TestGame.Unit.prototype.constructor = TestGame.Unit;

TestGame.Unit.prototype.select = function() {
    this.game.events.onUnitSelected.dispatch(this);
};..

.TestGame.Unit.prototype.selectMove = function() {
    this.game.events.onUnitMoveSelect.dispatch(this);
    this.game.input.onUp.add(this.processClickMove, this);
};

TestGame.Unit.prototype.processClickMove = function(pointer) {
    if (pointer.duration <= 150) { // in case they are dragging    
        this.moveTo({
            x: pointer.worldX,
            y: pointer.worldY
        });
        this.game.input.onUp.remove(this.processClickMove, this);
    }
};


///////////////****//////////////////////

TestGame.Game.prototype = {
    create: function() {
        if (!this.game.events) this.game.events = {};
        this.game.events.onUnitSelected = new Phaser.Signal();
        this.game.events.onUnitMoveSelect = new Phaser.Signal();
        this.game.events.onUnitSelected.add(this.handleUnitSelect, this);
        this.game.events.onUnitMoveSelect.add(this.handleUnitMoveSelect, this);
    },
    update: function() {...
    }...spawnUnit: function(castle) {
        var unit; // game, x, y, faction, icon		
        unit = new TestGame.Unit(this.game, castle.x + 16, castle.y + 16, castle.properties.faction, this.game.rnd.integerInRange(0, TestGame.jobs.length - 1));
        this.game.add.existing(unit);
        party.revive(100);
        if (TestGame.factions[unit.properties.faction] === 'player') {
            this.playerParties.add(unit);
        } else if (unit.properties.faction === 'foe') {
            this.foeParties.add(unit);
        } else {
            this.neutralParties.add(unit);
        }
    },
    handleUnitSelect: function(unit) {
        if (TestGame.factions[unit.properties.faction] === 'player') {
            this.playerUnitSelected = unit;
            this.selectedUnitMenu.clearButtonHandle('move');
            this.selectedUnitMenu.clearButtonHandle('cancel');
            this.selectedUnitMenu.addButtonHandle('move', unit.selectMove, unit);
            this.selectedUnitMenu.addButtonHandle('cancel', this.selectedUnitMenu.hide, this.selectedUnitMenu);
            this.selectedPartyMenu.show({
                x: party.x + 64,
                y: party.y
            });
        }
    },
    handleUnitMoveSelect: function(unit) {
        this.selectedUnitMenu.hide();
    }
};