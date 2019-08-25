const idSchema = {
	$id: 'idParam',
	type: 'object',
	properties: {
		id: { type: 'string' },
	},
	required: ['id'],
}
module.exports = idSchema
