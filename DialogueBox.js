export default class DialogueBox extends Phaser.GameObjects.Container {
    constructor(_scene) {
        super(_scene, 240, 550);
        this.scene = _scene;
        this.box = this.scene.add.graphics();
        this.box.fillStyle(0x222222);
        this.box.fillRoundedRect(0, 0, 800, 150, 20);
        this.isOpen = true;

        this.text = this.scene.add.text(20, 20, "", {
            fontSize: '24px',
            color: '#ffffff',
            wordWrap: { width: 460 }
        });

        this.add([this.box, this.text]);
        this.scene.add.existing(this);

        this.box.setInteractive(new Phaser.Geom.Rectangle(0, 0, 800, 150),
        Phaser.Geom.Rectangle.Contains);
        this.box.setDepth(1000);
        
        this.box.on('pointerover', () => {
            this.scene.input.manager.canvas.style.cursor = 'pointer';
            });
        this.box.on('pointerout', () => {
            this.scene.input.manager.canvas.style.cursor = 'default';
        });
    }

    escreverDialogo(dialogo) {
        let i = 0;
        this.estaEscrevendo = true;
        this.timerEscrita = this.scene.time.addEvent({
            delay: 50,
            callback: () => {
                this.text.setText(dialogo.substring(0, i));
                i++;
                if(i > dialogo.length) {
                    this.estaEscrevendo = false;
                    this.timerEscrita.remove();
                }
            },
            repeat: dialogo.length
        });
    }

    setarDialogo(vetorDialogos, index = 0) {
        this.setVisible(true);
        let dialogo = vetorDialogos[index];
        this.escreverDialogo(dialogo);
        this.box.removeAllListeners();
        this.box.on('pointerover', () => {
            this.scene.input.manager.canvas.style.cursor = 'pointer';
        });
        this.box.on('pointerout', () => {
            this.scene.input.manager.canvas.style.cursor = 'default';
        });
        this.box.on('pointerdown', () => {
            if(this.estaEscrevendo) {
                this.timerEscrita.remove();
                this.text.setText(dialogo);
                this.estaEscrevendo = false;
            }
            else {
                if(index < vetorDialogos.length-1) {
                    return this.setarDialogo(vetorDialogos, index+1);
                }
                else {
                    this.setVisible(false);
                    this.isOpen = false;
                }
            }
        });
    }
}