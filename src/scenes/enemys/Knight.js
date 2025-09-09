import Enemy from './Enemy.js';

export default class Knight extends Enemy {
    constructor(scene, x, y, texture, maxHp, damage, container) {
        super(scene, x, y, texture, maxHp, damage);

        this.container = container;
        this.scene = scene;
        this.movimentoAtivado = false;

        scene.add.existing(this);

        this.flutuar = scene.tweens.add({
            targets: this.container,
            y: 40,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    iniciarMoveAroundTheScreen() {
        if (!this.movimentoAtivado) {
            this.movimentoAtivado = true;
            this.isMoving = false;
            this.timerMover = this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    if (!this.isMoving && Math.random() < 0.2) {
                        this.isMoving = true;
                        let x = Math.random();
                        if(x < 0.5)
                            this.moveAroundTheScreen();
                        else
                            this.movimentoCircular();
                    }
                },
                loop: true
            })
        }
    }

    pararMoveAroundTheScreen() {
        this.timerMover.remove();
        this.movimentoAtivado = false;
    }

    movimentoCircular() {
        let originalX = this.container.x;
        let originalY = this.container.y;
        let radius = 300;

        this.flutuar.pause();
        this.scene.tweens.add({
            targets: this.container,
            x: originalX + radius,
            duration: 800,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                let angleObj = { value: 0 };
                this.scene.tweens.add({
                    targets: angleObj,
                    value: Math.PI * 2,
                    duration: 4000,
                    ease: 'Linear',
                    onUpdate: () => {
                        this.container.x = originalX + Math.cos(angleObj.value) * radius;
                        this.container.y = originalY + Math.sin(angleObj.value) * radius;
                    },
                    onComplete: () => {
                        this.scene.tweens.add({
                            targets: this.container,
                            duration: 1000,
                            ease: 'Sine.easeInOut',
                            x: originalX,
                            y: originalY,
                            onComplete: () => {
                                this.isMoving = false;
                                this.flutuar.resume();
                            }
                        });
                    }
                });
            }
        });
    }

    moveAroundTheScreen() {
        let originalX = this.container.x;
        let originalY = this.container.y;
        let angle = 0;
        let repeat = Math.random() * (626 - 100) + 100;
        this.flutuar.pause();
        this.moveSenoide = this.scene.time.addEvent({
            delay: 16,
            repeat: repeat,
            callback: () => {
                this.container.y = originalY + Math.sin(angle) * 150;
                this.container.x = originalX + Math.sin(angle) * Math.cos(angle) * 800;
                angle += 0.0145;
            }
        });
        this.scene.time.addEvent({
            delay: 16 * repeat,
            callback: () => {
                this.scene.tweens.add({
                    targets: this.container,
                    duration: 750,
                    ease: 'Linear',
                    y: originalY,
                    x: originalX,
                });
            }
        })
        this.scene.time.addEvent({
            delay: 16 * repeat + 750,
            callback: () => {
                this.isMoving = false;
                this.flutuar.resume();
            }
        })
    }
}