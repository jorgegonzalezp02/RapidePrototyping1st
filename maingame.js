class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    preload() {
        this.load.image('button', 'img/button.png');
        this.load.image('rolypoly', 'img/rolypoly.png');
        this.cameras.main.setBackgroundColor('#5072A7')
    }

    create() {
        let text1 = this.add.text(this.cameras.main.width/2, this.cameras.main.height/5, 'Roly Poly: To The End', {font: '70px Impact'})
        .setOrigin(0.5);
        text1.setTint(0x77A1D3, 0x79CBCA, 0xE684AE);
        text1.setInteractive();
        text1.setStroke("#000000", 16)

        this.add.tween({
            targets: text1,
            scale: 1.7,
            duration: 800,
            yoyo: true,
            repeat: -1
        })


        let button = this.add.image(this.cameras.main.width/2, this.cameras.main.height/1.5, 'button')
        .setOrigin(0.5)
        .setScale(0.7)
        .setInteractive()
        .on('pointerover', () => {
            this.add.tween ({
            targets: button,
            scale: 1,
            duration: 500,
            yoyo: true,
            repeat: 1
        })
        })
        button.alpha = 0
        button.on('pointerdown', () => {
            this.scene.start('victory')
            this.cameras.main.fadeOut(2000)
        })

        this.add.tween({
            targets: button,
            delay: 2000,
            alpha: 1
        })

        let rolypoly = this.add.image(this.cameras.main.width/2, this.cameras.main.height/1.5, 'rolypoly')
        .setOrigin(0.5);
        rolypoly.setScale(0.6)
        rolypoly.setInteractive()

        this.tweens.add({
            targets: rolypoly,
            x: 1000,
            y: -100,
            duration: 5000,
            ease: 'Linear',
            repeat: -1,
        });
    }

}


class Victory extends Phaser.Scene {
    constructor() {
        super('victory');
    }
    preload() {
        this.load.image('rolypoly', 'img/rolypoly.png');
        this.load.image('button2', 'img/button2.png');
        this.load.image('badge', 'img/badge.png');
        this.cameras.main.setBackgroundColor('#5072A7')
    }

    create() {

        let txt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/5, 'Well Done! You recieved a prize!', {font: '70px Impact'})
        .setOrigin(0.5)
        txt.setTint(0x77A1D3, 0x79CBCA, 0xE684AE);
        txt.setInteractive();
        txt.setStroke("#000000", 16)

        let rolypoly = this.add.image(this.cameras.main.width/2, this.cameras.main.height/1.5, 'rolypoly')
        .setOrigin(0.5);
        rolypoly.setScale(0.6)
        rolypoly.setInteractive()
        rolypoly.alpha = 0

        this.add.tween({
            targets: rolypoly,
            delay: 1000,
            alpha: 1
        })

        let badge = this.add.image(this.cameras.main.width/1.8, this.cameras.main.height/1.5, 'badge')
        .setOrigin(0.5);
        badge.setScale(1)
        badge.setInteractive()
        badge.alpha = 0

        this.add.tween({
            targets: badge,
            delay: 2000,
            alpha: 1
        })

        let button2 = this.add.image(this.cameras.main.width/1.3, this.cameras.main.height/1.2, 'button2')
        .setOrigin(0.5)
        .setScale(0.3)
        .setInteractive()
        .on('pointerover', () => {
            this.add.tween ({
            targets: button2,
            scale: 0.6,
            duration: 500,
            yoyo: true,
            repeat: 0
        })
        })
        button2.alpha = 0
        button2.on('pointerdown', () => {
            this.scene.start('title')
            this.cameras.main.fadeOut(2000)
        })

        this.add.tween({
            targets: button2,
            delay: 2000,
            alpha: 1
        })


        



    }
        

}




new Phaser.Game({
    width: 980,
    height: 640,
    scene: [Title, Victory]
})