//Common functions
export const handleChange = (e, prevObj) => {
	const input = Object.assign({}, prevObj)
	input[e.target.name] = e.target.value
	return input
}
