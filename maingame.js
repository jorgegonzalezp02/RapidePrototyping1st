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
            this.scene.start('message')
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

class Message extends Phaser.Scene {
    constructor() {
        super('message');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#5072A7')
    }

    create() {
        let txt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/5, 'Watch out for Slugs!', {font: '70px Impact'} )
        .setOrigin(0.5);
        txt.setInteractive();
        txt.setStroke("#000000", 16);


        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Click/Tap to Start!')
        .setOrigin(0.5)
        .setFontFamily("Comic Sans MS")
        .setFontSize(40)

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('gameplay'));
        });
    }
}

class Gameplay extends Phaser.Scene {
    constructor() {
        super('gameplay');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#5072A7');
        this.load.image('rolypoly', 'img/rolypoly.png');
        this.load.image('slug', 'img/slug.png');
        this.load.image('arrow', 'img/arrow.png');
    }
    
    create() {

        this.add.text(this.cameras.main.width/2, this.cameras.main.height/4, 'Use the arrowkeys to move and jump!')

        this.platforms = this.physics.add.staticGroup();
        
        let street = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/1.03, 980, 40, 0x8D948D)
        street.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(street, true);
        street.body.immovable = true;
        this.platforms.add(street);

        this.player = this.physics.add.sprite(50,400, 'rolypoly')
        .setScale(0.2)
        .setBounce(0.1)
        .setCollideWorldBounds(true)
        .setGravityY(10);
        this.physics.add.collider(this.player, this.platforms);

        this.slug = this.add.image(300, 550, 'slug')
        .setScale(0.15)
        this.physics.add.existing(this.slug, true);
        this.slug.body.immovable = true;

        this.slug2 = this.add.image(600, 550, 'slug')
        .setScale(0.15)
        this.physics.add.existing(this.slug2, true);
        this.slug2.body.immovable = true;

        this.arrow = this.add.image(900, 600, 'arrow')
        .setScale(0.3)
        this.physics.add.existing(this.arrow, true);
        this.arrow.body.immovable = true;

        this.physics.add.collider(this.player, this.slug, this.goBack, null, this);
        this.physics.add.collider(this.player, this.slug2, this.goBack, null, this);
        this.physics.add.collider(this.player, this.arrow, this.goNext, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown & this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    goBack() {
        this.scene.start('title')
    }

    goNext() {
        this.scene.start('message2')
    }


}

class Message2 extends Phaser.Scene {
    constructor() {
        super('message2');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#5072A7')
    }

    create() {
        let txt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/5, "That's good work!", {font: '70px Impact'} )
        .setOrigin(0.5);
        txt.setInteractive();
        txt.setStroke("#000000", 16);

        let txt2 = this.add.text(this.cameras.main.width/2, this.cameras.main.height/3, "Watch out for rolypolys!", {font: '50px Impact'} )
        .setOrigin(0.5);
        txt2.setInteractive();
        txt2.setStroke("#000000", 16);



        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Click/Tap to Start!')
        .setOrigin(0.5)
        .setFontFamily("Comic Sans MS")
        .setFontSize(40)

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('gameplay2'));
        });
    }
}

class Gameplay2 extends Phaser.Scene {
    constructor() {
        super('gameplay2');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#5072A7');
        this.load.image('rolypoly', 'img/rolypoly.png');
        this.load.image('rolypoly2', 'img/rolypoly2.png');
        this.load.image('arrow', 'img/arrow.png');
    }
    
    create() {

        this.add.text(this.cameras.main.width/2, this.cameras.main.height/4, 'Use the arrowkeys to move and jump!')

        this.platforms = this.physics.add.staticGroup();
        
        let street = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/1.03, 980, 40, 0x8D948D)
        street.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(street, true);
        street.body.immovable = true;
        this.platforms.add(street);

        this.player = this.physics.add.sprite(50,400, 'rolypoly')
        .setScale(0.2)
        .setBounce(0.1)
        .setCollideWorldBounds(true)
        .setGravityY(10);
        this.physics.add.collider(this.player, this.platforms);

        this.roly = this.add.image(300, 550, 'rolypoly2')
        .setScale(0.15)
        this.physics.add.existing(this.roly, true);
        this.roly.body.immovable = true;

        this.roly2 = this.add.image(600, 550, 'rolypoly2')
        .setScale(0.15)
        this.physics.add.existing(this.roly2, true);
        this.roly2.body.immovable = true;

        this.arrow = this.add.image(900, 600, 'arrow')
        .setScale(0.3)
        this.physics.add.existing(this.arrow, true);
        this.arrow.body.immovable = true;

        this.physics.add.collider(this.player, this.roly, this.goBack, null, this);
        this.physics.add.collider(this.player, this.roly2, this.goBack, null, this);
        this.physics.add.collider(this.player, this.arrow, this.goNext, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown & this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    goBack() {
        this.scene.start('message2')
    }

    goNext() {
        this.scene.start('message3')
    }
}

class Message3 extends Phaser.Scene {
    constructor() {
        super('message3');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#5072A7')
    }

    create() {
        let txt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/5, "Good job!", {font: '70px Impact'} )
        .setOrigin(0.5);
        txt.setInteractive();
        txt.setStroke("#000000", 16);

        let txt2 = this.add.text(this.cameras.main.width/2, this.cameras.main.height/3, "This is the last level!", {font: '50px Impact'} )
        .setOrigin(0.5);
        txt2.setInteractive();
        txt2.setStroke("#000000", 16);



        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Click/Tap to Start!')
        .setOrigin(0.5)
        .setFontFamily("Comic Sans MS")
        .setFontSize(40)

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('gameplay3'));
        });
    }
}

class Gameplay3 extends Phaser.Scene {
    constructor() {
        super('gameplay3');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#5072A7');
        this.load.image('rolypoly', 'img/rolypoly.png');
        this.load.image('rolypoly2', 'img/rolypoly2.png');
        this.load.image('slug', 'img/slug.png');
    }
    
    create() {

        this.add.text(this.cameras.main.width/2, this.cameras.main.height/4, 'Use the arrowkeys to move and jump!')

        this.platforms = this.physics.add.staticGroup();
        
        let street = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/1.03, 980, 40, 0x8D948D)
        street.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(street, true);
        street.body.immovable = true;
        this.platforms.add(street);

        this.player = this.physics.add.sprite(50,400, 'rolypoly')
        .setScale(0.2)
        .setBounce(0.1)
        .setCollideWorldBounds(true)
        .setGravityY(10);
        this.physics.add.collider(this.player, this.platforms);

        this.roly = this.add.image(300, 550, 'rolypoly2')
        .setScale(0.2)
        this.physics.add.existing(this.roly, true);
        this.roly.body.immovable = true;

        this.roly2 = this.add.image(600, 550, 'rolypoly2')
        .setScale(0.2)
        this.physics.add.existing(this.roly2, true);
        this.roly2.body.immovable = true;

        this.physics.add.collider(this.player, this.roly, this.goBack, null, this);
        this.physics.add.collider(this.player, this.roly2, this.goBack, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown & this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

class Message4 extends Phaser.Scene {
    constructor() {
        super('message4');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#5072A7')
    }

    create() {
        let txt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/3, "The Roly Poly gets a badge!", {font: '70px Impact'} )
        .setOrigin(0.5);
        txt.setInteractive();
        txt.setStroke("#000000", 16);

        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Click/Tap to Continue!')
        .setOrigin(0.5)
        .setFontFamily("Comic Sans MS")
        .setFontSize(40)

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('victory'));
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
    scene: [Title, Message, Gameplay, Message2, Gameplay2, Message3, Gameplay3, Message4, Victory],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
})