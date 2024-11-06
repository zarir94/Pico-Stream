<script>
  export let data;
</script>
<svelte:head>
	<title>Watch {data.title} Free - Pico Stream</title>
</svelte:head>
<form>
<div class="box">
  <h3 class="title is-size-3">{data.title}</h3>
  <!-- sandbox="allow-scripts allow-same-origin" -->
  <iframe class="main-frame" src="{data.vidURL}" title="{data.title}" frameborder="0"></iframe>
  <div class="is-flex is-justify-content-center is-flex-wrap-wrap is-gap-2 my-4">
    {#each Object.entries(data.servers) as [name, i]}
      <button class="button is-medium {data.currentServer == name ? 'is-primary' : 'is-info'}" type="submit" name="server" value="{parseInt(i) + 1}">{name}</button>
    {/each}
  </div>
</div>
</form>
<style>
  .main-frame {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>