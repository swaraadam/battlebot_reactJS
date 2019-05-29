import 'phaser'

// var textInfo
var player
var turret
// var cursors

export default class GameplayScene extends Phaser.Scene{
    constructor(props){
        super(props)
    }

    GameplayScene(){
        Phaser.Scene.call(this,{key: 'demoA', active: true})
    }

    preload(){
        this.load.image('tank','assets/tank1.png')
        this.load.image('turret','assets/turret.png')
    }

    create(){
        // textInfo = this.add.text(10,10,'',{font: '16px Courier', fill: '#00ff00'})
        // cursors = this.input.keyboard.createCursorKeys()

        //tank
        player = this.physics.add.sprite(200,150,'tank').setOrigin(0.5,0.5)
        player.setDamping(true)
        player.setDrag(0.1)
        player.setMaxVelocity(200)
        player.setCollideWorldBounds(true);

        //turret
        turret = this.add.sprite(200,150,'turret').setOrigin(0.3,0.5)

        // displayText = this.add.text(10, 280, '', { fontSize: '16px', fill: '#000' });

        // cursors = this.input.keyboard.createCursorKeys();
    }
}