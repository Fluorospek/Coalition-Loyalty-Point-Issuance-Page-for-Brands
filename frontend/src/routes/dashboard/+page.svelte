<script lang="ts">
	import BrandSetup from '../../lib/dashboard/BrandSetup.svelte';
	import Confirmation from '../../lib/dashboard/LoyaltyPointIssuance/Confirmation.svelte';
	import LoyaltyPointManagement from '../../lib/dashboard/LoyaltyPointManagement.svelte';
	import LoyaltyPointParameters from '../../lib/dashboard/LoyaltyPointIssuance/LoyaltyPointParameters.svelte';
	let mainContent = BrandSetup;
	let sidebarItems = [
		{
			title: 'Brand Profile Setup',
			component: BrandSetup
		},
		{
			title: 'Loyalty Point Issuance',
			component: LoyaltyPointParameters
		},
		{
			title: 'Loyalty Point Confirm',
			component: Confirmation
		},
		{
			title: 'Loyalty Point Management',
			component: LoyaltyPointManagement
		},
		{
			title: 'Account Settings',
			component: BrandSetup
		},
		{
			title: 'Logout',
			component: BrandSetup
		}
	];
</script>

<aside
	id="default-sidebar"
	class="fixed top-0 left-0 z-40 w-64 h-[400] transition-transform -translate-x-full sm:translate-x-0 pt-16"
	aria-label="Sidebar"
>
	<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
		<ul class="space-y-2 font-medium">
			{#each sidebarItems as { title, component }}
				<li>
					<button
						on:click={() => {
							mainContent = component;
						}}
						class="w-full text-left p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						{title}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</aside>

<div class="p-4 sm:ml-64">
	<svelte:component this={mainContent} />
</div>

<style>
	.active {
		@apply bg-gray-100;
	}
</style>
