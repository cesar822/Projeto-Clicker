export default class Shield extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y);
        this.texture = texture;
    }

    use() {
        return 20;
    }
}