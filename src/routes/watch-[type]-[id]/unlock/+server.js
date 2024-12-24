import { redirect } from '@sveltejs/kit';


export async function GET({ url, cookies }) {
  let path = url.pathname.replace('/unlock', '');
  cookies.set('unlocked', '1', { path: path, maxAge: 6 * 60 * 60 })
  redirect(302, path);
}