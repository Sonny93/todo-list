import React from 'react';

const Task = ({ task, showMoreCallback, deleteCallback, finishCallback }) => 
    <li className={task.isFinish === true ? 'task finish' : 'task ongoing'} data-value={task.id} onClick={showMoreCallback}>
        <div>{task.name}</div>
        <div className='controls'>
            {task.isFinish === false ? <div className='red'>Not completed</div> : <div className='green'>Completed</div> }
        </div>
    </li>

export default Task;