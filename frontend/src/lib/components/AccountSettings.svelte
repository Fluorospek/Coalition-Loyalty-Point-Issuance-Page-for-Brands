<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import axios from 'axios';
	import { authToken, isAuthenticated } from '$lib/api/api';
	import { get } from 'svelte/store';

	let brandData = null;
	let userData = null;
	let coalitionData = null;
	let brandTokenData = null; // Add this line
	let errorMessage = null;
	let loading = true;
	const dispatch = createEventDispatcher();

	async function fetchBrandDetails() {
		try {
			const response = await axios.get('https://coalition-loyalty-point-issuance-page.onrender.com/brand/details', {
				headers: {
					Authorization: `Bearer ${get(authToken)}`
				}
			});
			if (response.status === 200) {
				brandData = response.data.data;
				dispatch('brandExists');
			} else {
				throw new Error('Failed to fetch brand details');
			}
		} catch (error) {
			throw new Error('Error fetching brand details: ' + error.message);
		}
	}

	async function fetchUserProfile() {
		try {
			const response = await axios.get('https://coalition-loyalty-point-issuance-page.onrender.com/user/profile', {
				headers: {
					Authorization: `Bearer ${get(authToken)}`
				}
			});
			if (response.status === 200) {
				userData = response.data;
			} else {
				throw new Error('Failed to fetch user profile');
			}
		} catch (error) {
			throw new Error('Error fetching user profile: ' + error.message);
		}
	}

	async function fetchCoalitionDetails() {
		try {
			const response = await axios.get('https://coalition-loyalty-point-issuance-page.onrender.com/brand/coalition/details', {
				headers: {
					Authorization: `Bearer ${get(authToken)}`
				}
			});
			if (response.status === 200) {
				coalitionData = response.data.data;
			} else {
				throw new Error('Failed to fetch coalition details');
			}
		} catch (error) {
			throw new Error('Error fetching coalition details: ' + error.message);
		}
	}

	async function fetchBrandTokenDetails() {
		try {
			const response = await axios.get('https://coalition-loyalty-point-issuance-page.onrender.com/loyalty/brand-token', {
				headers: {
					Authorization: `Bearer ${get(authToken)}`
				}
			});
			if (response.status === 200) {
				brandTokenData = response.data.brandToken;
			} else {
				throw new Error('Failed to fetch brand token details');
			}
		} catch (error) {
			throw new Error('Error fetching brand token details: ' + error.message);
		}
	}

	onMount(async () => {
		if (get(isAuthenticated)) {
			try {
				await Promise.all([
					fetchBrandDetails(),
					fetchUserProfile(),
					fetchCoalitionDetails(),
					fetchBrandTokenDetails() // Add this line
				]);
			} catch (error) {
				errorMessage = error.message;
			}
		} else {
			errorMessage = 'You are not authenticated';
		}
		loading = false;
	});
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Account Settings
		</h2>
		{#if loading}
			<p class="text-center text-gray-700 dark:text-gray-300">Loading...</p>
		{:else if errorMessage}
			<p class="text-center text-red-500">{errorMessage}</p>
		{:else}
			<div class="overflow-x-auto shadow-md rounded-lg mb-6">
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
						{#if brandData}
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Brand ID
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{brandData.brandId}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Brand Name
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{brandData.brandName}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Description
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{brandData.description}
								</td>
							</tr>
						{/if}
						{#if userData}
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Email
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{userData.email}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Name
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{userData.name}
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
			<h3 class="mb-4 text-xl tracking-tight font-semibold text-center text-gray-900 dark:text-white">Coalition Details</h3>
			<div class="overflow-x-auto shadow-md rounded-lg mb-6">
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
						{#if coalitionData}
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Coalition ID
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{coalitionData.coalitionId}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Coalition Name
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{coalitionData.name}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Description
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{coalitionData.description}
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
			<h3 class="mb-4 text-xl tracking-tight font-semibold text-center text-gray-900 dark:text-white">Brand Token Details</h3>
			<div class="overflow-x-auto shadow-md rounded-lg mb-6">
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
						{#if brandTokenData}
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Token ID
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{brandTokenData.brandTokenId}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Token Name
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{brandTokenData.pointName}
								</td>
							</tr>
							<tr class="hover:bg-gray-100 dark:hover:bg-gray-600">
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									Symbol
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:text-white dark:bg-gray-800 text-md"
								>
									{brandTokenData.symbol}
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</section>