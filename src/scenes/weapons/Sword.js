export default class Sword extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, name, damage) {
        super(scene, x, y);
        this.name = name;
        this.texture = texture;
        this.damage = damage;
    }

    attack() {
        if(Math.random() < 0.2) {
            return this.damage*2;
        }
        return this.damage;
    }
}