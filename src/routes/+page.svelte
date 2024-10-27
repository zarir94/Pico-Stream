<script>
	import Item from '$lib/design/item.svelte';
  export let data;
</script>
<svelte:head>
	<title>Pico Streams - A Simple Streaming Site</title>
</svelte:head>
<h1 class="title is-4">Latest Movies</h1>
<div class="grid is-col-min-6">
	{#each data.movies as m}
		<Item title={m.title} rating={m.rating} img={m.img}/>
	{/each}
</div>
<h1 class="title is-4">Latest TV Series</h1>
<div class="grid is-col-min-6">
	{#each data.tvs as t}
		<Item title={t.title} rating={t.rating} img={t.img}/>
	{/each}
</div>
