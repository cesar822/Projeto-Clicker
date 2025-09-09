export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.player = player;
        this.texture = texture;

        // faz uma cópia do array global, assim este Item tem seu próprio estoque
        this.quantidade = this.scene.registry.get('quantidade');
    }

    usar(idx) {
        if (this.quantidade[idx] > 0) {
            this.quantidade[idx]--;
        }
    }
}
