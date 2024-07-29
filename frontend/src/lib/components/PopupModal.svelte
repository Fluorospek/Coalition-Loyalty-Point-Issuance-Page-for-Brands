<script lang="ts">
	import { onMount } from 'svelte';
	export let details = {
		success: Boolean,
		message: String
	};
	let noderef;
	function destroyThis() {
		if (noderef && noderef.parentNode) noderef.parentNode.removeChild(noderef);
	}
	onMount(() => {
		setTimeout(destroyThis, 3000);
	});
</script>

<div
	class="h-10 w-80 rounded-lg absolute bottom-20 right-10 text-center flex items-center justify-center border border-white bg-white bg-opacity-5"
	bind:this={noderef}
>
	{#if details.success}
		<p class="text-green-500">{details.message}</p>
	{:else}
		<p class="text-red-500">{details.message}</p>
	{/if}
</div>
