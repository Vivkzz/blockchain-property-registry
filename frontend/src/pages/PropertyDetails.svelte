<script>
    import { onMount } from "svelte";
    import { fetchProperties } from "./store";
    import { get } from "svelte/store";
    import { properties } from "./store";

    export let property;
    let bidAmount = 0;
    let bids = [];

    onMount(async () => {
        const response = await fetch(
            `http://localhost:3000/bidding/${property.id}`,
        );
        if (response.ok) {
            bids = await response.json();
        }
    });

    async function placeBid() {
        const response = await fetch("http://localhost:3000/bidding", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: "your-user-id", // Replace with actual user ID
                propertyId: property.id,
                amount: bidAmount,
            }),
        });

        if (response.ok) {
            alert("Bid placed successfully!");
            // Reload bids
            const bidsResponse = await fetch(
                `http://localhost:3000/bidding/${property.id}`,
            );
            if (bidsResponse.ok) {
                bids = await bidsResponse.json();
            }
        } else {
            alert("Failed to place bid.");
        }
    }
</script>

<div>
    <h1>{property.location}</h1>
    <p>Owner: {property.ownerDetails}</p>
    <p>Documents: {property.documents}</p>
    <!-- Add more property details as needed -->
    <input
        type="number"
        bind:value={bidAmount}
        placeholder="Enter bid amount"
    />
    <button on:click={placeBid}>Place a Bid</button>

    <h2>Bids</h2>
    <ul>
        {#each bids as bid}
            <li>{bid.amount} by {bid.user.email}</li>
        {/each}
    </ul>
</div>
