import * as types from '../constants/ActionTypes'

var data = JSON.parse(localStorage.getItem('tasks'))
var initialState = data ? data : [];
var findById = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) result = index;
    })
    return result;
}
var myReducer = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var statusBoolean = false;
            if (typeof (action.task.status) === 'string') {
                if (action.task.status === 'true') statusBoolean = true;
                else statusBoolean = false;
            } else {
                statusBoolean = action.task.status;
            }
            var newTask = {
                id: Math.floor(Math.random() * 100) + 1,
                txtName: action.task.txtName,
                status: statusBoolean
            }
            if (action.task.id === '') {
                state.push(newTask);
            } else {
                index = findById(state, action.task.id);
                action.task.status = statusBoolean;
                state[index] = action.task;
                console.log(state[index]);                
            }
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];
        case types.UPDATE_STATUS_TASK:
            index = findById(state, action.id);
            state[index].status = !state[index].status;
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]
        case types.DELETE_TASK:
            index = findById(state, action.id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]

        default:
            return state;
    }
}
export default myReducer;