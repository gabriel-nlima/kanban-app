import * as status from '../utils/status'

//Common functions
export const handleChange = (e, prevObj) => {
	const input = Object.assign({}, prevObj)
	input[e.target.name] = e.target.value
	return input
}

//tasks
export const handleStatusChange = (task, newStatus, editTask, deleteTask) => {
	task = {
		...task,
		status: newStatus,
		lastStatus: task.status,
	}

	if (newStatus === status.DELETED) deleteTask(task)
	else editTask(task)
}
