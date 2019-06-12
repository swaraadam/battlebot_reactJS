import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Fab from '@material-ui/core/Fab'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import CodeIcon from '@material-ui/icons/Code'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'

import Toolbar from '@material-ui/core/Toolbar'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import CssBaseLine from '@material-ui/core/CssBaseline'
import {withStyles} from '@material-ui/core/CssBaseline'
import ChefronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChefronRightIcon from '@material-ui/icons/ChevronRight'

import Blockly from "./dev-index";
import consfigureStore from "./store/configureStore";
import TankManager from './TankManager'
import Game from "./Game";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                <div>
                    <div class="row" >
                        <div class="col-sm-10" style={{ height: 500 }}><Blockly /></div>

                        <div class="col-sm-2">
                        <Game />
                        <textarea id="code" style={{height: 200, width: 400}} value=""></textarea>
                        </div>
                    </div>
                </div>
                {/* </PersistGate> */}
            </Provider>
        );
    }
}

window.addEventListener('load', () => {
    const editor = React.createElement(App);
    ReactDOM.render(editor, document.getElementById('blockly'));
});