import toolboxCategories from '../toolBox'

const initState = {
    listTanks: [],
    selectedTank: {},
    toolboxCategories,
    tanks: [{
        name: 'tank1', key: 'tank1', workspace: ['','',''], jsCode: ['','','']
    }],
    objectMenuOpen: { target: null },
    variableDialogOpen: '',
    selectedTankIndex: 'tank1'
}

const gameReducer = (state = initState, action) =>{
    console.log('Action : ', action)
    switch(action.type){
        case 'SELECT_TANK':
            return {...state,selectedTank:{file: action.selectedTank}}
        case 'SET_LIST_TANK':
            return{...state,listTanks:action.listTanks}
        case 'UPDATE_TOOL_BOX':{
            const toolboxCategories = state.toolboxCategories.map(category =>
                (category.name === 'Classes' ? {...category, categories: action.category}:category))
            return {...state, toolboxCategories}
        }
        case 'SET_OBJECT_MENU_STATE':
            return {...state, objectMenuOpen:{target:action.open}}
        case 'SET_VARIABLE_DIALOG_STATE':
            return { ...state, variableDialogOpen: action.open }
        case 'ADD_TANK':{
            const tanks = [...state.tanks, action.tank]
            return {...state, tanks}
        }
        case 'SET_TANK_INDEX':{
            return {...state, selectedTankIndex: action.index, selectedTankIndex: ''}
        }
        case 'UPDATE_WORKSPACE': {
            return { ...state, gameObjects: action.gameObjects };
        }
        case 'UPDATE_TANK_WORKSPACE': {
            return { ...state, tanks: action.tanks };
        }
        default:
            return state
    }
}
export default gameReducer