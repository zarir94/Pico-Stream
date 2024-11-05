import { getLatestItems } from '$lib/tmdb_api.js';
import * as fs from "fs";

function writeJSON(name, obj) {
  return new Promise((resolve, reject)=>{
    try {  
      fs.writeFile(name, JSON.stringify(obj), ()=>{resolve()});
    } catch (err) {reject(err)}
  })
}

function readJSON(name) {
  return new Promise((resolve, reject)=>{
    try {
      fs.readFile(name, (err, data)=>{
        if (err) reject(err);
        resolve(JSON.parse(data));
      })
    } catch (err) {reject(err)}
  })
}

const data = {
	getMovies: async function (update = false) {
    if (!fs.existsSync('tmp/cachedMovies.json') || update) {
      console.log(`Fetching Data ${Math.round(Math.random() * 100000)}...`);
      let cachedMovies = await Promise.all([ getLatestItems('movie', 1), getLatestItems('movie', 2), getLatestItems('movie', 3) ]);
      cachedMovies = cachedMovies.flat();
      await writeJSON('tmp/cachedMovies.json', cachedMovies);
    }
    return await readJSON('tmp/cachedMovies.json');
  },
  getTVs: async function (update = false) {
    if (!fs.existsSync('tmp/cachedTVs.json') || update) {
      console.log(`Fetching Data ${Math.round(Math.random() * 100000)}...`);
      let cachedTVs = await Promise.all([ getLatestItems('tv', 1), getLatestItems('tv', 2), getLatestItems('tv', 3) ]);
      cachedTVs = cachedTVs.flat();
      await writeJSON('tmp/cachedTVs.json', cachedTVs);
    }
    return await readJSON('tmp/cachedTVs.json');
  },
};

export default data;