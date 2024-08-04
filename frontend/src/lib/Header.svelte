<script>
	import { page } from '$app/stores';
	import { isAuthenticated, isCoalitionAuthenticated, logoutAuth, logoutCoalition } from '$lib/api/api';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let authenticated = false;
	let coalitionAuthenticated = false;

	onMount(() => {
		isAuthenticated.subscribe((value) => {
			authenticated = value;
		});
		isCoalitionAuthenticated.subscribe((value) => {
			coalitionAuthenticated = value;
		});
	});

	let navs = [
		{ title: 'Home', href: '/' },
		{ title: 'Login', href: '/login' },
		{ title: 'Register', href: '/register' },
		{ title: 'Coalition Login', href: '/coalition-login' },
		{ title: 'Coalition Register', href: '/coalition-register' },
	];

	$: {
		if (authenticated) {
			navs = [
				{ title: 'Home', href: '/' },
				{ title: 'Dashboard', href: '/dashboard' },
				{
					title: 'Logout',
					href: '/',
					action: () => {
						logoutAuth();
						goto('/');
					}
				}
			];
		} else {
			navs = [
				{ title: 'Home', href: '/' },
				{ title: 'Login', href: '/login' },
				{ title: 'Register', href: '/register' },
				{ title: 'Coalition Login', href: '/coalition-login' },
				{ title: 'Coalition Register', href: '/coalition-register' },
			];
		}

		if (coalitionAuthenticated) {
			navs = [
				{ title: 'Home', href: '/' },
				{ title: 'CoalitionDashboard', href: '/coalition' },
				{
					title: 'Logout',
					href: '/',
					action: () => {
						logoutCoalition();
						goto('/');
					}
				}
			];
		}
	}
</script>

<nav class="bg-white border-gray-200 dark:bg-blue-400 w-full fixed top-0 h-16 z-50">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
			<img src="https://tsoc.dev/TSoC_Favicon.svg" class="h-8" alt="TimeChain LOGO" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
				Coalition Loyalty Point Issuance
			</span>
		</a>
		<div class="hidden w-full md:block md:w-auto" id="navbar-default">
			<ul
				class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-blue-400 md:dark:bg-blue-400 dark:border-gray-700"
			>
				{#each navs as { title, href, action }}
					<li>
						<a {href} on:click={action} class:active={$page.route.id === href}>{title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

<style>
	.active {
		@apply bg-gray-100 dark:bg-gray-700;
	}
</style>
