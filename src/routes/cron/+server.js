import data from '$lib/cached.js';

export async function GET({ locals }) {
	let { updateData, getData } = locals;
	await Promise.all([
		data.getMovies(updateData, getData, true),
		data.getTVs(updateData, getData, true)
	]);
	console.log('Cron Finished!');
	return new Response(JSON.stringify({ success: true, msg: 'Job Done Successfully' }), {headers: {'Content-Type': 'application/json'}});
}
