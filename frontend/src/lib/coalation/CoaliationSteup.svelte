<script>
    import { coalitionToken, isCoalitionAuthenticated } from '$lib/api/api'; // Correct the import statement if needed
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let coalitionjwt = null;
    let coalitionName = '';
    let description = '';
    let successMessage = '';
    let errorMessage = '';

    // Dispatch
    const dispatch = createEventDispatcher();

    // Subscribe to token store
    coalitionToken.subscribe((value) => {
        coalitionjwt = value;
    });

    let authenticated = false;

    // Subscribe to isAuthenticated store
    isCoalitionAuthenticated.subscribe((value) => {
        authenticated = value;
    });

    onMount(() => {
        if (!authenticated) {
            goto('/coalition-login');
        }
    });

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3000/coalition/setup',
                {
                    coalitionName,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${coalitionjwt}`
                    }
                }
            );

            // Handle the successful response
            console.log('Coalition setup successful:', response.data);

            // Set success message
            successMessage = 'Coalition setup successful!';
            errorMessage = '';

            // Optionally, redirect to the next page after a delay
            setTimeout(() => {
                goto('/coalition');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            // Handle errors
            console.error('Error setting up coalition:', error);
            errorMessage = 'Error setting up coalition. Please try again.';
            successMessage = '';

            if (error.response) {
                if (error.response.status === 409) {
                    // Handle conflict error
                    errorMessage = 'Coalition already exists. Please try a different name.';
                } else if (error.response.status === 401) {
                    // If unauthorized, redirect to login
                    goto('/coalition-login');
                }
            }
        }
    }
</script>

<section class="bg-white dark:bg-gray-900">
    <div class="py-6 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Set Up Your Coalition Profile
        </h2>
        {#if authenticated}
            <form on:submit={handleSubmit} class="space-y-4">
                <div>
                    <label for="coalitionName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Coalition Name
                    </label>
                    <input
                        type="text"
                        id="coalitionName"
                        bind:value={coalitionName}
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Your Coalition Name"
                        required
                    />
                </div>
                <div class="sm:col-span-2">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                        Description
                    </label>
                    <textarea
                        id="description"
                        bind:value={description}
                        rows="6"
                        class="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Leave your coalition description"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Next
                </button>
            </form>
            {#if successMessage}
                <p class="mt-4 text-green-500">{successMessage}</p>
            {/if}
            {#if errorMessage}
                <p class="mt-4 text-red-500">{errorMessage}</p>
            {/if}
        {/if}
        <p class="text-yellow-500 text-xl">Go to the Loyalty Define Page After Creation of Coalition</p>
    </div>
</section>