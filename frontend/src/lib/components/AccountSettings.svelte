<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import axios from 'axios';
	import { token, isAuthenticated } from '$lib/api/api';
	import { get } from 'svelte/store';

	let brandData = null;
	let userData = null;
	let errorMessage = null;
	let loading = true;
	const dispatch = createEventDispatcher();

	async function fetchBrandDetails() {
		try {
			const response = await axios.get('https://coalition-loyalty-point-issuance-page.onrender.com/brand/details', {
				headers: {
					Authorization: `Bearer ${get(token)}`
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
					Authorization: `Bearer ${get(token)}`
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

	onMount(async () => {
		if (get(isAuthenticated)) {
			try {
				await Promise.all([fetchBrandDetails(), fetchUserProfile()]);
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
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 dark:text-white bg-white dark:bg-gray-800 text-md"
								>
									Name
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 dark:border-gray-600 dark:text-white bg-white dark:bg-gray-800 text-md"
								>
									{userData.name}
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		{/if}
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
