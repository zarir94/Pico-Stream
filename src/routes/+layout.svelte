<script>
  import '../bulma.css';
	import Footer from '../lib/design/footer.svelte';
	import Header from '../lib/design/header.svelte';
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  injectSpeedInsights()
</script>

<Header/>
<main class="container is-fullhd px-5 my-4">
  <slot></slot>
</main>
<Footer/>