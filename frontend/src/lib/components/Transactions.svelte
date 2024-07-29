<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let transactionData = [
		{
			receiver: 'hsihsiu@hsidha.com',
			date: '12-09-2024',
			transactionLink: 'asdfihsdfihiashfihfsifsihf'
		},
		{
			receiver: 'dsfkjskajwejhsidha.com',
			date: '11-09-2024',
			transactionLink: 'ihsdfihiashfihfsifsihf'
		}
	];
	const dispatch = createEventDispatcher();
	function handleGoback() {
		dispatch('goBackTransaction');
	}
</script>

<div class="overflow-hidden p-4 mt-4 mx-auto shadow-xl backdrop-blur-lg h-90 w-full">
	<div class="flex items-center justify-between mb-4">
		<div class="space-y-1 w-full">
			<h2 class="relative text-xl tracking-tight w-full text-gray-900 dark:text-white">
				Recent Transactions
			</h2>
		</div>
	</div>
	<div
		class="divide-y divide-gray-900/5 relative border rounded-md p-4 border-opacity-10 bg-slate-900 border-slate-100 mb-4"
	>
		<div
			class="grid grid-flow-col grid-cols-12 grid-rows-1 bg-slate-700 place-items-center h-8 text-gray-900 dark:text-slate-300"
		>
			<p class="col-span-1">S.No</p>
			<p class="col-span-6">Recepent</p>
			<p class="col-span-3">Date</p>
			<p class="col-span-2">Details</p>
		</div>
		<div class="overflow-y-scroll h-60 max-h-60">
			{#each transactionData as transaction, i}
				<div
					class="grid grid-cols-12 gap-6 gap-y-96 my-2 py-1 border-b-2 justify-center text-center bg-slate-800"
				>
					<p class="font-sm leading-none col-span-1 text-gray-900 dark:text-slate-300">{i + 1}</p>
					<p class="font-sm leading-none col-span-6 text-gray-900 dark:text-slate-300">
						{transaction.receiver}
					</p>
					<p class="font-sm leading-none col-span-3 text-gray-900 dark:text-slate-300">
						{transaction.date}
					</p>
					<button class="col-span-2 px-5 text-sm text-center text-white underline"
						><a href={transaction.transactionLink} target="_blank" rel="noopener noreferrer">View</a
						>
					</button>
				</div>
			{/each}
		</div>
	</div>
	<div class="w-full relative">
		<button
			on:click={handleGoback}
			class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
			>Go Back</button
		>
	</div>
</div>
<!-- <script>
	import { writable } from 'svelte/store';
	import { token, isAuthenticated } from '../api/api';
	import { login, fetchTokens } from '../api/wallet';
	import { onMount } from 'svelte';
  
	let tokens = writable([]);
	let error = writable(null);
	let loginError = writable(null);
  
	// Default credentials
	const email = 'agarwal8789@gmail.com';
	const password = 'Ganna@123';
  
	async function handleLogin() {
	  try {
		const neucronToken = await login(email, password);
		token.set(neucronToken);
		// Fetch tokens after successful login
		const fetchedTokens = await fetchTokens(neucronToken);
		tokens.set(fetchedTokens);
	  } catch (err) {
		loginError.set(err.message);
	  }
	}
  
	onMount(() => {
	  if (!$isAuthenticated) {
		handleLogin();
	  } else {
		// Fetch tokens if already authenticated
		fetchTokens($token)
		  .then(fetchedTokens => tokens.set(fetchedTokens))
		  .catch(err => error.set(err.message));
	  }
	});
  </script>
  
  {#if $loginError}
	<p class="error">Login Error: {$loginError}</p>
  {:else if !$isAuthenticated}
	<p>Logging in automatically...</p>
  {:else}
	{#if $error}
	  <p class="error">Error fetching tokens: {$error}</p>
	{:else}
	  <table>
		<thead>
		  <tr>
			<th>Address</th>
			<th>Redeem Address</th>
			<th>Symbol</th>
			<th>Transaction ID</th>
			<th>Index</th>
			<th>Amount</th>
		  </tr>
		</thead>
		<tbody>
		  {#each $tokens as token}
			{#each token.utxos as utxo}
			  <tr>
				<td>{token.address}</td>
				<td>{utxo.redeemAddr}</td>
				<td>{utxo.symbol}</td>
				<td>{utxo.txid}</td>
				<td>{utxo.index}</td>
				<td>{utxo.amount}</td>
			  </tr>
			{/each}
		  {/each}
		</tbody>
	  </table>
	{/if}
  {/if}
  
  <style>
	table {
	  width: 100%;
	  border-collapse: collapse;
	}
	th, td {
	  border: 1px solid #ddd;
	  padding: 8px;
	}
	th {
	  background-color: #f2f2f2;
	  text-align: left;
	}
	.error {
	  color: red;
	}
  </style> -->