<script>
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { coalitionToken as coalitionAuthToken } from '$lib/api/api';

	let tokenDetails = writable(null);
	let error = writable(null);
	let loading = writable(true);

	onMount(async () => {
		let coalitionToken;
		const unsubscribe = coalitionAuthToken.subscribe(value => {
			coalitionToken = value;
		});

		if (!coalitionToken) {
			goto('/coalition-login');
			return;
		}

		try {
			const response = await axios.get('https://coalition-loyalty-point-issuance-page.onrender.com/coalition/tokens', {
				headers: {
					'Authorization': `Bearer ${coalitionToken}`
				}
			});
			tokenDetails.set(response.data.data);
			error.set(null);
		} catch (err) {
			error.set('Failed to fetch data.');
			console.error('Error fetching data:', err);
		} finally {
			loading.set(false);
		}

		return () => {
			unsubscribe();
		};
	});
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-3xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
			Issued Token
		</h2>
		{#if $loading}
			<p>Loading...</p>
		{:else if $error}
			<p class="text-red-500">{$error}</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="min-w-full bg-white dark:bg-gray-800">
					<thead>
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Brand ID</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Brand Rep ID</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Brand Name</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Coalition Token</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Issued Point ID</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Asset ID</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Transaction ID</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Total Supply</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Total Issued</th>
						</tr>
					</thead>
					<tbody>
						{#each $tokenDetails.brands as brand}
							{#each brand.IssuedPoints as point}
								<tr>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{brand.brandId}</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{brand.brandRepId}</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{brand.brandName}</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Coalition Token</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{point.issuedPointId}</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{point.assetId}</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{point.transactionId}</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{point.totalSupply}</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{point.totalIssued}</td>
								</tr>
							{/each}
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</section>