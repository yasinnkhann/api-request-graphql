const {
	extendType,
	objectType,
	arg,
	intArg,
	stringArg,
	nonNull,
} = require('nexus');

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
		t.field('homeworld', { type: 'Planet' });
		t.list.field('films', {
			type: 'Film',
			resolve: parent => resolveFilms(parent),
		});
	},
});

exports.Query = objectType({
	name: 'Query',
	definition(t) {
		t.field('hello', {
			type: 'String',
			args: {
				name: stringArg(),
			},
			resolve(_parent, { name }) {
				return `hello ${name ?? 'world'}`;
			},
		});
	},
});
