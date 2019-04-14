exports.options = {
	routePrefix: '/documentation',
	exposeRoute: true,
	swagger: {
		info: {
			title: 'Fastify API do Quadro Kanban',
			description: 'Backend API do quadro kanban',
			version: '1.0.0',
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Mais informações aqui',
		},
		host: 'localhost',
		schemes: ['http', 'json'],
		consumes: ['application/json'],
		produces: ['application/json'],
		tags: [
			{ name: 'tasks', description: 'end-points de tarefas' },
			{ name: 'projects', description: 'end-points de projetos' },
		],
	},
}
