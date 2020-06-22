import React from 'react';
import MicroModal from 'micromodal';

MicroModal.init({
	closeTrigger: 'data-custom-close',
	openClass: 'is-open',
	disableScroll: true,
	disableFocus: false,
	awaitOpenAnimation: false,
	awaitCloseAnimation: false,
	debugMode: false
});

const Modal = ({ task, clearCallback, deleteCallback, finishCallback }) => {
	setTimeout(() => MicroModal.show('modal-1', { onClose: modal => clearCallback() }), 10);
	return (
		<div className="modal" id="modal-1" aria-hidden="true">
			<div tabIndex="-1" data-micromodal-close>
				<div role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
					<header>
						<h2 title={task.name} id="modal-1-title">{task.name}</h2>
						<button aria-label="Close modal" data-micromodal-close>Close</button>
					</header>
					<div className='status'>{task.isFinish ? 'Task completed' : 'Task not completed'}</div>
					<div className="modal-content">{task.description}</div>
					<div className="controls">
						{task.isFinish ? <div className='green'>Completed task</div> : <button className="finish" onClick={() => finishCallback(task.id)}>Complete</button>}
						<button className="delete" onClick={() => deleteCallback(task.id)}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal;