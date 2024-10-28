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
	let movies = r.results.map((i) => {return {
		id: i.id,
		title: i.title || i.name,
		img: 'https://image.tmdb.org/t/p/original/' + i.poster_path,
		rating: Math.round(i.vote_average * 10) / 10
	};})
	return movies;
}
