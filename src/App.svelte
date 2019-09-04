<script>
	import Map from "./Map.svelte";
	import PopUp from "./PopUp.svelte";

  export let ready;
</script>

<style>
  :global(body) {
    padding: 0;
  }
</style>

<svelte:head>
  <script
    defer
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlrNp7jj77rIZaYwPma5_4EPFBSY7sJKI&callback=initMap">

  </script>
</svelte:head>
{#if ready}
  <Map />
	<PopUp />
{/if}
