import data from '$lib/cached.js';

export async function load(obj) {
	return {
		movies: await data.getMovies(),
		tvs: await data.getTVs(),
	};
}
