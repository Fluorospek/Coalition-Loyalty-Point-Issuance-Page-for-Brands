<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { authToken } from '$lib/api/api';
	import { get } from 'svelte/store';
    import { createEventDispatcher } from 'svelte'; 
    let dispatch = createEventDispatcher();
	function handleDistribute() {
		dispatch('distributePoints');
	}
	function handleTransactionBtn() {
		dispatch('viewTransactions');
	} 
	let issuedPointsData = [];
	let errorMessage = null;
	let loading = true;

	async function fetchIssuedPoints() {
		try {
			const response = await axios.get('https://coalition-loyalty-point-issuance-page.onrender.com/loyalty/manage', {
				headers: {
					Authorization: `Bearer ${get(authToken)}`
				}
			});
			if (response.status === 200) {
				issuedPointsData = response.data.issuedPoints;
			} else {
				throw new Error('Failed to fetch issued points');
			}
		} catch (error) {
			errorMessage = 'Error fetching issued points: ' + error.message;
		}
		loading = false;
	}

	onMount(() => {
		fetchIssuedPoints();
	});
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Loyalty Point Management
		</h2>
		{#if loading}
			<p class="text-center text-gray-700 dark:text-gray-300">Loading...</p>
		{:else if errorMessage}
			<p class="text-center text-red-500">{errorMessage}</p>
		{:else}
			<div class="overflow-x-auto shadow-md rounded-lg">
				<table class="min-w-full bg-white dark:bg-gray-800">
					<thead>
						<tr>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
							>
								Field
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
							>
								Value
							</th>
						</tr>
					</thead>
					<tbody>
						{#each issuedPointsData as point}
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Issued Point ID
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{point.issuedPointId}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Brand Token ID
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{point.brandTokenId}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Asset ID
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{point.assetId}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Transaction ID
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{point.transactionId}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Total Supply
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{point.totalSupply}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Total Issued
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{point.totalIssued}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
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
	</div>
</section>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}
	th,
	td {
		padding: 12px;
		text-align: left;
	}
	th {
		background-color: #f2f2f2;
	}
	tr:nth-child(even) {
		background-color: #f9f9f9;
	}
	tr:hover {
		background-color: #f1f1f1;
	}
	.dark th {
		background-color: #444;
	}
	.dark tr:nth-child(even) {
		background-color: #555;
	}
	.dark tr:hover {
		background-color: #666;
	}
</style>
<!-- 

-->
<!-- -->
