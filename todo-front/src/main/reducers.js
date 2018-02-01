import { combineReducers } from 'redux'
import totoReducer from '../todo/todoReducer'
import todoReducer from '../todo/todoReducer';

const rootReducer = combineReducers({
    todo: todoReducer
})

export default rootReducer