<script>
    import { writable } from 'svelte/store';
    import axios from 'axios';

    let email = '';
    let password = '';

    let error = writable(null);
    let success = writable(null);

    async function login() {
        try {
            const response = await axios.post('https://coalition-loyalty-point-issuance-page.onrender.com/auth/coalition/login', {
                email,
                password
            });

            if (response.status === 200) {
                success.set('Login successful');
                error.set(null);
            } else {
                throw new Error('Login failed');
            }
        } catch (err) {
            success.set(null);
            error.set(err.response ? err.response.data.message : err.message);
        }
    }
</script>

<style>
    .form-container {
        max-width: 400px;
        margin: auto;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
    }
    .form-group {
        margin-bottom: 1rem;
    }
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
    }
    .form-group input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .form-group button {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        background-color: #007BFF;
        color: white;
        font-size: 1rem;
    }
    .form-group button:hover {
        background-color: #0056b3;
    }
    .error, .success {
        margin-top: 1rem;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        text-align: center;
    }
    .error {
        background-color: #d9534f;
    }
    .success {
        background-color: #5cb85c;
    }
</style>

<section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-4 md:pd-2 lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login to Coalition
                </h1>
                <form class="space-y-4 md:space-y-6" on:submit|preventDefault={login}>
                    <div class="form-group">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            bind:value={email}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            bind:value={password}
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Login
                    </button>
                </form>
                {#if $error}
                    <div class="error">{$error}</div>
                {/if}
                {#if $success}
                    <div class="success">{$success}</div>
                {/if}
            </div>
        </div>
    </div>
</section>