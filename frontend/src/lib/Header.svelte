<script>
	import { page } from '$app/stores';

	console.log($page.route.id);
	let navs = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Login',
			href: '/login'
		},
		{
			title: 'Register',
			href: '/register'
		},
		{
			title: 'Dashboard',
			href: '/dashboard'
		},
		{
			title: 'Logout',
			href: '/'
		}
	];
</script>

<nav class="bg-white border-gray-200 dark:bg-blue-400 w-full fixed top-0 h-16 z-50">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
			<img src="https://tsoc.dev/TSoC_Favicon.svg" class="h-8" alt="Flowbite Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
				>BlockChain</span
			>
		</a>
		<div class="hidden w-full md:block md:w-auto" id="navbar-default">
			<ul
				class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-blue-400 md:dark:bg-blue-400 dark:border-gray-700"
			>
				{#each navs as { title, href }}
					<li>
						<a {href} class="nonactive" class:active={$page.route.id === href}>{title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

<style>
	.nonactive {
		@apply block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-900 hover:md:dark:text-white;
	}
	.active {
		@apply text-white dark:text-white md:dark:text-white;
	}
</style>
