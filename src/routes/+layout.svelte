<script>
  import '../bulma.css';
	import Header from '../lib/design/header.svelte';
</script>

<Header/>
<main class="container is-fullhd px-5 my-3">
  <slot></slot>
</main>
