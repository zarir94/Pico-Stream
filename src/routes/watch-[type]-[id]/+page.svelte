<script>
  export let data;
  import { page } from '$app/stores';
  import { beforeNavigate, afterNavigate, goto } from "$app/navigation";

  let disabled = false;
  beforeNavigate(()=>{
    disabled = true;
  })
  afterNavigate(()=>{
    disabled = false;
  })

  function submitForm() {
    let url = new URL($page.url.toString());
    if (this.tagName == 'BUTTON') {
      url.searchParams.set(this.name, this.value)
    }
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
  <iframe class="main-frame is-rounded" src="{data.vidURL}" title="{data.title}" frameborder="0"></iframe>
  <h4 class="has-text-centered title is-4 my-4">Choose any server</h4>
  <div class="is-flex is-justify-content-center is-flex-wrap-wrap is-gap-2 my-4">
    {#each Object.entries(data.servers) as [name, i]}
      <button on:click={submitForm} class="button is-dark is-medium {data.currentServer == name ? 'is-primary' : 'is-info'}" {disabled} type="submit" name="server" value="{parseInt(i) + 1}">{name}</button>
    {/each}
  </div>
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
</style>