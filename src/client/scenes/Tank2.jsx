import {foward, turn_right, turn_left} from '../HandleAttribute'
import {store} from '../store/configureStore'

export default class Tank2 extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 600;
        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 500;
        this.x = config.x;
        this.y = config.y;
        this.setDisplaySize(config.width, config.height)
        // set_x_to(this, 0)

        if (store.getState().gameObjects.length !== 0) { 
            console.log('abc')
            // console.log(store.getState())
            // var gameObjects = store.getState().gameObjects;
            // gameObjects.forEach(object => {
            //     eval(object.jsCode);
            // });

            // eval(store.getState().gameObjects[0].jsCode)
        }
    }
}