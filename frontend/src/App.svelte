<script>
	import { onMount } from "svelte";
	import { user, getUserId, fetchUserProfile } from "./pages/store";
	import Login from "./pages/Login.svelte";
	import Register from "./pages/Register.svelte";
	import UserProfile from "./pages/UserProfile.svelte";
	import Map from "./pages/Map.svelte";

	let currentPage = "login";
	let userProfile = {};

	function navigate(page) {
		currentPage = page;
	}

	onMount(() => {
		const userId = getUserId();
		if (userId) {
			fetchUserProfile(userId)
				.then((profile) => {
					userProfile = profile;
					user.set({ ...userProfile, isLoggedIn: true });
				})
				.catch((error) => {
					console.error(error);
					navigate("login");
				});
		} else {
			navigate("login");
		}
	});
</script>

<main>
	{#if currentPage === "login"}
		<Login />
	{/if}
	{#if currentPage === "register"}
		<Register />
	{/if}
	{#if currentPage === "profile"}
		<UserProfile />
	{/if}
	{#if currentPage === "map"}
		<Map />
	{/if}

	<nav>
		<button on:click={() => navigate("login")}>Login</button>
		<button on:click={() => navigate("register")}>Register</button>
		<button on:click={() => navigate("profile")}>Profile</button>
		<button on:click={() => navigate("map")}>Map</button>
	</nav>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
