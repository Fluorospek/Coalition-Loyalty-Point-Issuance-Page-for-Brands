<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let LoyaltyParameters = {
		loyaltypointname: '',
		symbol: '',
		totalsupply: '',
		additionalfeatures: ''
	};
	const dispatch = createEventDispatcher();
	function handleParametersSubmit() {
		dispatch('loyaltypointparameters', LoyaltyParameters);
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Define Loyalty Point Parameters
		</h2>
		<form on:submit={handleParametersSubmit} class="space-y-4">
			<div>
				<label
					for="loyaltypointname"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Loyalty Point Name</label
				>
				<input
					type="text"
					id="loyaltypointname"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Enter Loyalty Point Name"
					bind:value={LoyaltyParameters.loyaltypointname}
					required
				/>
			</div>
			<div class="grid grid-flow-col">
				<div class="sm:col-span-2 w-full">
					<label
						for="symbol"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Symbol</label
					>
					<input
						type="text"
						id="symbol"
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Enter Symbol"
						required
						bind:value={LoyaltyParameters.symbol}
					/>
				</div>
				<div class="w-full">
					<label
						for="totalsupply"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>Total Supply</label
					>
					<input
						type="number"
						id="totalsupply"
						class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Enter Total Supply"
						min="1"
						bind:value={LoyaltyParameters.totalsupply}
						required
					/>
				</div>
			</div>
			<div>
				<label
					for="additionalfeatures"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Additional Features</label
				>
				<textarea
					id="additionalfeatures"
					rows="3"
					class="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					placeholder="Leave you brand descrition"
					bind:value={LoyaltyParameters.additionalfeatures}
				></textarea>
			</div>
			<button
				type="submit"
				class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Next</button
			>
		</form>
	</div>
</section>
