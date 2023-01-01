const { extendType, objectType, stringArg, intArg, nonNull } = require('nexus');

const resolveFilms = parent => {
	return Promise.all(
		parent.films.map(async filmUrl => {
			const res = await fetch(filmUrl);
			return await res.json();
		})
	);
};

exports.Film = objectType({
	name: 'Film',
	definition(t) {
		t.string('title');
		t.int('episode_id');
		t.string('opening_crawl');
		t.string('director');
		t.string('producer');
		t.string('release_date');
	},
});

exports.Planet = objectType({
	name: 'Planet',
	definition(t) {
		t.string('name');
		t.string('rotation_period');
		t.string('orbital_period');
		t.list.field('films', {
			type: 'Film',
			resolve: parent => resolveFilms(parent),
		});
	},
});

exports.Person = objectType({
	name: 'Person',
	definition(t) {
		t.string('name');
		t.string('height');
		t.string('mass');
		t.string('hair_color');
		t.string('skin_color');
		t.string('eye_color');
		t.string('birth_year');
		t.string('gender');
		t.field('homeworld', {
			type: 'Planet',
			async resolve(parent) {
				const response = await fetch(parent.homeworld);
				return await response.json();
			},
		});
		t.list.field('films', {
			type: 'Film',
			resolve: parent => resolveFilms(parent),
		});
	},
});

exports.Hello = extendType({
	type: 'Query',
	definition(t) {
		t.field('hello', {
			type: 'String',
			args: {
				name: stringArg(),
			},
			resolve(_parent, { name }) {
				return `Hello ${name || 'World'}`;
			},
		});
	},
});

exports.GetPerson = extendType({
	type: 'Query',
	definition(t) {
		t.field('getPerson', {
			type: 'Person',
			args: {
				id: nonNull(intArg()),
			},
			async resolve(_parent, { id }) {
				const response = await fetch(`https://swapi.dev/api/people/${id}/`);
				return await response.json();
			},
		});
	},
});

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
