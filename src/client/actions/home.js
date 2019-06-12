import axios from 'axios'

export const selectTank = selectedTank =>({
    type: 'SELECT_TANK',
    selectedTank,
})

export const loadListTank = () => dispatch => axios.post('http://localhost:8080/api/loadListTank',{},{}).then((res)=>{
    dispatch({
        type: 'SET_LIST_TANK',
        listTanks: res.data,
    })
})

export const updateToolbox = category =>({
    type: 'UPDATE_TOOL_BOX',
    category,
})

export const setObjectMenuState = open => ({
    type: 'SET_OBJECT_MENU_STATE',
    open,
})

export const setVariableDialogState = open => ({
    type: 'SET_VARIABLE_DIALOG_STATE',
    open,
})

export const addTank = tank => dispatch =>
    axios.post('http://localhost:8080/api/createTank', tank, {}).then((res)=>{
        dispatch({
            type: 'ADD_TANK',
            tank,
        })
    })

export const setSelectedTankIndex = index => dispatch =>
    axios.post('http://localhost:8080/api/selectTank',{index},{}).then((res)=>{
        dispatch({
            type: 'SET_TANK_INDEX',
            index,
        })
    })

export const updateTankWorkspace = tanks => ({
    type: 'UPDATE_TANK_WORKSPACE',
    tanks,
})