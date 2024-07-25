<script>
    import { onMount } from "svelte";
    import { fetchUserProfile, getUserId } from "../pages/store";
    let userProfile = {};
    let userId = getUserId();

    onMount(async () => {
        if (userId) {
            userProfile = await fetchUserProfile(userId);
        } else {
            console.error("User is not logged in");
        }
    });

    async function updateUserProfile() {
        const response = await fetch(`http://localhost:3000/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(userProfile),
        });

        if (response.ok) {
            alert("Profile updated successfully!");
        } else {
            alert("Failed to update profile.");
        }
    }
</script>

<div>
    <h1>User Profile</h1>
    <input type="text" bind:value={userProfile.email} placeholder="Email" />
    <input type="text" bind:value={userProfile.name} placeholder="Name" />
    <button on:click={updateUserProfile}>Update Profile</button>

    <h2>Bid History</h2>
    <ul>
        {#each userProfile.bids as bid}
            <li>{bid.amount} on property {bid.propertyId}</li>
        {/each}
    </ul>
</div>
