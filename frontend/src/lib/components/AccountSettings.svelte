<script lang="ts">
	//passed data
	let acntData = {
		name: 'testName',
		email: 'emailTest',
		brand: 'Brand Name Here'
	};
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-6 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Your Account Settings
		</h2>
		<!--<form method="post" action="?/main" class="space-y-4">-->
		<div class="space-y-4">
			<div>
				<label
					for="userName"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label
				>
				<input
					type="userName"
					id="userName"
					class="shadow-sm cursor-default bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Your Name"
					value={acntData.name}
					required
					readonly
				/>
			</div>
			<div>
				<label
					for="userEmail"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label
				>
				<input
					type="userEmail"
					id="userEmail"
					class="shadow-sm cursor-default bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Your Email"
					value={acntData.email}
					required
					readonly
				/>
			</div>
			<div>
				<label
					for="userBrand"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Brand</label
				>
				<input
					type="userBrand"
					id="userBrand"
					class="shadow-sm cursor-default bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Your Brand"
					value={acntData.brand}
					required
					readonly
				/>
			</div>
		</div>
		<!--</form>-->
	</div>
</section>
<!--
<button
				type="submit"
				class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Next</button
			>
-->
