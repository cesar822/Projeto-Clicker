export class TelaInicial extends Phaser.Scene {

    constructor() {
        super('TelaInicial');
    }    

    preload() {
        this.load.image('backgroundTelaInicial', 'assets/background_menu.png');
    }

    create() {
        this.add.image(640, 360, 'backgroundTelaInicial');
        this.containerModoHistoria = this.add.container(600, 500);
        const TAMANHO_BOTAO = {
            x: 300,
            y: 200
        }
        this.botaoModoHistoria = {
            borda: this.add.rectangle(0, 0, TAMANHO_BOTAO.x+10, TAMANHO_BOTAO.y+10, '0x000000'),
            corpo: this.add.rectangle(0, 0, TAMANHO_BOTAO.x, TAMANHO_BOTAO.y, '0xffffff'),
            texto: this.add.text(0, 0, 'Start', {
                font: '800 20px Arial',
                color: 'black',
            }).setOrigin(0.5)
        }
        this.containerModoHistoria.add([
            this.botaoModoHistoria.borda,
            this.botaoModoHistoria.corpo,
            this.botaoModoHistoria.texto
        ]);
        this.containerModoHistoria.setSize(400, 300);
        this.containerModoHistoria.setInteractive();
        this.containerModoHistoria.on('pointerdown', () => {
            this.scene.switch('Start');
        })
    }
}