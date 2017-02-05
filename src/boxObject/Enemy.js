Enemy = function(game) {
    this.enemy = game.add.sprite(300, 700, 'timer');
    game.physics.arcade.enable(this.enemy);
    this.enemy.body.velocity.y = 70;

    this.enemyTimer = this.game.time.create(false);
    this.enemyTimer.start();
    this.runTheEnemy();
};
