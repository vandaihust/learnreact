import * as types from './../constants/ActionTypes'
var initialState = {
    name: '',
    status: -1
}
const myReducer = (state = initialState, action) => {
    switch(action.type){
        case (types.FILTER_TABLE):
            state.name = action.filter.name;
            state.status = parseInt(action.filter.status); 
            return state;
        default: return state;
    }
}
export default myReducer;