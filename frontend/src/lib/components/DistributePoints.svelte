<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function handleGoback() {
		dispatch('goBackDistributePoints');
	}
</script>
<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-3xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
			Distribute Loyalty Points
		</h2>
		<form class="space-y-4">
			<div>
				<label
					for="paymail"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Receiver's Address
				</label>
				<input
					type="text"
					id="paymail"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Enter Receiver's Paymail"
					required
				/>
			</div>

			<div>
				<label for="note" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Custom Message</label
				>
				<textarea
					id="note"
					rows="3"
					class="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					placeholder="Leave you brand descrition"
				></textarea>
			</div>
			<div class="w-full">
				<label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Points</label
				>
				<input
					type="number"
					id="amount"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Enter Distributing Points"
					min="1"
					required
				/>
			</div>

			<div class="w-full relative pt-6">
				<button
					on:click={handleGoback}
					class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>Go Back</button
				>
				<button
					type="submit"
					class="absolute right-0 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>Distribute</button
				>
			</div>
		</form>
	</div>
</section>
