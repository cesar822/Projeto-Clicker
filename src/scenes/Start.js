import Player from './Player.js';
import Knight from './enemys/Knight.js';
import DialogueBox from './DialogueBox.js';
import Sword from './weapons/Sword.js';

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('knight', 'assets/spr_roaring_knight.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('menu', 'assets/botao_menu.png');
        this.load.image('hab_de_gelo', 'assets/Habilidade_de_gelo.png');
        this.load.image('espada1', 'assets/espada_mine.png');
    }

    create() {

        //Adicionar Background
        this.add.image(640, 360, 'background');
        this.fecharMenu();

        //Adicionar Barra de HP inimigo
        this.enemysHpBar = this.add.graphics();
        this.enemysHpBarText = this.add.text(565, 153, '', {
            fontSize: '16px',
            color: '0x13b0f9'
        });
        this.danoCausado = this.add.text(700, 180, '', {
            fontSize: '32px',
            fill: '#FFF'
        });
        this.enemysContainer = this.add.container();

        //Adicionar o inimigo
        this.listaInimigos = [
            new Knight(this, 640, 360, 'knight', 1000, 10, this.enemysContainer)
        ]
        this.idxInimigoAtual = 0;
        this.inimigoAtual = this.listaInimigos[0];
        this.inimigoAtual.setScale(0.5);

        this.enemysContainer.add([this.enemysHpBar, this.enemysHpBarText, this.inimigoAtual, this.danoCausado]);
        this.add.existing(this.enemysContainer);


        //Adicionar Caixas de Dialogo
        this.dialogueBox = new DialogueBox(this);
        this.dialogueBox.setDepth(3);


        this.blocoTransicao = this.add.rectangle(0, 0, 1280, 0, '0xffffff').setOrigin(0, 0);

        //Adicionar Barra de HP do Player
        this.player = new Player(200, new Sword(this, 0, 0, 'espada1', 'espada1', 10));
        this.hpBar = this.add.graphics();
        this.hpBarInfo = {
            x: 900,
            y: 50,
            width: 300,
            height: 35
        }

        this.hpBarText = this.add.text(this.hpBarInfo.x + 95, this.hpBarInfo.y + 3, '', {
            fontSize: '30px',
            color: '0x13b0f9'
        });
        this.hpContainer = this.add.container();
        this.hpContainer.add([this.hpBar, this.hpBarText]);
        this.add.existing(this.hpContainer); 


        //Atacar o inimigo
        this.danoTotal = 0;
        this.inimigoAtual.on('pointerdown', () => {
            this.atacarInimigo();
        });


        //Inserir texto na caixa de Diálogo
        this.dialogueBox.setarDialogo(['Então é você quem ousou vir até aqui me desafiar?', 'Patético', 'Prepare-se para sucumbir'], 0);


        //Adicionar o Botão para o Menu
        this.botaoMenu = this.add.image(50, 35, 'menu');
        this.botaoMenu.setScale(0.1);
        this.botaoMenu.setInteractive({ cursor: 'pointer'});
        this.botaoMenu.on('pointerdown', () => {
            this.abrirMenu();
        });

        this.registry.set('player', this.player)
    }

    update() {
        if(this.registry.get('arma')) {
            this.player.arma = this.registry.get('arma');
        }
        this.atualizarHP();
        this.atualizarHpInimigo();
        if(this.podeRodar()) {
            this.inimigoAtual.setInteractive({cursor: 'pointer'});
            this.atacarPlayer();
            this.inimigoAtual.iniciarMoveAroundTheScreen();
        }
    }
    
    atualizarHP() {
        this.hpBar.clear();
        this.hpBarText.setText(`${this.player.hp}/${this.player.maxHp}`);
        this.hpBar.fillStyle(0xffffff); //Branco
        this.hpBar.fillRect(
            this.hpBarInfo.x - 5,
            this.hpBarInfo.y - 5,
            this.hpBarInfo.width + 10,
            this.hpBarInfo.height + 10,
        );
        this.hpBar.fillStyle(0xff0000); //Vermelho
        this.hpBar.fillRect(
            this.hpBarInfo.x,
            this.hpBarInfo.y,
            this.hpBarInfo.width,
            this.hpBarInfo.height
        );
        this.hpBar.fillStyle(0x00ff00); //Verde
        this.hpBar.fillRect(
            this.hpBarInfo.x,
            this.hpBarInfo.y,
            Math.max(this.hpBarInfo.width * (this.player.hp / this.player.maxHp), 0),
            this.hpBarInfo.height
        );
    }

    atualizarHpInimigo() {
        this.enemysHpBar.clear();
        this.enemysHpBarText.setText(`${this.inimigoAtual.hp}/${this.inimigoAtual.maxHp}`);
        this.enemysHpBar.fillStyle(0xffffff);
        this.enemysHpBar.fillRect(495, 145, 210, 30);
        this.enemysHpBar.fillStyle(0xff0000);
        this.enemysHpBar.fillRect(500, 150, 200, 20);
        this.enemysHpBar.fillStyle(0x00ff00);
        this.enemysHpBar.fillRect(500, 150, 200 * Math.max((this.inimigoAtual.hp / this.inimigoAtual.maxHp), 0), 20);
    }

    abrirMenu() {
        //0x000b47
        this.blocoTransicao = this.add.rectangle(0, 0, 1280, 0, '0xffffff').setOrigin(0, 0);
        this.blocoTransicao.setDepth(10);
        this.tweens.add({
            targets: this.blocoTransicao,
            height: 720,
            duration: 500,
            ease: 'linear',
            onComplete: () => {
                this.scene.switch('Menu');
            }
        });
    }

    fecharMenu() {
        this.events.on('wake', () => {
            this.blocoTransicao.destroy();
            this.blocoTransicao = this.add.rectangle(0, 0, 1280, 720, '0xffffff').setOrigin(0, 0);
            this.blocoTransicao.setDepth(10);
            this.scene.stop('Menu');
            this.tweens.add({
                targets: this.blocoTransicao,
                height: 0,
                duration: 500,
                ease: 'linear',
                onComplete: () => {
                    this.blocoTransicao.destroy();
                }
            });
        })
    }

    podeRodar() {
        if(this.dialogueBox.isOpen) {
            return false;
        }
        if(this.inimigoAtual.hp <= 0)
            return false;
        return true;
    }

    atacarInimigo() {
        let dano = this.player.attack();
        this.danoTotal+=dano;
        this.inimigoAtual.hp-=dano;
        this.mostrarDanoCausado();
        if(this.inimigoAtual.hp <= 0) {
            this.inimigoAtual.removeInteractive();
            this.inimigoAtual.hp = 0;
            this.inimigoAtual.pararMoveAroundTheScreen();
            this.dialogueBox.setarDialogo(['NÃO! Como isso é possível!?', 'Como pude ser derrotado?', '...', '...Ha...', 'Hahaha...', 'HAHAHA! VOCÊ ACHOU MESMO QUE PODERIA ME DERROTAR!?', 'É só uma demo cara, até a próxima! :3'], 0);
        }
        this.tweens.add({
            targets: this.inimigoAtual,
            x: this.inimigoAtual.x + 10,
            y: this.inimigoAtual.y + 10,
            scale: 0.55,
            duration: 50,
            yoyo: true
        });
        let timer = this.time.addEvent({
            delay: 16,
            callback: () => {
                if(this.danoCausado.alpha == 0) {
                    this.danoTotal = 0;
                    timer.destroy();
                }
            },
            loop: true
        });
    }

    mostrarDanoCausado() {
        if(this.danoCausado) this.danoCausado.destroy();
        this.danoCausado = this.add.text(700, 180, '', {
            fontSize: '32px',
            fill: '#FFF'
        });
        this.enemysContainer.add(this.danoCausado);
        this.danoCausado.setText(`${this.danoTotal}`);
        this.tweens.add({
            targets: this.danoCausado,
            y: this.danoCausado.y - 20,
            duration: 50,
            yoyo: true
        })
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.tweens.add({
                    targets: this.danoCausado,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear'
                });
            }
        });
    }

    atacarPlayer() {
        if(this.timerAtacarPlayer || this.player.hp <= 0 || this.inimigoAtual.hp <= 0) {
            return;
        }

        this.timerAtacarPlayer = this.time.addEvent({
            delay: 2000,
            callback: () => {
                if(this.inimigoAtual.hp > 0 && this.player.hp > 0) {
                    this.player.hp -= this.inimigoAtual.attack();
                    this.cameras.main.shake(100, 0.02);
                }
                else {
                    if(this.player.hp <= 0) {
                        this.player.hp = 0;
                    }
                    this.pararAtacarPlayer();
                }
            },
            loop: true
        })
    }

    pararAtacarPlayer() {
        if(this.timerAtacarPlayer) {
            this.timerAtacarPlayer.paused = true;
            this.timerAtacarPlayer = null;
        }
    }
}
