import data from '$lib/cached.js';

export async function load({ locals }) {
	let { updateData, getData } = locals;
	let [movies, tvs] = await Promise.all([data.getMovies(updateData, getData), data.getTVs(updateData, getData)]);
	return {
		movies: movies,
		tvs: tvs,
	};
}
