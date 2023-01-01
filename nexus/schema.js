const { makeSchema } = require('nexus');
const path = require('path');
const types = require('./types');

const schema = makeSchema({
	types,
	outputs: {
		typegen: path.join(
			process.cwd(),
			'generated',
			'nexus-typegen',
			'index.d.ts'
		),
		schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
	},
});

module.exports = schema;
