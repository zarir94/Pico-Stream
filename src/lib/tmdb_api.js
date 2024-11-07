const Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU1ZGM0YWFlNmZhZGYzMTQ0OWU0ZTJmY2E1YTc0ZCIsIm5iZiI6MTcyOTU4MDgxOS4zMTI4MjksInN1YiI6IjY3MTc0ZTQyMTAxOTBkMjRhZjlhZWVmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kAinlwy8Vj5hpdP7RwJBdrd4lPJSdsHM8mYNNeRkjiU';
const res_headers = { Accept: 'application/json', Authorization: Authorization };

function getDateAgo(days=1) {
	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() - days);
	const year = currentDate.getFullYear();
	let month = currentDate.getMonth() + 1;
	let day = currentDate.getDate();
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	return `${year}-${month}-${day}`;
}

export async function getLatestItems(type = 'movie', page = 1) {
	`type is either 'movie' or 'tv'`;
	let yesterday = getDateAgo();
	let r = await fetch(
		`https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.desc&release_date.lte=${yesterday}&vote_average.gte=1&vote_count.gte=300`,
		{ method: 'GET', headers: res_headers }
	)
		.then((res) => res.json())
		.then((json) => json);
	let items = r.results.map((i) => {return {
		id: i.id,
		title: i.title || i.name,
		img: i.poster_path ? 'https://image.tmdb.org/t/p/original' + i.poster_path : null,
		rating: Math.round(i.vote_average * 10) / 10
	};})
	return items;
}

export async function getSearchItems(type = 'movie', page = 1, q = '') {
	`type is either 'movie' or 'tv'`;
	let today = getDateAgo(0);
	let r = await fetch(
		`https://api.themoviedb.org/3/search/${type}?include_adult=true&language=en-US&page=${page}&query=${q}`,
		{ method: 'GET', headers: res_headers }
	)
		.then((res) => res.json())
		.then((json) => json);
	let items = r.results.map((i) => {return {
		id: i.id,
		title: i.title || i.name,
		img: i.poster_path ? 'https://image.tmdb.org/t/p/original' + i.poster_path : null,
		rating: Math.round(i.vote_average * 10) / 10
	};})
	return items;
}

export async function getItem(type = 'movie', id = 1) {
	`type is either 'movie' or 'tv'`;
	let r = await fetch(
		`https://api.themoviedb.org/3/${type}/${parseInt(id)}?language=en-US`,
		{ method: 'GET', headers: res_headers }
	)
		.then((res) => res.json())
		.then((json) => json);
	if (r.status_code == 34) {return {error: 404}};
	let item = {
		id: r.id,
		imdb_id: r.imdb_id,
		bg_img: r.backdrop_path ? 'https://image.tmdb.org/t/p/original' + r.backdrop_path : null,
		img: r.poster_path ? 'https://image.tmdb.org/t/p/original' + r.poster_path : null,
		genres: r.genres.map((e) => e.name),
		desc: r.overview,
		release: r.release_date,
		tag: r.tagline,
		title: r.title || r.name,
		rating: Math.round(r.vote_average * 10) / 10
	};
	return item;
}
