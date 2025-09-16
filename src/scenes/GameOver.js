export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }    

    create() {
        this.tentarDenovoContainer = this.add.container(600, 500);
        const TAMANHO_BOTAO = {
            x: 300,
            y: 200
        }
        this.botaoTentarDenovo = {
            borda: this.add.rectangle(0, 0, TAMANHO_BOTAO.x+10, TAMANHO_BOTAO.y+10, '0x000000'),
            corpo: this.add.rectangle(0, 0, TAMANHO_BOTAO.x, TAMANHO_BOTAO.y, '0xffffff'),
            texto: this.add.text(0, 0, 'Tentar Novamente?', {
                font: '800 20px Arial',
                color: 'black',
            }).setOrigin(0.5)
        }
        this.tentarDenovoContainer.add([
            this.botaoTentarDenovo.borda,
            this.botaoTentarDenovo.corpo,
            this.botaoTentarDenovo.texto
        ]);
        this.tentarDenovoContainer.setSize(400, 300);
        this.tentarDenovoContainer.setInteractive();
        this.tentarDenovoContainer.on('pointerdown', () => {
            this.scene.switch('Start');
        })
    }
}