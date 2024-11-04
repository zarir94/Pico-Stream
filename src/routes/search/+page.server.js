import { redirect } from '@sveltejs/kit';
import { getSearchItems } from '$lib/tmdb_api.js'

export async function load({ url }) {
	let q = url.searchParams.get('q');
  if (!q) {redirect(302, '/')}
  let pr_movies = [getSearchItems('movie', 1, q), getSearchItems('movie', 2, q)];
  let pr_tvs = [getSearchItems('tv', 1, q), getSearchItems('tv', 2, q)];
  let movies = (await Promise.all(pr_movies)).flat();
  let tvs = (await Promise.all(pr_tvs)).flat();
  let empty = {id: null, title: null, img: null, rating: null, empty: true};
  let empties = Array.from({length: 10}, ()=>empty);
  if (movies.length < 10 && movies.length != 0) movies.push(...empties);
  if (tvs.length < 10 && tvs.length != 0) tvs.push(...empties);
  return {
    movies: movies,
    tvs: tvs,
    q: q
  }
}
