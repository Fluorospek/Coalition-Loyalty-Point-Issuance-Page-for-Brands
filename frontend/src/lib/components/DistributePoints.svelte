<script>
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';
	import { authToken as jwtToken, isAuthenticated } from '$lib/api/api';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const dispatch = createEventDispatcher();

	let jwt = null;
	let accessToken = '';
	let recipientAddress = '';
	let amount = 0;
	let issuedPointId = 0;
	let responseDetails = [];
	let errorMessage = '';
	let successMessage = '';

	// Subscribe to token store
	jwtToken.subscribe((value) => {
		jwt = value;
	});

	let authenticated = false;

	// Subscribe to isAuthenticated store
	isAuthenticated.subscribe((value) => {
		authenticated = value;
	});

	onMount(() => {
		if (!authenticated) {
			goto('/login');
		}
	});

	function handleGoBack() {
		dispatch('goBackDistributePoints');
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const response = await axios.post('https://coalition-loyalty-point-issuance-page.onrender.com/loyalty/distribute', {
				access_token: accessToken,
				recipientAddress: recipientAddress,
				amount: amount,
				issuedPointId: issuedPointId
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});

			responseDetails = response.data.res.data.splited_assets_details || [];
			errorMessage = '';
			successMessage = 'Points distributed successfully!';
		} catch (error) {
			responseDetails = [];
			errorMessage = 'Error during distribution. Please check the inputs and try again.';
			successMessage = '';
			console.error('Error during distribution:', error);
		}
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-3xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
			Distribute Loyalty Points
		</h2>
		<form on:submit={handleSubmit} class="space-y-4">
			<div>
				<label for="recipientAddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
					Receiver's Address
				</label>
				<input
					type="text"
					id="recipientAddress"
					bind:value={recipientAddress}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Enter Receiver's Address"
					required
				/>
			</div>
			<div>
				<label for="accessToken" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
					Access Token
				</label>
				<input
					type="text"
					id="accessToken"
					bind:value={accessToken}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Access Token"
					required
				/>
			</div>
			<div>
				<label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
					Amount
				</label>
				<input
					type="number"
					id="amount"
					bind:value={amount}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Amount"
					required
				/>
			</div>
			<div>
				<label for="issuedPointId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
					Issued Point ID
				</label>
				<input
					type="number"
					id="issuedPointId"
					bind:value={issuedPointId}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Issued Point ID"
					required
				/>
			</div>
			<div class="w-full relative pt-6">
				<button
					on:click={handleGoBack}
					type="button"
					class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Go Back
				</button>
				<button
					type="submit"
					class="absolute right-0 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Distribute
				</button>
			</div>
		</form>
		{#if responseDetails.length > 0}
			<div class="mt-6 overflow-x-auto">
				<table class="min-w-full bg-white dark:bg-gray-800">
					<thead>
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Asset ID</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Tx ID</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Dest Paymail</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Asset Name</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Amount</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Log Status</th>
						</tr>
					</thead>
					<tbody>
						{#each responseDetails as detail}
							<tr>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{detail.AssetID}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{detail.TxID}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{recipientAddress}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{detail.AssetName}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{detail.Amount}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{detail['log-Status']}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
		{#if errorMessage}
			<p class="mt-4 text-red-500">{errorMessage}</p>
		{/if}
		{#if successMessage}
			<p class="mt-4 text-green-500">{successMessage}</p>
		{/if}
	</div>
</section>