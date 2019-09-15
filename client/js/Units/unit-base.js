class UnitBase {}

// Abstract base class for all unit types
//
UnitBase.prototype.constructor = function(spawnX, spawnY, maxHP, power, moveSpd, uid, imgId)  {
        this.uid = uid;
        this.power = power;
        this.statusEffects = {'buffs':[],'debuffs':[],'other':[]};
        this.moveSpeed = moveSpd;

        this.healthBar = new HealthBar();
        this.sprite = game.add.sprite( spawnX, spawnY, imgId );
        this.sprite.inputEnabled = true;
        this.sprite.maxHealth = maxHP;
        this.spriteGroup = game.add.group();
        this.spriteGroup.add(this.sprite);
        this.spriteGroup.add(this.healthBar);
}
