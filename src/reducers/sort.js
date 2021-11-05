import * as types from './../constants/ActionTypes'
var initialState = {
    by: 'name',
    value: 1
}
const myReducer = (state = initialState, action) => {
    switch(action.type){
        case (types.SORT):
            state = action.sort
            console.log(state);
            return state;
        default: return state;
    }
}
export default myReducer;