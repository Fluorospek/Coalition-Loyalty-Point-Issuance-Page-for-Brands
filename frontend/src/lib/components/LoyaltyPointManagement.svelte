<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { token as jwtToken, isAuthenticated } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	let jwt = null;
	let authenticated = false;
	let brandData = null;
	let errorMessage = '';
    let dispatch = createEventDispatcher();
	function handleDistribute() {
		dispatch('distributePoints');
	}
	function handleTransactionBtn() {
		dispatch('viewTransactions');
	}
	// Subscribe to token store
	jwtToken.subscribe((value) => {
		jwt = value;
	});

	// Subscribe to isAuthenticated store
	isAuthenticated.subscribe((value) => {
		authenticated = value;
	});

	onMount(() => {
		if (!authenticated) {
			goto('/login');
		} else {
			fetchBrandData();
		}
	});

	async function fetchBrandData() {
		try {
			const response = await axios.get('http://localhost:3000/loyalty/manage', {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			});
			brandData = response.data.brand;
		} catch (error) {
			console.error('Error fetching brand data:', error);
			errorMessage = 'Error fetching brand data. Please try again.';
		}
	}
</script>

<section class="bg-gray-900 text-white py-6 px-4 mx-auto max-w-screen-md">
	<div>
		<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
			Loyalty Point Management
		</h2>
		{#if authenticated}
			{#if brandData}
				<table class="w-full text-sm text-left text-blue-300">
					<thead class="text-xs uppercase bg-gray-800 text-blue-400">
						<tr>
							<th scope="col" class="px-6 py-3">Attribute</th>
							<th scope="col" class="px-6 py-3">Value</th>
						</tr>
					</thead>
					<tbody>
						<tr class="bg-gray-800 border-b border-gray-700">
							<td class="px-6 py-4">Brand Name</td>
							<td class="px-6 py-4">{brandData.brandName}</td>
						</tr>
						<tr class="bg-gray-800 border-b border-gray-700">
							<td class="px-6 py-4">Point Name</td>
							<td class="px-6 py-4">{brandData.BrandTokens.pointName}</td>
						</tr>
						<tr class="bg-gray-800 border-b border-gray-700">
							<td class="px-6 py-4">Symbol</td>
							<td class="px-6 py-4">{brandData.BrandTokens.symbol}</td>
						</tr>
						{#each brandData.BrandTokens.IssuedPoints as issuedPoint}
							<tr class="bg-gray-800 border-b border-gray-700">
								<td class="px-6 py-4">Total Supply</td>
								<td class="px-6 py-4">{issuedPoint.totalSupply}</td>
							</tr>
							<tr class="bg-gray-800 border-b border-gray-700">
								<td class="px-6 py-4">Transaction ID</td>
								<td class="px-6 py-4 break-words">{issuedPoint.transactionId}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<div class="mt-4">
					<button
						on:click={handleDistribute}
						class="py-2 mr-4 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						Distibute Points
					</button>
					<button
						on:click={handleTransactionBtn}
						class="py-2 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						View Transactions
					</button>
				</div>
			{:else if errorMessage}
				<p class="text-red-500">{errorMessage}</p>
			{/if}
		{:else}
			<p class="text-yellow-500 text-xl">You need to log in to view the brand data.</p>
		{/if}
	</div>
</section>

<style>
	.break-words {
		word-break: break-word;
	}
</style>
