<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { authToken as jwtToken, isAuthenticated } from '$lib/api/api';
	import { goto } from '$app/navigation';

	let jwt = null;
	let authenticated = false;
	let transactions = [];
	let pointName = '';
	let symbol = '';
	let errorMessage = '';

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
			fetchTransactions();
		}
	});

	async function fetchTransactions() {
		try {
			const response = await axios.get('https://coalition-loyalty-point-issuance-page.onrender.com/loyalty/transactions', {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			});
			const data = response.data;
			pointName = data.pointName;
			symbol = data.symbol;
			transactions = data.transactions;
		} catch (error) {
			console.error('Error fetching transactions:', error);
			errorMessage = 'Error fetching transactions. Please try again.';
		}
	}
</script>

<section class="bg-gray-900 text-white py-6 px-4 mx-auto max-w-screen-md">
	<div>
		<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-blue-500">
			Transaction Data
		</h2>
		{#if authenticated}
			{#if transactions.length > 0}
				<table class="w-full text-sm text-left text-blue-300">
					<thead class="text-xs uppercase bg-gray-800 text-blue-400">
						<tr>
							<th scope="col" class="px-6 py-3">Asset ID</th>
							<th scope="col" class="px-6 py-3">Transaction ID</th>
							<th scope="col" class="px-6 py-3">Point Name</th>
							<th scope="col" class="px-6 py-3">Symbol</th>
						</tr>
					</thead>
					<tbody>
						{#each transactions as transaction}
							<tr class="bg-gray-800 border-b border-gray-700">
								<td class="px-6 py-4">{transaction.assetId}</td>
								<td class="px-6 py-4 break-words">{transaction.transactionId}</td>
								<td class="px-6 py-4">{pointName}</td>
								<td class="px-6 py-4">{symbol}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else if errorMessage}
				<p class="text-red-500">{errorMessage}</p>
			{/if}
		{:else}
			<p class="text-yellow-500 text-xl">You need to log in to view the transaction data.</p>
		{/if}
	</div>
</section>

<style>
	.break-words {
		word-break: break-word;
	}
</style>