export default class DialogueBox extends Phaser.GameObjects.Container {
    constructor(_scene) {
        super(_scene, 240, 550);
        const scene = _scene;
        this.box = scene.add.graphics();
        this.box.fillStyle(0x222222);
        this.box.fillRoundedRect(0, 0, 800, 150, 20);
        this.isOpen = true;

        this.text = scene.add.text(20, 20, "", {
            fontSize: '24px',
            color: '#ffffff',
            wordWrap: { width: 460 }
        });

        this.add([this.box, this.text]);
        scene.add.existing(this);

        this.box.setInteractive(new Phaser.Geom.Rectangle(0, 0, 800, 150),
        Phaser.Geom.Rectangle.Contains);
        this.box.setDepth(1000);
        
        this.box.on('pointerover', () => {
            scene.input.manager.canvas.style.cursor = 'pointer';
            });
        this.box.on('pointerout', () => {
            scene.input.manager.canvas.style.cursor = 'default';
        });
        
    }

    typeText(message) {
        let i = 0;
        this.scene.time.addEvent({
            delay: 50,
            callback: () => {
                this.text.setText(message.substring(0, i));
                i++;
            },
            repeat: message.length
        })
    }

    setText(messages, index) {
        this.setVisible(true);
        this.typeText(messages[index]);
        this.box.once('pointerdown', () => {
            if (index < messages.length - 1) {
                this.setText(messages, index + 1);
            } else {
                this.setVisible(false);
                this.isOpen = false;
            }
        });
    }


    nextText(messages, index) {
        if(index < messages.length)
            return index++;
        else return -1;
    }
}