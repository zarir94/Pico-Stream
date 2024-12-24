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
<div class="block has-background-black-ter has-shadow py-4 px-3 is-rounded">
  <h3 class="title is-size-3">{data.title}</h3>
  <!-- sandbox="allow-scripts allow-same-origin" -->
  <div class="ar-fallback is-relative">
    {#if showisk}
    <div class="skeleton-block main-frame is-rounded" style="margin-bottom: 0px"></div>
    {:else}
    <iframe class="main-frame has-background-grey-darker is-rounded skeleton-block" style="margin-bottom: 0px;" on:load={function () {this.classList.remove('skeleton-block')}} src="{data.vidURL}" title="{data.title}" frameborder="0" allowfullscreen></iframe>
    {/if}
    <div class="ar-overflow {data.locked ? '' : 'is-hidden'}">
      <a class="button is-warning" href="{data.unlockURL}">Unlock to Watch</a>
    </div>
  </div>
  <h4 class="has-text-centered title is-4 my-4">Servers</h4>
  <div class="is-flex is-justify-content-center is-flex-wrap-wrap my-4">
    {#each Object.entries(data.servers) as [name, i]}
      <button on:click={submitForm} class="button is-dark m-1 is-medium {data.currentServer == name ? 'is-primary' : 'is-dark'}" {disabled} type="submit" name="server" value="{parseInt(i) + 1}">{name}</button>
    {/each}
  </div>
  {#if data.type == 'tv'}
    <h4 class="has-text-centered title is-4 my-4">Seasons</h4>
    <div class="is-flex is-justify-content-center is-flex-wrap-wrap my-4">
      {#each data.seasons as s}
      <button on:click={submitForm} class="button is-dark m-1 is-normal {data.currentSeason == s ? 'is-primary' : 'is-dark'}" {disabled} type="submit" name="s" value="{s}">{s}</button>
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
  .ar-fallback {
    position: relative;
    width: 100%;
    height: 0px;
    padding-bottom: calc(100% * (9 / 16));
  }
  .main-frame, .ar-overflow {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .ar-overflow { 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
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