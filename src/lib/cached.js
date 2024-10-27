import { getLatestItems } from '$lib/tmdb_api.js';

const data = {
	cachedMovies: null,
	cachedTV: null,
	getMovies: async function (update = false) {
    if (!data.cachedMovies || update) {
      data.cachedMovies = (await getLatestItems('movie', 1)).concat(await getLatestItems('movie', 2), await getLatestItems('movie', 3));
    }
    return data.cachedMovies;
  },
	getTVs: async function (update = false) {
    if (!data.cachedTV || update) {
      data.cachedTV = (await getLatestItems('tv', 1)).concat(await getLatestItems('tv', 2), await getLatestItems('tv', 3));
    }
    return data.cachedTV;
  },
};


export default data;