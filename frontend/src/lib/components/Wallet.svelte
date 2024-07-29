<script>
	import { token as jwtToken, isAuthenticated } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let neucronEmail = '';
	let neucronPassword = '';
	let successMessage = '';
	let errorMessage = '';
	let neucronToken = '';

	// Subscribe to token store
	jwtToken.subscribe((value) => {
		// Assuming we are using JWT to check authentication
		if (value) {
			goto('/dashboard');
		}
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

	async function handleLogin(event) {
		event.preventDefault();

		try {
			const response = await axios.post('http://localhost:3000/auth/neucron-login', {
				email: neucronEmail,
				password: neucronPassword
			});

			// Handle the successful response
			neucronToken = response.data.neucron_token;
			successMessage = 'Login successful!';
			errorMessage = '';
			console.log('Neucron token:', neucronToken);

			// Optionally, redirect to the next page after a delay
			setTimeout(() => {
				goto('/dashboard');
			}, 5 * 60 * 1000); // Redirect after 2 seconds
		} catch (error) {
			// Handle errors
			console.error('Error during login:', error);
			successMessage = '';
			errorMessage = 'Error during login. Please check your credentials and try again.';
		}
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
			Neucron Wallet Login
		</h2>
		<form on:submit={handleLogin} class="space-y-4">
			<div>
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
					Email
				</label>
				<input
					type="email"
					id="email"
					bind:value={neucronEmail}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Your email"
					required
				/>
			</div>
			<div>
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
					Password
				</label>
				<input
					type="password"
					id="password"
					bind:value={neucronPassword}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Your password"
					required
				/>
			</div>
			<button
				type="submit"
				class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
			>
				Login
			</button>
		</form>
		{#if neucronToken}
			<h3 class="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">Neucron Token:</h3>
			<p class="mt-4 break-all text-sm text-gray-900 dark:text-white">{neucronToken}</p>
		{/if}
		{#if successMessage}
			<p class="mt-4 text-green-500">{successMessage}</p>
		{/if}
		{#if errorMessage}
			<p class="mt-4 text-red-500">{errorMessage}</p>
		{/if}
	</div>
</section>
