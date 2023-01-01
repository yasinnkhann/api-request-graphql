const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

const server = new ApolloServer({
	schema,
});

const port = process.env.PORT || 4000;

server.listen({ port }, () =>
	console.log(
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
	)
);
