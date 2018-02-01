import axios from 'axios'

const URL = 'http://localhost:3000/tasks/'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&search=/${description}/` : ''
        const request = axios.get(`${URL}?${search}`)
            .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}))
    }
}

export const clear = () => {
    return [{type: 'TODO_CLEAR'}, search()]
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const changeStatus = (todo, new_status) => {
    return dispatch => {
        axios.put(`${URL}/${todo.uuid}`, { ...todo, done: new_status })
        .then(resp => dispatch(search()))
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo.uuid}`)
        .then(resp => dispatch(search()))
    }
}

