<script>
	import { onMount } from 'svelte';
	import { authToken, isAuthenticated } from '$lib/api/api';
	import { goto } from '$app/navigation';

	let authenticated = false;

	// Check authentication on mount
	onMount(() => {
		isAuthenticated.subscribe((value) => {
			authenticated = value;
			if (!authenticated) {
				goto('/login');
			}
		});
	});

	import BrandSetup from '../../../lib/components/BrandSetup.svelte';
	import LoyaltyPointParameters from '../../../lib/components/LoyaltyPointParameters.svelte';
	import LoyaltyPointManagement from '../../../lib/components/LoyaltyPointManagement.svelte';
	import Confirmation from '../../../lib/components/Confirmation.svelte';
	import AccountSettings from '../../../lib/components/AccountSettings.svelte';
	import Transactions from '../../../lib/components/Transactions.svelte';
	import DistributePoints from '../../../lib/components/DistributePoints.svelte';
	import PopupModal from '../../../lib/components/PopupModal.svelte';
	import Wallet from '../../../lib/components/Wallet.svelte';
	
	let mainContent = BrandSetup;

	let sidebarItems = [
		{
			title: 'Brand Profile Setup',
			component: BrandSetup,
			visible: true
		},
		{
			title: 'Wallet Signin',
			component: Wallet,
			visible: true
		},
		{
			title: 'Loyalty Point Issuance',
			component: LoyaltyPointParameters,
			visible: true
		},
		{
			title: 'Loyalty Point Management',
			component: LoyaltyPointManagement,
			visible: true
		},
		{
			title: 'Account Settings',
			component: AccountSettings,
			visible: true
		}
	];

	function handleViewTransactions() {
		mainContent = Transactions;
	}
	function handleTransactionGoBack() {
		mainContent = LoyaltyPointManagement;
	}
	function handleViewDistributePoints() {
		mainContent = DistributePoints;
	}
	function handleDistributeGoBack() {
		mainContent = LoyaltyPointManagement;
	}
	function handleLoyaltyParameter() {
		mainContent = Confirmation;
	}
	function handleLoyaltyPointConfirmationBack() {
		mainContent = LoyaltyPointParameters;
	}
	function handleCreatePopup(event) {
		const details = event.detail;
		const modal = new PopupModal({
			target: document.body,
			props: {
				details: {
					success: details.success,
					message: details.message
				}
			}
		});
	}
</script>

{#if authenticated}
	<aside
		id="default-sidebar"
		class="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 pt-16"
		aria-label="Sidebar"
	>
		<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
			<ul class="space-y-2 font-medium">
				{#each sidebarItems.filter((item) => item.visible) as { title, component }}
					<li>
						<button
							on:click={() => {
								mainContent = component;
							}}
							class:active={mainContent === component}
							class="w-full text-left p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							{title}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</aside>

	<div class="p-4 sm:ml-64" id="dashboard-main">
		<svelte:component
			this={mainContent}
			on:viewTransactions={handleViewTransactions}
			on:goBackTransaction={handleTransactionGoBack}
			on:goBackDistributePoints={handleDistributeGoBack}
			on:distributePoints={handleViewDistributePoints}
			on:loyaltypointparameters={handleLoyaltyParameter}
			on:LoyaltyPointConfirmationGoBack={handleLoyaltyPointConfirmationBack}
			on:createPopup={handleCreatePopup}
		/>
	</div>
{/if}

<style>
	.active {
		@apply bg-gray-100 dark:bg-gray-700;
	}
</style>
