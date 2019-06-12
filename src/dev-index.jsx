/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactBlocklyComponent from './index';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Game from './Game';
import { connect } from "react-redux";
import {store} from './store/configureStore'
import { BUILD_GAME } from "./store/gameReducer";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class BlocklyPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
      gameObjects: [],
      slectedGameobjectIndex: 0,
    };
  }

  createFile=()=>{

  }

  componentDidMount = () => {
    this.setState({
      gameObjects:[
        {
          name:"Tank 1",
          // sprite: require("../public/assets/tank1.png"),
          workspace: "",
          jsCode: "",
          key:"0"
        },
        {
          name:"Tank 2",
          // sprite: require("../public/assets/tank2.png"),
          workspace: "",
          jsCode: "",
          key:"1"
        }
      ]
    })

    if (store.getState().gameObjects.length) {
      this.setState({gameObjects: store.getState().gameObjects})
    }
//Custom Block

    Blockly.Blocks['move_right'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("turn right");
        this.appendValueInput("shouldMove")
            .setCheck("Boolean")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("move?");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    
    Blockly.Blocks['move_left'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("turn left");
          this.appendValueInput("shouldMove")
              .setCheck("Boolean")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField("move?");
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(330);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
    
    
    Blockly.Blocks['forward'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("forward");
          this.setOutput(true, "Boolean");
          this.setColour(330);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };

      Blockly.Blocks['collider_sensor'] = {
        init: function() {
          this.appendDummyInput()
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField("is collide with")
              .appendField(new Blockly.FieldDropdown([["wall","WALL"], ["enemy","ENEMY"], ["obstacle","OBSTACLE"]]), "NAME");
          this.setOutput(true, null);
          this.setColour(15);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };

      Blockly.Blocks['sight_sensor'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("is tank sight")
              .appendField(new Blockly.FieldDropdown([["wall","WALL"], ["enemy","ENEMY"], ["obstacle","OBSTACLE"]]), "NAME");
          this.setOutput(true, null);
          this.setColour(15);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
/////////////////////////
      Blockly.Blocks['motion_foward'] = {
        init: function() {
          this.appendValueInput("DISTANCE")
              .setCheck("Number")
              .appendField("foward");
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour(150);
          this.setTooltip('');
          this.setHelpUrl('http://www.example.com/');
        }
      };
  
      Blockly.Blocks['motion_turn_right'] = {
        init: function() {
          this.appendValueInput("DEGREES")
              .setCheck("Number")
              .appendField("turn right");
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour(150);
          this.setTooltip('');
          this.setHelpUrl('http://www.example.com/');
        }
      };
  
      Blockly.Blocks['motion_turn_left'] = {
        init: function() {
          this.appendValueInput("DEGREES")
              .setCheck("Number")
              .appendField("turn left");
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour(150);
          this.setTooltip('');
          this.setHelpUrl('http://www.example.com/');
        }
      };

    window.setTimeout(() => {
      this.setState({
        toolboxCategories: this.state.toolboxCategories.concat([
          {
            name: 'Tank Attribute',
            colour: 330,
            blocks: [
              {type: 'move_right'},
              {type: 'move_left'},
              {type: 'forward'}
            ],
          },
          {
            name: 'Tank Sensing',
            colour: 15,
            blocks: [
              {type: 'collider_sensor'},
              {type: 'sight_sensor'}
            ],
          },
          {
            name: 'Motion Tank',
            colour: 150,
            blocks: [
              { type: 'motion_foward' },
              { type: 'motion_turn_right'},
              { type: 'motion_turn_left' },
            ],
          },
        ]),
      });

      Blockly.JavaScript['move_right'] = function(block) {
        var shouldMove = Blockly.JavaScript.valueToCode(block, 'shouldMove', Blockly.JavaScript.ORDER_ATOMIC);
        x = Boolean(shouldMove);
        var code = 'goRightBlock(' + x + ');\n';
        return code;
      };

      Blockly.JavaScript['move_left'] = function(block) {
        var shouldMove = Blockly.JavaScript.valueToCode(block, 'shouldMove', Blockly.JavaScript.ORDER_ATOMIC);
        x = Boolean(shouldMove);
        var code = 'goLeftBlock(' + x + ');\n';
        return code;
      };

      Blockly.JavaScript['forward'] = function(block) {
        var code = true;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };

      Blockly.JavaScript['collider_sensor'] = function(block) {
        var dropdown_name = block.getFieldValue('NAME');
        // TODO: Assemble JavaScript into code variable.
        var code = '...';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      
      Blockly.JavaScript['sight_sensor'] = function(block) {
        var dropdown_name = block.getFieldValue('NAME');
        // TODO: Assemble JavaScript into code variable.
        var code = '...';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
      };

////////////////////////////////////////
      Blockly.JavaScript['motion_foward'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DISTANCE',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'foward('+argument0+');\n';
        return code;
      };
      Blockly.JavaScript['motion_turn_right'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DEGREES',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'turn_right('+argument0+');\n';
        return code;
      };

      Blockly.JavaScript['motion_turn_left'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DEGREES',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'turn_left('+argument0+');\n';
        return code;
      };

    }, 20);
  }

  workspaceDidChange = (workspace) => {
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const newCode = Blockly.JavaScript.workspaceToCode(workspace)
    let currentGameobject = this.state.gameObjects[this.state.slectedGameobjectIndex];
    currentGameobject.workspace = newXml;
    currentGameobject.jsCode = newCode

    let gameObjects = this.state.gameObjects;
    gameObjects[this.state.slectedGameobjectIndex] = currentGameobject;

    this.setState({ gameObjects: gameObjects })
    // document.getElementById('generated-xml').innerText = newXml;

    document.getElementById('code').value = newCode
  }


  render() {
    const { classes } = this.props;
    return (
      <div style={{height: 500}}>
        <Button onClick={() => {
          // this.setState({ xml: this.state.object1Xml })
          this.createFile()
          store.dispatch({type: BUILD_GAME, gameObjects: this.state.gameObjects})
        }} 
          variant="contained" color="primary" 
          className={classes.button}>Build and Run
        </Button>
        <ReactBlocklyComponent.BlocklyEditor
          toolboxCategories={this.state.toolboxCategories}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: '#ccc',
              snap: true,
            },
          }}
          // initialXml={this.state.object1Xml}
          initialXml={store.getState().gameObjects.length ? 
            store.getState().gameObjects[this.state.slectedGameobjectIndex].workspace :
            null
          }

          wrapperDivClassName="fill-height"
          workspaceDidChange={this.workspaceDidChange}
        />
        <div style={{ borderWidth: 3, borderColor: "black", width: 80, height: 65, backgroundColor: "cyan", margin: 10 }}>
          {this.state.gameObjects.map((gameObject) => {
            // const thumbnail = require('./public/assets/ghost.png');
            return (
              <img
                src={gameObject.sprite}
                onClick={() => {
                  this.setState({ slectedGameobjectIndex: gameObject.key })
                  console.log(this.state.slectedGameobjectIndex)
                  Blockly.mainWorkspace.clear();
                  if (gameObject.workspace !== '') {
                    console.log('loaded')
                    var xml = Blockly.Xml.textToDom(gameObject.workspace);
                    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                  }
                }}
                style={{ width: 100, height: 100, margin: 5, backgroundColor: gameObject.key == this.state.slectedGameobjectIndex ? "yellow" : "white", borderWidth: 3, borderRadius: 20 }}
                alt={gameObject.name} />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ showUi }) => ({
  showUi
});

export default connect(mapStateToProps)(withStyles(styles)(BlocklyPart))
