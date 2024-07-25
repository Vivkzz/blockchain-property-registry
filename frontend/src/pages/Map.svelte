<script>
    import { onMount, afterUpdate } from "svelte";
    import L from "leaflet";
    import PropertyDetails from "./PropertyDetails.svelte";

    let map;
    let selectedProperty = null;

    onMount(() => {
        map = L.map("map").setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map);
    });

    export let properties = [];

    afterUpdate(() => {
        properties.forEach((property) => {
            L.marker([property.latitude, property.longitude])
                .addTo(map)
                .bindPopup(
                    `<b>${property.location}</b><br>${property.ownerDetails}`,
                )
                .on("click", () => {
                    selectedProperty = property;
                });
        });
    });
</script>

<div id="map"></div>
{#if selectedProperty}
    <PropertyDetails {selectedProperty} />
{/if}
