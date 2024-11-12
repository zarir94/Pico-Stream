<script>
	import Item from '$lib/design/item.svelte';
  export let data;
</script>
<svelte:head>
	<title>Pico Stream - A Simple Streaming Site</title>
</svelte:head>
<h1 class="title is-4" style="font-weight: 700;">Latest Movies</h1>
<div class="post-grid px-2">
	{#each data.movies as m}
		<Item id={m.id} type='movie' title={m.title} rating={m.rating} img={m.img} useflex={true}/>
	{/each}
</div>
<h1 class="title is-4" style="font-weight: 700;">Latest TV Series</h1>
<div class="post-grid px-2">
	{#each data.tvs as t}
		<Item id={t.id} type='tv' title={t.title} rating={t.rating} img={t.img} useflex={true}/>
	{/each}
</div>
<style>
	.post-grid {
		--gap: 0.75rem;
		--min-w: 9rem;
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);
	}
</style>