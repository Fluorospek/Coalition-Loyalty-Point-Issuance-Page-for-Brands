<script lang="ts">
	//example
	import { createEventDispatcher } from 'svelte';
	import DistributePoints from './DistributePoints.svelte';
	import Transactions from './Transactions.svelte';

	//we need to have loyalty point types and their data for loyalty points created
	let dataFromBackend = [
		{
			loyaltyPointName: 'Referal Token',
			Symbol: 'Symbol',
			issuedPoints: 67,
			totalPoints: 500
		}
	];
	let dispatch = createEventDispatcher();
	function handleDistribute() {
		dispatch('distributePoints');
	}
	function handleTransactionBtn() {
		dispatch('viewTransactions');
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Manage Your Loyalty Points
		</h2>
		<div class="">
			<h3 class="mb-4 text-xl tracking-tight font-bold text-left text-gray-900 dark:text-white">
				Issued Loyalty Points
			</h3>
			{#each dataFromBackend as data}
				<div class="relative w-full">
					<div class="flex justify-between">
						<h4 class="mb-2 text-lg tracking-tight text-left text-gray-900 dark:text-white">
							{data.loyaltyPointName}
						</h4>
						<h4 class="text-md tracking-tight text-right text-gray-900 dark:text-white">
							Issued : {data.issuedPoints} / {data.totalPoints}
						</h4>
					</div>
					<div class="mt-4">
						<button
							on:click={handleDistribute}
							class="py-2 mr-4 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							Distibute Points
						</button>
						<button
							on:click={handleTransactionBtn}
							class="py-2 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							View Transactions
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
