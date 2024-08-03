<script>
    import { writable } from 'svelte/store';
    import axios from 'axios';
    import { onMount } from 'svelte';

    let coalitionDetails = {};
    let coalitionToken = ''; // Token for coalition requests
    let error = writable(null);
    let loading = writable(true);

    // Fetch coalition details on component mount
    onMount(async () => {
        try {
            const response = await axios.get(
                'https://coalition-loyalty-point-issuance-page.onrender.com/auth/coalition/details',
                {
                    headers: {
                        'Authorization': `Bearer ${coalitionToken}`
                    }
                }
            );

            coalitionDetails = response.data.data;
            error.set(null);
        } catch (err) {
            coalitionDetails = null;
            error.set('Failed to fetch coalition details.');
        } finally {
            loading.set(false);
        }
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
    {:else if coalitionDetails}
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
                    <td>{coalitionDetails.coalitionId}</td>
                    <td>{coalitionDetails.name}</td>
                    <td>{coalitionDetails.description}</td>
                    <td>{coalitionDetails.creatorId}</td>
                </tr>
            </tbody>
        </table>
    {/if}
</div>