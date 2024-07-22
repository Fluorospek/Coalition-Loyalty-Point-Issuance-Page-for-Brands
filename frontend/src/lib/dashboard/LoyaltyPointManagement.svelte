<script lang="ts">
	//example
	//we need to have loyalty point types and their data for loyalty points created
	let dataFromBackend = [
		{
			loyaltyPointName: 'Referal Token',
			Symbol: 'Symbol',
			issuedPoints: 67,
			totalPoints: 500
		}
	];
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Manage Your Loyalty Points
		</h2>
		<div class="rounded-md p-4 border-opacity-10 bg-slate-800">
			<h3 class="mb-4 text-2xl tracking-tight font-bold text-left text-gray-900 dark:text-white">
				Issued Loyalty Points
			</h3>
			{#each dataFromBackend as data}
				<div
					class="relative border rounded-md p-4 border-opacity-10 bg-slate-900 border-slate-100 m-2"
				>
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
							class="py-2 mr-4 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							Distibute Points
						</button>
						<button
							class="py-2 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							View Transactions
						</button>
					</div>
					<div>
						<div class="pointsDistribute"></div>
						<div class="transactions flex">
							<p class="text-md tracking-tight text-left text-gray-900 dark:text-white">
								Transaction1 wfihwihweihewihe
							</p>
							<p class="text-md tracking-tight text-left text-gray-900 dark:text-white">Amount</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
<!--
<button
				type="submit"
				class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Next</button
			>
                	<form action="#" class="space-y-4">
			<div>
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Brand Name</label
				>
				<input
					type="email"
					id="email"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="You Brand name"
					required
				/>
			</div>
			<div class="sm:col-span-2">
				<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
					>Brand Description</label
				>
				<textarea
					id="message"
					rows="6"
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					placeholder="Leave you brand descrition"
				></textarea>
			</div>
			<div>
				<label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Other Details</label
				>
				<input
					type="text"
					id="subject"
					class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="other details"
					required
				/>
			</div>
		</form>
-->
