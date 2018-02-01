import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3000/tasks/'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }
        
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&search=${description}/` : ''
        axios.get(`${URL}?${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value })
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo.uuid}`, { ...todo, done: true })
          .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo.uuid}`, { ...todo, done: false })
          .then(resp => this.refresh(this.state.description))
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo.uuid}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleClear() {
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm />
                <TodoList />
            </div>
        )
    }
}
