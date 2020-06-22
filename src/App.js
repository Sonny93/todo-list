import React from 'react';
import './App.css';
import './Modal.css';

import TodoForm from './Components/TodoForm';
import Task from './Components/Task';
import Modal from './Components/Modal';

class App extends React.Component {
	state = {
		todoList: [],
		newTodo: {
			name: '',
			description: ''
		},
		showMore: false
	}

	handleSubmit = (event) => {
		if (event)
			event.preventDefault();

		const { newTodo } = this.state;
		if (newTodo.name === '' || newTodo.description === '')
			return;

		const list = cloneArray(this.state.todoList);
		list.push({
			id: new Date().getTime(),
			name: this.state.newTodo.name,
			description: this.state.newTodo.description,
			isFinish: false
		});
		this.setState({
			todoList: list,
			newTodo: { name: '', description: '' }
		});
	}

	handleDelete = id => {
		const list = cloneArray(this.state.todoList);
		list.splice(list.findIndex(todo => todo.id === id), 1);

		this.handleClearShowMore();
		this.setState({ todoList: list });
	}

	handleFinish = (id) => {
		const list = cloneArray(this.state.todoList);
		list[list.findIndex(todo => todo.id === id)].isFinish = true;

		this.setState({ todoList: list });
	}

	handleChangeName = event => {
		const data = this.state.newTodo;

		data.name = event.currentTarget.value;
		this.setState({ newTodo: { name: data.name, description: data.description } });
	}

	handleChangeDescription = event => {
		const data = this.state.newTodo;

		data.description = event.currentTarget.value;
		this.setState({ newTodo: { name: data.name, description: data.description } });
	}

	handleShowMore = event => {
		if (!event.target.classList.contains('task'))
			return;

		this.setState({ showMore: event.target.dataset.value });
	}

	handleClearShowMore = () => this.setState({ showMore: false });

	render() {
		return (
			<div className="App">
				<div className='header-todo'>
					<h1>todo list</h1>
					<i>{this.state.todoList.length < 1 ?
							'There is no task' : 
						this.state.todoList.filter(t => t.isFinish === true).length === this.state.todoList.length ? 
							'All tasks are completed' :
						`${this.state.todoList.filter(t => t.isFinish === true).length} / ${this.state.todoList.length} tasks completed`}</i>
				</div>
				<ul className='todolist'>
					{this.state.todoList.length < 1 ? 
						<li className='li-noitem'>There is no task</li> : 
					this.state.todoList.map((task, index) => (
						<Task key={index} task={task} showMoreCallback={this.handleShowMore} deleteCallback={this.handleDelete} finishCallback={this.handleFinish} />
					))}
				</ul>
				<TodoForm submitCallback={this.handleSubmit} changeNameCallback={this.handleChangeName} changeDescCallback={this.handleChangeDescription} stateProps={this.state} />
				<button onClick={() => {
					this.setState({ newTodo: { name: makeid(50), description: makeid(50000) } });
					setTimeout(this.handleSubmit, 1);
				}}>Random Task</button>
				{this.state.showMore !== false ? 
				<Modal 
					clearCallback={this.handleClearShowMore}
					task={this.state.todoList.filter(i => i.id === parseInt(this.state.showMore))[0]}
					deleteCallback={this.handleDelete}
					finishCallback={this.handleFinish}
				/> : 
				null}
			</div>
		);
	}
}

export default App;

function makeid(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++)
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	return result;
}

function cloneArray(array) {
	return [...array];
}