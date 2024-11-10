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
<div class="post-grid px-2">
	{#each movies as m}
		<Item id={m.id} type="movie" title={m.title} rating={m.rating} img={m.img} empty={m.empty} useflex={true}/>
	{/each}
</div>
<h1 class="title is-4" style="font-weight: 700;">TV Series on "{data.q}"</h1>
<div class="post-grid px-2">
	{#each tvs as t}
		<Item id={t.id} type="tv" title={t.title} rating={t.rating} img={t.img} empty={t.empty} useflex={true}/>
	{/each}
</div>
<style>
	.post-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	/* Add --row for all */
	@supports (display: grid) {
		.post-grid {
			display: grid;
			gap: 0.75rem;
			grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
			grid-template-rows: auto;
		}
	}
</style>