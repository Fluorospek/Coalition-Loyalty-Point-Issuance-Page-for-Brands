<script>
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { goto } from '$app/navigation'; // Use goto for navigation in SvelteKit
    import { coalitionToken as coalitionAuthToken } from '$lib/api/api'; // Assume you have this store

    let tokenDetails = writable(null);
    let error = writable(null);
    let loading = writable(true);

    // Fetch token details on component mount
    onMount(async () => {
        let coalitionToken;
        const unsubscribe = coalitionAuthToken.subscribe(value => {
            coalitionToken = value;
        });

        if (!coalitionToken) {
            // Redirect to coalition login if token is not available
            goto('/coalition-login');
            return;
        }

        try {
            const response = await axios.get(
                'http://localhost:3000/coalition/token/details',
                {
                    headers: {
                        'Authorization': `Bearer ${coalitionToken}`
                    }
                }
            );

            tokenDetails.set(response.data.data);
            error.set(null);
        } catch (err) {
            tokenDetails.set(null);
            error.set('Failed to fetch token details.');
        } finally {
            loading.set(false);
        }

        unsubscribe(); // Cleanup subscription
    });
</script>

<style>
    .table-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #ddd;
    }

    th {
        background-color: #f4f4f4;
    }

    .error {
        color: red;
        font-weight: bold;
    }

    .loading {
        font-style: italic;
        color: gray;
    }
</style>

<div class="table-container">
    {#if $loading}
        <p class="loading">Loading...</p>
    {:else if $error}
        <p class="error">{$error}</p>
    {:else if $tokenDetails}
        <table>
            <thead>
                <tr>
                    <th>Brand Token ID</th>
                    <th>Point Name</th>
                    <th>Coalition ID</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{$tokenDetails.brandTokenId}</td>
                    <td>{$tokenDetails.pointName}</td>
                    <td>{$tokenDetails.coalitionId}</td>
                </tr>
            </tbody>
        </table>
    {/if}
</div>