export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, maxHp, damage, player) {
        super(scene, x, y, texture);
        this.scene = scene;

        this.hp = maxHp;
        this.maxHp = maxHp;
        this.damage = damage;
        this.player = player;
        this.hits = 0;
    }

    attack() {
        this.hits++;
        let danoCausado = this.damage;
        if(this.hits === 3) {
            this.hits = 0;
            return this.player.hp = Math.max(this.player.hp - danoCausado*3, 0)
        }
        return this.player.hp = Math.max(this.player.hp - danoCausado, 0)
    }

    iniciarMovimentos() {
        return;
    }

    pararMovimentos() {
        return;
    }
}