import { getItem, getEpisodes } from "$lib/tmdb_api.js";
import { error } from "@sveltejs/kit";

function choice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const SERVERS = {
  'VidSrc': (id, type, s, e)=>{return `https://vidsrc.${choice(['me', 'in', 'pm', 'net', 'xyz', 'io'])}/embed/${type}/${id}` + (type == 'tv' ? `/${s}-${e}` : '')},
  '2Embed': (id, type, s, e)=>{return `https://www.2embed.${choice(['cc', 'skin'])}/embed${type == 'tv' ? 'tv' : ''}/${id}` + (type == 'tv' ? `&s=${s}&e=${e}` : '')},
  '2Stream': (id, type, s, e)=>{return `https://2embed.${choice(['stream', 'org'])}/embed/${type}/${id}` + (type == 'tv' ? `/${s}/${e}` : '')},
  'S-Stream': (id, type, s, e)=>{return `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=${id.startsWith('tt') ? 0 : 1}` + (type == 'tv' ? `&s=${s}&e=${e}`: '')},
  'MAPI': (id, type, s, e)=>{return `https://moviesapi.club/${type}/${id}` + (type == 'tv' ? `-${s}/${e}` : '')},
}

export async function load({params, url, cookies}) {
  let id = params.id;
  let type = params.type;
  if (['movie', 'tv'].indexOf(type)==-1) {error(404)};
  let item = await getItem(type, id);
  if (item.error) {error(item.error)};

  // PARAMS
  let server = url.searchParams.get('server');
  server = parseInt(server) ? parseInt(server) : 1; // do -1 to get list item.
  if (Object.keys(SERVERS).length < server || server < 1) {
    server = 1;
  }
  let s = url.searchParams.get('s');
  s = item.seasons.indexOf(parseInt(s)) != -1 ? parseInt(s) : 1;

  let episodes = [];
  let e = 1;
  if (type == 'tv') {
    episodes = await getEpisodes(item.id, s);
    e = url.searchParams.get('e');
    e = episodes.map(e => e.no).indexOf(parseInt(e)) != -1 ? parseInt(e) : 1;
  };

  // VIDEO URL
  let vidURL = SERVERS[Object.keys(SERVERS)[server - 1]]((item.imdb_id || item.id) + '', type, s, e);

  // ADD MORE DATA
  item.vidURL = vidURL;
  item.servers = Object.fromEntries(Object.entries({...Object.keys(SERVERS)}).map(([k, v]) => [v, k]));;
  item.currentServer = Object.keys(SERVERS)[server - 1];
  item.currentSeason = s;
  item.currentEpisode = e;
  item.episodes = episodes;

  item.locked = cookies.get('unlocked')!=1;
  let lastVisit = cookies.get('lv');
  let mainURL =
		lastVisit == 'nano'
			? 'https://teraboxlinks.com/st?api=7f05f9094eff8017cbf1b8fc129e1cf9de732631'
			: 'https://nanolinks.in/st?api=8beb2d34725e85743b60c738a745ac0e42cfa2b8';
  item.unlockURL = url.pathname + '/unlock';
  item.unlockURL = mainURL + '&url=' + url.origin + item.unlockURL;
  cookies.set('lv', mainURL.includes('nano') ? 'nano' : 'tera', { path: '/' });

  return item;
}

