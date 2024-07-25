<script>
    import { onMount } from "svelte";
    import { properties, fetchProperties } from "./store";
    import Map from "./Map.svelte";

    onMount(() => {
        fetchProperties();
    });
</script>

<h1>Dashboard</h1>
<p>Welcome to your dashboard!</p>

<Map {properties} />
