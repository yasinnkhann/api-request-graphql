const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		hello(name: String): String!
		getPerson(id: Int!): Person
	}

	type Planet {
		name: String
		rotation_period: String
		orbital_period: String
		films: [Film]
	}

	type Film {
		title: String
		episode_id: Int
		opening_crawl: String
		director: String
		producer: String
		release_date: String
	}

	type Person {
		name: String
		height: String
		mass: String
		hair_color: String
		skin_color: String
		eye_color: String
		birth_year: String
		gender: String
		homeworld: Planet
		films: [Film]
	}
`;

module.exports = { typeDefs };
