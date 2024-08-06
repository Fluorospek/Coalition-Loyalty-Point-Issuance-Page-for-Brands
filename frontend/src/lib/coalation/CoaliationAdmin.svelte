<script>
    import { writable } from 'svelte/store';
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { coalitionToken } from '$lib/api/api';

    let coalitionDetails = writable(null);
    let error = writable(null);
    let loading = writable(true);

    // Fetch coalition details on component mount
    onMount(async () => {
        let token;
        const unsubscribe = coalitionToken.subscribe(value => {
            token = value;
        });

        try {
            const response = await axios.get(
                'http://localhost:3000/coalition/details',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            coalitionDetails.set(response.data.data);
            error.set(null);
        } catch (err) {
            coalitionDetails.set(null);
            error.set('Failed to fetch coalition details.');
        } finally {
            loading.set(false);
        }

        unsubscribe();
    });
</script>

<style>
    .table-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem;
        background-color: #1a1a1a;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        color: #f0f0f0;
    }

    th, td {
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #333;
    }

    th {
        background-color: #333;
    }

    .error {
        color: #ff4c4c;
        font-weight: bold;
    }

    .loading {
        font-style: italic;
        color: #ccc;
    }
</style>

<div class="table-container">
    <h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Coalition Admin
	</h2>
    {#if $loading}
        <p class="loading">Loading...</p>
    {:else if $error}
        <p class="error">{$error}</p>
    {:else if $coalitionDetails}
        <table>
            <thead>
                <tr>
                    <th>Coalition ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Creator ID</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{$coalitionDetails.coalitionId}</td>
                    <td>{$coalitionDetails.name}</td>
                    <td>{$coalitionDetails.description}</td>
                    <td>{$coalitionDetails.creatorId}</td>
                </tr>
            </tbody>
        </table>
    {/if}
</div>