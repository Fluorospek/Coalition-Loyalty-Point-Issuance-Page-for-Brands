<script lang="ts">
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';
	import '../app.css';
	import PopupModal from '../lib/components/PopupModal.svelte';
</script>

<Header />
<div class="mt-16">
	<slot />
</div>

<Footer />
