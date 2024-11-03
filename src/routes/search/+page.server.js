import { redirect } from '@sveltejs/kit';
import {getSearchItems} from '$lib/tmdb_api.js'

export async function load({ url }) {
	let q = url.searchParams.get('q');
  if (!q) {redirect(302, '/')}
  let pr_movies = [getSearchItems('movie', 1, q), getSearchItems('movie', 2, q)];
  let pr_tvs = [getSearchItems('tv', 1, q), getSearchItems('tv', 2, q)];
  let movies = (await Promise.all(pr_movies)).flat();
  let tvs = (await Promise.all(pr_tvs)).flat();
  return {
    movies: movies,
    tvs: tvs,
    q: q
  }
}
