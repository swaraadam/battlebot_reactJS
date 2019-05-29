import Phaser from 'phaser'
import GameplayScene from './scenes/gameplay'

import * as React from 'react'

export default class Game extends React.Component{
    componentDidMount(){
        const config ={
            type : Phaser.AUTO,
            width: 600,
            height : 600,
            backgroundColor : 0xeaf0f1,
            parent : "phaser-game",
            physics : {
                default : 'arcade',
                arcade :{
                    fps :60,
                    gravity: {y: 0},
                    debug: true
                }
            },
            scene : [GameplayScene]
        }

        new Phaser.Game(config)
    }

    shouldComponentUpdate(){
        return false
    }

    render(){
        return <div id="phaser-game"></div>
    }
}