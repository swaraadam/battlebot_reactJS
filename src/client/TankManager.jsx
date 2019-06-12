import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {setSelectedTankIndex, addTank} from './actions/home'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

const styles = theme => ({
    button:{
        margin: 5,
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    input:{
        display: none
    }
})

class TankManager extends React.Component{
    constructor(props){
        super(props)
    }

    addNewTank =(tanks) => {
        const nextTank = tanks.length +1
        const name = `tank${nextTank}`
        this.props.addTank({
            name,
            workspace: ['','',''],
            jsCode: ['','',''],
            key: name,
        })
    }

    render(){
        const {classes} = this.props
        return(
            <div 
                style={{
                    position: "fixed",
                    bottom: 0,
                    left:0,
                    right:0,
                    marginLeft:'auto',
                    marginRight:'auto',
                }}
            >
                <SwipeableDrawer
                    anchor="bottom"
                    open={this.props.down}
                    onClose={()=>this.props.setTankHandler(false)}
                    onOpen={()=>this.props.setTankHandler(true)}
                    style={{zIndex:10}}
                >
                    <div
                        style={{
                            width: '100%',
                            maxHeight: 300,
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            overflow: 'auto',
                            minHeight: 150,
                            // margin: 10,
                        }}
                    >
                        {
                            this.props.tanks && this.props.scenes.map(tank =>(
                                <div
                                    onClick = {() => {
                                        const promise = new Promise(( resolve, reject) =>{
                                            resolve(this.props.setSelectedTankIndex(tank.key))
                                        })
                                        promise.then((res)=>{
                                            Blockly.mainWorkspace.clear()
                                            if(tank.workspace[this.props.gameState] !== ''){
                                                const xml = Blockly.Xml.textToDom(tank.workspace[this.props.gameState])
                                                Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace)
                                            }
                                        })
                                        //this.props.setSelectedTankIndex(tank.key)
                                    }}
                                    style={{
                                        width:100,
                                        height: 100,
                                        margin: 5,
                                        backgroundColor: tank.key === this.props.setSelectedTankIndex ? 'yellow' : 'white',
                                        borderWidth: 3,
                                        borderStyle: 'solid',
                                        borderColor: 'black'
                                    }}
                                    alt = {tank.name}
                                />
                            ))
                        }
                        <Button
                            onClick={() => {
                                this.addNewTank(this.props.tanks);
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            +
                        </Button>
                    </div>
                </SwipeableDrawer>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedTank: state.home.selectedTank,
    tanks: state.home.tanks,
    selectedTankIndex: state.home.selectedTankIndex,
    gameState: state.home.gameState,
})

const mapDispatchToProps = {
    setSelectedTankIndex,
    addTank,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(TankManager))