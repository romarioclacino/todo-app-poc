import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { changeStatus, remove } from './todoActions'

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || []

        return list.map(todo => (
            <tr key={todo.uuid}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' hide={todo.done}
                        onClick={() => props.changeStatus(todo, true)}></IconButton>
                    <IconButton style='warning' icon='undo' hide={!todo.done}
                        onClick={() => props.changeStatus(todo, false)}></IconButton>
                    <IconButton style='danger' icon='trash-o' hide={!todo.done}
                        onClick={() => props.remove(todo)}></IconButton>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'></th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch =>
    bindActionCreators({ changeStatus, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)