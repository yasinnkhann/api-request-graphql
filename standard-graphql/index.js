const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type-defs');
const { resolvers } = require('./schema/resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

const port = process.env.PORT || 4000;

server.listen({ port }, () =>
	console.log(
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
	)
);
