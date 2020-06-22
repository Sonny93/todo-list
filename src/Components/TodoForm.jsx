import React from 'react';

function TodoForm({ submitCallback, changeNameCallback, changeDescCallback, stateProps }) {
	return (
		<form onSubmit={submitCallback}>
			<input type="text" placeholder="Task name" onChange={changeNameCallback} value={stateProps.newTodo.name} />
			<input type="text" placeholder="Description of task" onChange={changeDescCallback} value={stateProps.newTodo.description} />
			<button disabled={!stateProps.newTodo.name || !stateProps.newTodo.description}>Ajouter</button>
		</form>
	);
}

export default TodoForm;