import Item from './Item.js'

export default class Potion extends Item {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture, player);
        this.name = 'Poção';
        this.efeito = 'Recupera 20 de HP';
    }
    usar() {
        super.usar(0);
        this.player.hp = Math.min(this.player.hp + 20, this.player.maxHp);
        this.scene.events.emit('recuperarHP', this.player);
    }
}