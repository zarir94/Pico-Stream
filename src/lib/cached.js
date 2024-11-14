import { getLatestItems } from '$lib/tmdb_api.js';

const data = {
	getMovies: async function (updateData, getData, update = false) {
    let prevData = await getData('movies');
    if (!prevData || update) {
      console.log(`Fetching Data ${Math.round(Math.random() * 100000)}...`);
      let cachedMovies = await Promise.all([ getLatestItems('movie', 1), getLatestItems('movie', 2), getLatestItems('movie', 3) ]);
      cachedMovies = cachedMovies.flat();
      await updateData('movies', cachedMovies);
      return cachedMovies;
    }
    return prevData;
  },
  getTVs: async function (updateData, getData, update = false) {
    let prevData = await getData('tvs');
    if (!prevData || update) {
      console.log(`Fetching Data ${Math.round(Math.random() * 100000)}...`);
      let cachedTVs = await Promise.all([ getLatestItems('tv', 1), getLatestItems('tv', 2), getLatestItems('tv', 3) ]);
      cachedTVs = cachedTVs.flat();
      await updateData('tvs', cachedTVs);
      return cachedTVs;
    }
    return prevData;
  },
};

export default data;