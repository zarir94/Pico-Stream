<script>
  export let data;
  import { page } from '$app/stores';
  import { beforeNavigate, afterNavigate, goto } from "$app/navigation";

  let disabled = false;
  let showisk = false;
  beforeNavigate(()=>{
    disabled = true;
  })
  afterNavigate(()=>{
    disabled = false;
    showisk = false;
  })

  function submitForm() {
    let url = new URL($page.url.toString());
    if (this.tagName == 'BUTTON') {
      url.searchParams.set(this.name, this.value)
    }
    showisk = true;
    goto(url, {replaceState: true, noScroll: true, keepFocus: true});
  }
</script>
<svelte:head>
	<title>Watch {data.title} Free - Pico Stream</title>
</svelte:head>
<form on:submit|preventDefault={e=>e}>
<div class="block has-background-black-ter has-shadow p-5 is-rounded">
  <h3 class="title is-size-3">{data.title}</h3>
  <!-- sandbox="allow-scripts allow-same-origin" -->
  {#if showisk}
    <div class="skeleton-block main-frame is-rounded" style="margin-bottom: 0px;"></div>
  {:else}
    <iframe class="main-frame is-rounded skeleton-block" style="margin-bottom: 0px;" on:load={function () {this.classList.remove('skeleton-block')}} src="{data.vidURL}" title="{data.title}" frameborder="0"></iframe>
  {/if}
  <h4 class="has-text-centered title is-4 my-4">Servers</h4>
  <div class="is-flex is-justify-content-center is-flex-wrap-wrap is-gap-1 my-4">
    {#each Object.entries(data.servers) as [name, i]}
      <button on:click={submitForm} class="button is-dark is-medium {data.currentServer == name ? 'is-primary' : 'is-dark'}" {disabled} type="submit" name="server" value="{parseInt(i) + 1}">{name}</button>
    {/each}
  </div>
  {#if data.type == 'tv'}
    <h4 class="has-text-centered title is-4 my-4">Seasons</h4>
    <div class="is-flex is-justify-content-center is-flex-wrap-wrap is-gap-1 my-4">
      {#each data.seasons as s}
      <button on:click={submitForm} class="button is-dark is-normal {data.currentSeason == s ? 'is-primary' : 'is-dark'}" {disabled} type="submit" name="s" value="{s}">{s}</button>
      {/each}
    </div>
    <h4 class="has-text-centered title is-4 my-4">Episodes</h4>
    <div class="grid is-col-min-8">
      {#each data.episodes as e}
      <button on:click={submitForm} class="epi button is-dark is-normal {data.currentEpisode == e.no ? 'is-primary' : 'is-dark'}" {disabled} type="submit" name="e" value="{e.no}"><span>{e.no}. {e.name}</span></button>
      {/each}
    </div>
  {/if}
</div>
</form>
<style>
  .main-frame {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
  .is-rounded {
    border-radius: 10px;
  }
  button {
    border-radius: 7px;
  }
  button.epi span {
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>