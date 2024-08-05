<script>
	import { coalitionToken as jwtToken, isCoalitionAuthenticated } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import axios from 'axios';//isAuthenticated
	import { onMount } from 'svelte';
	import PopupModal from '../components/PopupModal.svelte';
	import { createEventDispatcher } from 'svelte';

	let jwt = null;
	let pointName = '';
	let symbol = '';
	let successMessage = '';
	let errorMessage = '';
	// Values for popup message
	let showPopup = false;
	let successPopup = false;
	let popupmessage = '';

	// Dispatch
	const dispatch = createEventDispatcher();

	// Subscribe to token store
	jwtToken.subscribe((value) => {
		jwt = value;
	});

	let authenticated = false;

	// Subscribe to isAuthenticated store
	isCoalitionAuthenticated.subscribe((value) => {
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
				'http://localhost:3000/loyalty/define',
				{
					pointName,
					symbol
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`
					}
				}
			);

			// Handle the successful response
			console.log('Loyalty point definition successful:', response.data);

			// Set success message
			successMessage = 'Loyalty point definition successful!';
			popupmessage = successMessage;
			errorMessage = '';
			showPopup = true;
			successPopup = true;

			dispatch('createPopup', { success: true, message: 'Loyalty point definition successful!' });

			// Optionally, redirect to the next page after a delay
			setTimeout(() => {
				goto('/coalition');
			}, 2000); // Redirect after 2 seconds
		} catch (error) {
			// Handle errors
			console.error('Error defining loyalty points:', error);
			showPopup = true;
			successPopup = false;
			dispatch('createPopup', {
				success: false,
				message: 'Error defining loyalty points. Please try again.'
			});
			errorMessage = 'Error defining loyalty points. Please try again.';
			successMessage = '';
			popupmessage = errorMessage;

			if (error.response && error.response.status === 401) {
				// If unauthorized, redirect to login
				goto('/coalition-login');
			}
		}
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
			Define Loyalty Points
		</h2>
		{#if authenticated}
			<form on:submit={handleSubmit} class="space-y-4">
				<div>
					<label for="pointName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Point Name
					</label>
					<input
						type="text"
						id="pointName"
						bind:value={pointName}
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Point Name"
						required
					/>
				</div>
				<div>
					<label for="symbol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Symbol
					</label>
					<input
						type="text"
						id="symbol"
						bind:value={symbol}
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Symbol"
						required
					/>
				</div>
				<button
					type="submit"
					class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Submit
				</button>
			</form>
			{#if successMessage}
				<p class="mt-4 text-green-500">{successMessage}</p>
			{/if}
			{#if errorMessage}
				<p class="mt-4 text-red-500">{errorMessage}</p>
			{/if}
		{/if}
        <p class="text-yellow-500 text-xl">Now Got To Login of Necuron SDK</p>
	</div>
</section>
