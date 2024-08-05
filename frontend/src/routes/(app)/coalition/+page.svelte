<script>
    import { onMount } from 'svelte';
    import { coalitionToken, isCoalitionAuthenticated } from '$lib/api/api';
    import { goto } from '$app/navigation';

    let authenticated = false;

    // Import new components
    import CoalitionSetup from '../../../lib/coalation/CoaliationSteup.svelte';
    import CoalitionAdmin from '../../../lib/coalation/CoaliationAdmin.svelte';
    import CoalitionTokenDetails from '../../../lib/coalation/coaliationtokensetails.svelte';
    import PopupModal from '../../../lib/components/PopupModal.svelte';
    import Loyalitydefine from '../../../lib/coalation/Loyalitydefine.svelte';
    import CoaliationToken from '../../../lib/coalation/CoaliationToken.svelte';
    let mainContent = CoalitionSetup; // Default component
    let sidebarItems = [
        {
            title: 'Coalition Setup',
            component: CoalitionSetup,
            visible: true
        },
        {
            title: 'Coalition Admin',
            component: CoalitionAdmin,
            visible: true
        },
        {
            title: 'Loyalitydefine',
            component: Loyalitydefine,
            visible: true
        },
        {
            title: 'Coalition Token Details',
            component: CoalitionTokenDetails,
            visible: true
        },{
            title: 'Coalition Token',
            component: CoaliationToken,
            visible: true
        }
    ];

    function handleCreatePopup(event) {
        const details = event.detail;
        const modal = new PopupModal({
            target: document.body,
            props: {
                details: {
                    success: details.success,
                    message: details.message
                }
            }
        });
    }

    onMount(() => {
        // Subscribe to the authentication status and token
        isCoalitionAuthenticated.subscribe(value => {
            authenticated = value;
            if (!authenticated) {
                goto('/coalition-login'); // Redirect if not authenticated
            }
        });
    });
</script>

{#if authenticated}
    <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 pt-16"
        aria-label="Sidebar"
    >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                {#each sidebarItems.filter(item => item.visible) as { title, component }}
                    <li>
                        <button
                            on:click={() => {
                                mainContent = component;
                            }}
                            class:active={mainContent === component}
                            class="w-full text-left p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            {title}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    </aside>

    <div class="p-4 sm:ml-64" id="dashboard-main">
        <svelte:component
            this={mainContent}
            on:createPopup={handleCreatePopup}
        />
    </div>
{/if}

<style>
    .active {
        @apply bg-gray-100 dark:bg-gray-700;
    }
</style>