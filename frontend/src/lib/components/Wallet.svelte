<script>
	import { authToken as jwtToken, isAuthenticated } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	let jwt = null;
	let neucronEmail = '';
	let neucronPassword = '';
	let successMessage = '';
	let errorMessage = '';
	let neucronToken = '';
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

	async function handleNeucronLogin(event) {
		event.preventDefault();

		try {
			const response = await axios.post(
				'https://coalition-loyalty-point-issuance-page.onrender.com/auth/neucron-login',
				{
					email: neucronEmail,
					password: neucronPassword
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`
					}
				}
			);

			// Handle the successful response
			neucronToken = response.data.neucron_token;
			successMessage = 'Necuron login successful!';
			popupmessage = successMessage;
			errorMessage = '';
			showPopup = true;
			successPopup = true;

			console.log('Neucron token:', neucronToken);
		} catch (error) {
			// Handle errors
			console.error('Error during Necuron login:', error);
			successMessage = '';
			showPopup = true;
			successPopup = false;
			popupmessage = 'Error during Necuron login. Please check your credentials and try again.';
			errorMessage = 'Error during Necuron login. Please check your credentials and try again.';
		}
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
			Necuron SDK Wallet Login
		</h2>
		{#if authenticated}
			<form on:submit={handleNeucronLogin} class="space-y-4 mt-8">
				<div>
					<label for="neucronEmail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Necuron Email
					</label>
					<input
						type="email"
						id="neucronEmail"
						bind:value={neucronEmail}
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Necuron Email"
						required
					/>
				</div>
				<div>
					<label for="neucronPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Necuron Password
					</label>
					<input
						type="password"
						id="neucronPassword"
						bind:value={neucronPassword}
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Necuron Password"
						required
					/>
				</div>
				<button
					type="submit"
					class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					Necuron Login
				</button>
			</form>
			<p class="text-yellow-500 text-xl">Please Copy the Necuron Token Then go to the Loyality issue</p>
			{#if successMessage}
				<p class="mt-4 text-green-500">{successMessage}</p>
				<p class="mt-4 text-white w-4">Necuron Token: {neucronToken}</p>
			{/if}
			{#if errorMessage}
				<p class="mt-4 text-red-500">{errorMessage}</p>
			{/if}
		{/if}
	</div>
</section>