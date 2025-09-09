import Item from './Item.js'

export default class FuryPotion extends Item {

    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture, player);
        this.name = 'Poção de Fúria';
        this.efeito = 'Aumenta o ataque';
    }

    usar() {
        super.usar(1);
        this.player.damage = 10;
        this.scene.time.addEvent({
            delay: 10000,
            callback: () => {
                this.player.damage = 0;
            }
        })
    }
}