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
		--cols: 8;
		display: list-item;
		margin: 0 -10px;
		list-style: none;
		overflow: hidden;
	}
	@media screen and (min-width: 0px) {.post-grid {--cols: 1}}
	@media screen and (min-width: 463px) {.post-grid {--cols: 2}}
	@media screen and (min-width: 618px) {.post-grid {--cols: 3}}
	@media screen and (min-width: 775px) {.post-grid {--cols: 4}}
	@media screen and (min-width: 930px) {.post-grid {--cols: 5}}
	@media screen and (min-width: 1086px) {.post-grid {--cols: 6}}
	@media screen and (min-width: 1243px) {.post-grid {--cols: 7}}
</style>