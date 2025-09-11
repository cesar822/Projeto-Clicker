import Potion from './items/Potion.js'
import FuryPotion from './items/FuryPotion.js'
import Sword from './weapons/Sword.js';

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    init() {

    }

    preload() {
        this.load.image('background_menu', 'assets/background_menu.png');
        this.load.image('menu', 'assets/botao_menu.png');
        this.load.image('espada1', 'assets/espada_mine.png');
        this.load.image('varinhaMagica', 'assets/varinhaMagica.png');
        this.load.image('shuriken', 'assets/shuriken.png');
        this.load.image('tesoura', 'assets/tesouraBen10.png');
        this.load.image('aegislash', 'assets/aegislash.png');
        this.load.image('tenna', 'assets/tenna_feliz.png');
        this.load.image('seta_esquerda', 'assets/seta_esquerda.png');
        this.load.image('seta_direita', 'assets/seta_direita.png');
        this.load.image('potion', 'assets/potion.webp');
        this.load.image('furyPotion', 'assets/furyPotion.png');
    }

    create() {
        //
        this.add.image(640, 360, 'background_menu');
        this.start = this.scene.get('Start');

        this.player = this.registry.get('player');
        
        this.menuArmas = this.add.container(50, 50);
        this.menuItens = this.add.container(50, 50).setVisible(false);
        this.menuStats = this.add.container(50, 50).setVisible(false);
        this.menuHabilidades = this.add.container(50, 50).setVisible(false);
        this.menuAtual = this.menuArmas;

        //Adicionar Barra Superior
        this.adicionarBarraSuperior();

        this.listaArmas = [
            new Sword(this, 0, 0, 'espada1', 'espada Meme', 10),
            new Sword(this, 0, 0, 'varinhaMagica', 'espada Meme', 10),
            new Sword(this, 0, 0, 'shuriken', 'espada Meme', 10),
            new Sword(this, 0, 0, 'tesoura', 'espada Meme', 10),
            new Sword(this, 0, 0, 'aegislash', 'espada Meme', 10),
            new Sword(this, 0, 0, 'tenna', 'Tenna, fds', -10)
        ]

        this.quantidade = [5, 5];

        if (!this.registry.has('quantidade')) {
            this.registry.set('quantidade', this.quantidade);
        }

        this.listaItens = [
            new Potion(this.start, 0, 0, 'potion', this.player),
            new FuryPotion(this.start, 0, 0, 'furyPotion', this.player, 5)
        ]

        this.armaEquipada = this.listaArmas[0];
        this.blocoArmaEquipada;
        this.registry.set('arma', this.armaEquipada);
        this.sideScroll();
        this.addMenuItens();
    }

    update() {
    }

    adicionarBotaoMenu() {
        this.botaoMenu = this.add.image(50, 35, 'menu');
        this.botaoMenu.setDepth(9);
        this.botaoMenu.setScale(0.1);
        this.botaoMenu.setInteractive({ cursor: 'pointer' });
        this.botaoMenu.on('pointerdown', () => {
            this.voltarParaStart();
        });
    }

    adicionarBarraSuperior() {
        this.adicionarBotaoMenu();
        this.barraSuperior = this.add.graphics();
        this.barraSuperior.fillStyle(0x222222);
        this.barraSuperior.fillRect(0, 0, 1280, 60);
        this.containerBarraSuperior = this.add.container();
        this.containerBarraSuperior.add(this.barraSuperior, this.botaoMenu);
        this.add.existing(this.containerBarraSuperior);
        let listaMenus = [this.menuArmas, this.menuItens, this.menuStats, this.menuHabilidades];
        let listaNomes = ['Armas', 'Itens', 'Stats', 'Habilidades'];
        this.listaOpcoes = [];
        for (let i = 0; i < 4; i++) {
            let opcao = {
                rectangle: this.add.rectangle(150 * i + 250, 30, 100, 60, 0xffffff),
                text: this.add.text(150 * i + 250, 25, `${listaNomes[i]}`, { fontSize: '16px', fill: '0x000000' }),
                container: this.add.container(),
                menu: listaMenus[i]
            }
            opcao.text.setOrigin(0.5, 0.5);
            opcao.text.setDepth(10);
            opcao.container.add(opcao.rectangle, opcao.text);
            this.listaOpcoes[i] = opcao;
            opcao.rectangle.setInteractive({ cursor: 'pointer' });
            opcao.rectangle.on('pointerdown', () => {
                if (this.menuAtual != opcao.menu) {
                    this.menuAtual.setVisible(false);
                    opcao.menu.setVisible(true);
                    this.menuAtual = opcao.menu;
                }
            })
        }
    }

    voltarParaStart() {
        //0x000b47
        this.blocoTransicao = this.add.rectangle(0, 0, 1280, 0, '0xffffff').setOrigin(0, 0);
        this.blocoTransicao.setDepth(10);
        this.tweens.add({
            targets: this.blocoTransicao,
            height: 720,
            duration: 500,
            ease: 'linear',
            onComplete: () => {
                this.scene.switch('Start');
            }
        });
    }

    sideScroll() {
        this.containerArmas = this.add.container();
        this.scroll = this.add.container();

        let pos = 0
        let equipamentos = [];
        for(let i = 0; i < this.listaArmas.length; i++) {
            let arma = this.listaArmas[i];
            let borda = this.add.rectangle(i * 300 + 400, 400, 250, 250, 0x000000);
            let item = this.add.rectangle(i * 300 + 400, 400, 230, 230, 0xffffff);
            let image = this.add.image(i*300 + 400, 400, arma.texture);
            let nome = this.add.text(i * 300 + 400, 200, `${arma.name}`, { fontSize: '30px', fill: '0x000000'}).setOrigin(0.5);
            let dano = this.add.text(i * 300 + 400, 540, `Dano: ${arma.damage}`, { fontSize: '25px', fill: '0x000000'}).setOrigin(0.5);
            let detalhes = this.add.text(i * 300 + 400, 580, `Detalhes ${i + 1}`, { fontSize: '25px', fill: '0x000000'}).setOrigin(0.5);
            let equipar = this.add.text(i * 300 + 400, 620, `Equipar`, { fontSize: '25px', fill: '0x000000'}).setOrigin(0.5);
            let equipamento = {
                arma: arma,
                item: item,
                image: image,
                nome: nome,
                dano: dano,
                borda: borda,
                equipar: equipar,
                detalhes: detalhes
            };
            if(i != 0) image.setScale(0.5);
            equipar.setInteractive({ cursor: 'pointer'});
            equipar.on('pointerdown', () => {
                this.armaEquipada = arma;
                for(let i = 0; i < equipamentos.length; i++) {
                    let escala;
                    if(i == 0) {escala = 1;}
                    else {escala = 0.5}
                    equipamentos[i].item.setScale(1);
                    equipamentos[i].image.setScale(escala);
                    equipamentos[i].borda.setScale(1);
                    equipamentos[i].equipar.setText('Equipar');
                }
                let escala;
                if(i == 0) {escala = 1.04;}
                else {escala = 0.55}
                item.setScale(1.04);
                image.setScale(escala);
                borda.setScale(1.04);
                equipar.setText('Equipado');
                this.registry.set('arma', this.armaEquipada);
            });
            equipamentos[i] = equipamento;
            this.scroll.add([borda, item, image, nome, dano, detalhes, equipar]);
        }

        // Scroll buttons
        let btnLeft = this.add.image(0, 400, 'seta_esquerda');
        let btnRight = this.add.image(1180, 400, 'seta_direita');

        btnLeft.setInteractive({ cursor: 'pointer' });
        btnRight.setInteractive({ cursor: 'pointer' });

        btnLeft.on("pointerdown", () => {
            if(pos > 0) {
                this.scroll.x += 600;
                pos--;
            }
        });
        
        btnRight.on("pointerdown", () => {
            if(pos < (this.listaArmas.length - 3) / 2) {
                this.scroll.x -= 600;
                pos++;
            }
        });
        this.containerArmas.add([this.scroll, btnLeft, btnRight])
        this.menuArmas.add(this.containerArmas);
    }

    getArmaEquipada() {
        return this.armaEquipada;
    }

    addMenuItens() {
        this.containerItens = this.add.container();
        this.scrollItens = this.add.container();

        let pos = 0
        for(let i = 0; i < this.listaItens.length; i++) {
            let centralX = i * 400 + 400;
            let item = this.listaItens[i];
            let borda = this.add.rectangle(centralX, 400, 250, 250, 0x000000);
            let quadradoFundo = this.add.rectangle(centralX, 400, 230, 230, 0xffffff);
            let image = this.add.image(i*350 + 400, 400, item.texture);
            if(i == 0) {
                image.setScale(0.2);
            }
            if(i == 1) {
                image.setOrigin(0.2, 0.5);
            }
            let nome = this.add.text(centralX, 200, `${item.name}`, { fontSize: '30px', fill: '0x000000'}).setOrigin(0.5);
            let efeito = this.add.text(centralX, 540, `Efeito: ${item.efeito}`, { fontSize: '25px', fill: '0x000000'}).setOrigin(0.5);
            let usar = this.add.text(centralX, 620, `Usar`, { fontSize: '25px', fill: '0x000000'}).setOrigin(0.5);
            let quantidade = this.add.text(centralX, 580, `Quantidade: ${item.quantidade[i]}x`, { fontSize: '25px', fill: '0x000000'}).setOrigin(0.5);
            usar.setInteractive({ cursor: 'pointer'});
            usar.on('pointerdown', () => {
                item.usar();
                quantidade.setText(`Quantidade: ${item.quantidade[i]}x`);
            });
            this.scrollItens.add([borda, quadradoFundo, image, nome, efeito, quantidade, usar]);
        }

        // Scroll buttons
        let btnLeft = this.add.image(0, 400, 'seta_esquerda');
        let btnRight = this.add.image(1180, 400, 'seta_direita');

        btnLeft.setInteractive({ cursor: 'pointer' });
        btnRight.setInteractive({ cursor: 'pointer' });

        btnLeft.on("pointerdown", () => {
            if(pos > 0) {
                this.scrollItens.x += 600;
                pos--;
            }
        });
        
        btnRight.on("pointerdown", () => {
            if(pos < (this.listaItens.length - 3) / 2) {
                this.scrollItens.x -= 600;
                pos++;
            }
        });
        this.containerItens.add([this.scrollItens, btnLeft, btnRight])
        this.menuItens.add(this.containerItens);
    }
}