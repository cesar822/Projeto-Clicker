export default class Player {
    constructor(maxHp, arma) {
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.arma = arma;
        this.damage = 0;
    }

    attack() {
        return this.arma.attack() + this.damage;
    }
}