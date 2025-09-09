export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, maxHp, damage) {
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);

        this.hp = maxHp;
        this.maxHp = maxHp;
        this.damage = damage;
        this.hits = 0;
    }

    attack() {
        this.hits++;
        if(this.hits === 3) {
            this.hits = 0;
            return this.damage*3;
        }
        return this.damage;
    }
}