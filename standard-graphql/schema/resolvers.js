const resolveFilms = parent => {
	return Promise.all(
		parent.films.map(async filmUrl => {
			const res = await fetch(filmUrl);
			return await res.json();
		})
	);
};

const resolvers = {
	Planet: {
		films: resolveFilms,
	},
	Person: {
		homeworld: async parent => {
			const response = await fetch(parent.homeworld);
			return await response.json();
		},
		films: resolveFilms,
	},
	Query: {
		hello: (_parent, { name }) => `Hello ${name || 'World'}`,
		getPerson: async (_parent, { id }) => {
			const response = await fetch(`https://swapi.dev/api/people/${id}/`);
			return await response.json();
		},
	},
};

module.exports = { resolvers };

/*
API SHAPE for PERSON: 
{
	"name": "Luke Skywalker",
	"height": "172",
	"mass": "77",
	"hair_color": "blond",
	"skin_color": "fair",
	"eye_color": "blue",
	"birth_year": "19BBY",
	"gender": "male",
	"homeworld": "https://swapi.dev/api/planets/1/",
	"films": [
		"https://swapi.dev/api/films/1/",
		"https://swapi.dev/api/films/2/",
		"https://swapi.dev/api/films/3/",
		"https://swapi.dev/api/films/6/"
	],
}
*/
