import { getItem } from "$lib/tmdb_api.js";
import { error } from "@sveltejs/kit";


export async function load({params}) {
  let id = params.id;
  let type = params.type;
  if (['movie', 'tv'].indexOf(type)==-1) {error(404)};
  let item = await getItem(type, id);
  if (item.error) {error(item.error)};
  return item;
}
