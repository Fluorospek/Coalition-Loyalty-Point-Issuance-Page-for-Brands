<script>
	import { authToken as jwtToken, isAuthenticated } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import PopupModal from './PopupModal.svelte';
	import { createEventDispatcher } from 'svelte';

	let jwt = null;
	let coalitionId='';
	let brandName = '';
	let description = '';
	let successMessage = '';
	let errorMessage = '';
	//Values for popup message
	let showPopup = false;
	let successPopup = false;
	let popupmessage = '';

	//dispatch
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

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const response = await axios.post(
				'https://coalition-loyalty-point-issuance-page.onrender.com/brand/setup',
				{
					coalitionId: Number(coalitionId),
					brandName,
					description
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`
					}
				}
			);

			// Handle the successful response
			console.log('Brand setup successful:', response.data);

			// Set success message

			successMessage = 'Brand setup successful!';
			popupmessage = successMessage;
			errorMessage = '';
			showPopup = true;
			successPopup = true;

			dispatch('createPopup', { success: true, message: 'Brand setup successful!' });

			// Optionally, redirect to the next page after a delay
			setTimeout(() => {
				goto('/dashboard');
			}, 2000); // Redirect after 2 seconds
		} catch (error) {
			// Handle errors
			console.error('Error setting up brand:', error);
			showPopup = true;
			successPopup = false;
			dispatch('createPopup', {
				success: false,
				message: 'Error setting up brand. Please try again.'
			});
			errorMessage = 'Error setting up brand. Please try again.';
			successMessage = '';
			popupmessage = errorMessage;

			if (error.response && error.response.status === 401) {
				// If unauthorized, redirect to login
				goto('/login');
			}
		}
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Set Up Your Brand Profile
		</h2>
		{#if authenticated}
			<form on:submit={handleSubmit} class="space-y-4">
				<div>
					<label
						for="coalitionId"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Coalition Id
					</label>
					<input
						type="Number"
						id="coalitionId"
						bind:value={coalitionId}
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Your Brand Name"
						required
					/>
				</div>
				<div>
					<label
						for="brandName"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Brand Name
					</label>
					<input
						type="text"
						id="brandName"
						bind:value={brandName}
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Your Brand Name"
						required
					/>
				</div>
				<div class="sm:col-span-2">
					<label
						for="brandDescription"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
					>
						Brand Description
					</label>
					<textarea
						id="brandDescription"
						bind:value={description}
						rows="6"
						class="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Leave your brand description"
					></textarea>
				</div>
				<div>
					<label
						for="otherDetails"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Other Details
					</label>
					<input
						type="text"
						id="otherDetails"
						class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Other details"
					/>
				</div>
				<button
					type="submit"
					class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Next
				</button>
			</form>
			<!--
			{#if successMessage}
				<p class="mt-4 text-green-500">{successMessage}</p>
			{/if}
			{#if errorMessage}
				<p class="mt-4 text-red-500">{errorMessage}</p>
			{/if}
			-->
		{/if}
		<p class="text-yellow-500 text-xl">Go to the Loyalty Define Page After Creation of Brand</p>
	</div>
</section>
