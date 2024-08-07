<script>
	import { authToken as jwtToken, isAuthenticated } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	let jwt = null;
	let neucronToken = '';
	let totalSupply = ''; // Initialize as an empty string for dynamic input
	let responseData = []; // To store response data
	let successMessage = '';
	let errorMessage = '';
	let showPopup = false;
	let successPopup = false;
	let popupmessage = '';

	const dispatch = createEventDispatcher();

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

	async function handleIssue(event) {
		event.preventDefault();

		try {
			console.log('Request Payload:', {
				neucron_token: neucronToken,
				totalSupply: Number(totalSupply)
			});

			const response = await axios.post(
				'https://coalition-loyalty-point-issuance-page.onrender.com/loyalty/issue/v2',
				{
					neucron_token: neucronToken,
					totalSupply: Number(totalSupply) // Convert totalSupply to a number
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`
					}
				}
			);

			console.log('Response Data:', response.data);

			// Handle the successful response
			responseData = response.data.issuedPoint ? [response.data.issuedPoint] : [];
			successMessage = 'Loyalty points issued successfully!';
			popupmessage = successMessage;
			errorMessage = '';
			showPopup = true;
			successPopup = true;
		} catch (error) {
			// Handle errors
			console.error('Error issuing loyalty points:', error);
			successMessage = '';
			showPopup = true;
			successPopup = false;
			popupmessage = 'Error issuing loyalty points. Please try again.';
			errorMessage = 'Error issuing loyalty points. Please try again.';
		}
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
			Loyalty Point Issuance
		</h2>
		{#if authenticated}
			<form on:submit={handleIssue} class="space-y-4 mt-8">
				<div>
					<label for="neucronToken" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Necuron Token
					</label>
					<input
						type="text"
						id="neucronToken"
						bind:value={neucronToken}
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Necuron Token"
						required
					/>
				</div>
				<div>
					<label for="totalSupply" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Total Supply
					</label>
					<input
						type="number"
						id="totalSupply"
						bind:value={totalSupply}
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Total Supply"
						required
					/>
				</div>
				<button
					type="submit"
					class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Issue Loyalty Points
				</button>
			</form>
			{#if successMessage}
				<p class="mt-4 text-green-500">{successMessage}</p>
			{/if}
			{#if errorMessage}
				<p class="mt-4 text-red-500">{errorMessage}</p>
			{/if}
			{#if responseData.length > 0}
				<table class="mt-4 min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead class="bg-gray-50 dark:bg-gray-800">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								ID
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Amount
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Date
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
						{#each responseData as data}
							<tr>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
									{data.issuedPointId}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{data.totalSupply}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{new Date(data.createdAt).toLocaleString()}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		{/if}
	</div>
</section>