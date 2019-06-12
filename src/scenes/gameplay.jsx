import 'phaser'
import {store} from '../store/configureStore'
import Tank1 from './Tank1'
import Tank2 from './Tank2'


var textInfo
var player
var turret
// var cursors

export default class GameplayScene extends Phaser.Scene{
    constructor(props){
        super(props)
        store.subscribe(this.restartGame)
    }

    restartGame(){
        console.log(store.getState)
        this.scene.restart()
    }

    GameplayScene(){
        Phaser.Scene.call(this,{key: 'gameplay', active: true})
    }

    preload(){
        this.load.image('tank','assets/tank1.png')
        this.load.image('turret','assets/turret.png')
    }

    create(){

        // if (store.getState().gameObjects.length !== 0) { 
        //     console.log('abc')
        //     // console.log(store.getState())
        //     var gameObjects = store.getState().gameObjects;
        //     gameObjects.forEach(object => {
        //         eval(object.jsCode);
        //     });
            
        // }

        textInfo = this.add.text(10,10,'',{font: '16px Courier', fill: '#00ff00'})

        //tank
        player = this.physics.add.sprite(200,150,'tank').setOrigin(0.5,0.5)
        player.setDamping(true)
        player.setDrag(0.1)
        player.setMaxVelocity(200)
        player.setCollideWorldBounds(true);

        //turret
        turret = this.add.sprite(200,150,'turret').setOrigin(0.3,0.5)

        ///Test under here
        this.Tank1 = new Tank1({
            scene: this,
            key: 'tank',
            x: 100,
            y: 100,
            width: 50,
            height: 50
        })

        this.Tank2 = new Tank2({
            scene: this,
            key: 'tank',
            x: 500,
            y: 500,
            width: 50,
            height: 50
        })
    }

    update(){
        turret.x = player.x
        turret.y = player.y

        textInfo.setText('tank Y : '+parseInt(player.y) +' tank X : '+parseInt(player.x)+'\n'
        +'tank angle : '+ parseInt(player.angle)+'\n'+'turret angle : '+parseInt(turret.angle))

        if(this.input.keyboard.createCursorKeys().up.isDown){
            this.physics.velocityFromAngle(player.angle, 200, player.body.acceleration)
        }else{
            this.physics.velocityFromAngle(player.angle, 0, player.body.acceleration)
        }
    }
}

