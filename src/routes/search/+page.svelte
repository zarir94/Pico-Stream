<script>
	import Item from '$lib/design/item.svelte';
  export let data;
	$: movies = data.movies;
	$: tvs = data.tvs;
</script>
<svelte:head>
	<title>Results for "{data.q}" - Pico Stream</title>
</svelte:head>
<h1 class="title is-4" style="font-weight: 700;">Movies on "{data.q}"</h1>
<div class="grid is-col-min-6">
	{#each movies as m}
		<Item id={m.id} type="movie" title={m.title} rating={m.rating} img={m.img} empty={m.empty}/>
	{/each}
</div>
<h1 class="title is-4" style="font-weight: 700;">TV Series on "{data.q}"</h1>
<div class="grid is-col-min-6">
	{#each tvs as t}
		<Item id={t.id} type="tv" title={t.title} rating={t.rating} img={t.img} empty={t.empty}/>
	{/each}
</div>
