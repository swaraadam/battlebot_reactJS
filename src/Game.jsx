import Phaser from 'phaser'
import GameplayScene from './scenes/gameplay'

import * as React from 'react'

export default class Game extends React.Component{
    constructor(props){
        super(props)
    }

    state ={
        gameobjects : []
    }

    config = {
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

    componentDidMount(){
        console.log(this.props)

        const game = new Phaser.Game(this.config)
    }

    // shouldComponentUpdate(){
    //     return false
    // }

    render(){
        console.log(this.props)
        return <div id="phaser-game" gameObjects={this.props.gameObjects}></div>
    }
}