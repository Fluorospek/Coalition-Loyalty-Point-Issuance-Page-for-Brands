<script>
	// import {enhance} from '$app/forms';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { coalitionToken, isCoalitionAuthenticated } from '$lib/api/api';
	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleLogin(event) {
		event.preventDefault();
		loading = true;
		error = '';

		try {
			const response = await axios.post('https://coalition-loyalty-point-issuance-page.onrender.com/auth/coalition/login', {
				email,
				password
			});

			const { data } = response;
			coalitionToken.set(data.token);
			isCoalitionAuthenticated.set(true);
			goto('/coalition');
		} catch (err) {
			if (err.response && err.response.data) {
				error = err.response.data.message || 'Login failed';
			} else {
				error = 'An error occurred. Please try again.';
			}
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		// Redirect to dashboard if already authenticated
		isCoalitionAuthenticated.subscribe((value) => {
			if (value) {
				goto('/coalition');
			}
		});
	});
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 mt-10 mx-auto lg:py-0">
		<!--
		<a
			href="/home"
			class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<img class="w-8 h-8 mr-2" src="https://tsoc.dev/TSoC_Favicon.svg" alt="logo" />
			BLockChain
		</a>
		-->
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Welcome Coalition Login Form
				</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={handleLogin}>
					<!-- method="POST" action="?/login" use:enhance -->
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Your email</label
						>
						<input
							type="email"
							name="email"
							id="email"
							bind:value={email}
							class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="name@gmail.com"
							required=""
						/>
					</div>
					<div>
						<label
							for="password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label
						>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							bind:value={password}
							class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required=""
						/>
					</div>
					{#if error}
						<p style="color: red;">{error}</p>
					{/if}
					<button
						type="submit"
						class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>Sign in</button
					>
				</form>
			</div>
		</div>
	</div>
</section>
