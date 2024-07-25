<script lang="ts">
	import '../app.css';
	import Footer from '../lib/Footer.svelte';
	import Header from '../lib/Header.svelte';
</script>

<Header />
<div class="mt-16">
	<slot />
</div>

<Footer />
