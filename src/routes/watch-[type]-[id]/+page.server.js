import { getItem } from "$lib/tmdb_api.js";
import { Server, error } from "@sveltejs/kit";

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

export async function load({params, url}) {
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
  s = parseInt(s) ? parseInt(s) : 1;
  let e = url.searchParams.get('e');
  e = parseInt(e) ? parseInt(e) : 1;

  // VIDEO URL
  let vidURL = SERVERS[Object.keys(SERVERS)[server - 1]](item.imdb_id || item.id, type, s, e);

  // ADD MORE DATA
  item.vidURL = vidURL;
  item.servers = Object.fromEntries(Object.entries({...Object.keys(SERVERS)}).map(([k, v]) => [v, k]));;
  item.currentServer = Object.keys(SERVERS)[server - 1];

  return item;
}
