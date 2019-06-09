const queryProjectsTasks = (id) => [
	{
		$match: {
			_id: id,
		},
	},
	{
		$lookup: {
			from: 'tasks',
			localField: '_id',
			foreignField: 'project_id',
			as: 'tasks',
		},
	},
]

const queryProjects = [
	{
		$lookup: {
			from: 'tasks',
			localField: '_id',
			foreignField: 'project_id',
			as: 'tasks',
		},
	},
]

exports.queryProjectsTasks = queryProjectsTasks
exports.queryProjects = queryProjects
