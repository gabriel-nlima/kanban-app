import * as status from '../utils/status'

//Common functions
/**
 * Assign the value of the event to prevObj's property in event.target.name
 * @param {event} e the event object
 * @param {object} prevObj The source object from which to copy properties.
 * @returns {object} the new object
 */
export const handleChange = (e, prevObj) => {
	const input = Object.assign({}, prevObj)
	input[e.target.name] = e.target.value
	return input
}

/**
 * Checks if a object key exists and is not empty
 * @param {object} obj the object
 * @param {string} requiredField the property of object to inspect
 */
export const isInvalid = (obj, requiredField) => {
	return !obj[requiredField] || obj[requiredField].length === 0
}

//tasks
/**
 * Handles the change of task's status
 * @param {object} task the task
 * @param {string} newStatus the new status
 * @param {function} editTask the edit task function to call
 * @param {function} deleteTask the delete task function, will be called if the new status is DELETED
 * @returns {void}
 */
export const handleStatusChange = (task, newStatus, editTask, deleteTask) => {
	task = {
		...task,
		status: newStatus,
		lastStatus: task.status,
	}

	if (newStatus === status.DELETED) deleteTask(task)
	else editTask(task)
}
