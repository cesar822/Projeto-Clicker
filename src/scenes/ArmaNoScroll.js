import Sword from './weapons/Sword.js';

export default class ArmaNoScroll extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, arma) {
        super(scene, 0, 0, texture);
        this.desbloqueado = true;
        this.arma = arma;
    }
}