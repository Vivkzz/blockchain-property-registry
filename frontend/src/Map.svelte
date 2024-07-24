<script>
    import { onMount } from "svelte";
    import L from "leaflet";

    let map;

    onMount(() => {
        map = L.map("map").setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map);
    });

    export let properties = [];
</script>

<div id="map"></div>

<style>
    #map {
        height: 600px;
    }
</style>
