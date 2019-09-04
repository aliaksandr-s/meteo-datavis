<script>
  import { onMount } from "svelte";
  import { getDevices, getMeteoData } from "./ajax";
  import { popUpState, chartState, controlsState } from "./store.js";

  let container;

  const renderMarker = (map, device) => {
    // console.log(device);
    const marker = new google.maps.Marker({
      position: { lat: device.coordinate.y, lng: device.coordinate.x },
      map: map,
      deviceId: device.coordinate.id
    });

    marker.addListener("click", async () => {
      popUpState.show()
      const id = marker.get("deviceId");
      const mockId = 177; // we're mocking this because the api doesn't return any data for devices on the map
      const data = await getMeteoData(mockId, 15, $controlsState.dateFrom, $controlsState.dateTo);
      chartState.setData({
        loaded: true,
        ...data,
      })
      // console.log(data);
    });
  };

  onMount(async () => {
    const devices = await getDevices();
    const filteredDevices = devices.filter(device => device.coordinate);
    const centerCoords = {
      lat: filteredDevices[0].coordinate.y,
      lng: filteredDevices[0].coordinate.x
    };

    let map = new google.maps.Map(container, {
      zoom: 14,
      center: centerCoords
    });

    map.addListener("click", () => {
      popUpState.hide();

      chartState.setData({
        loaded: false,
      })
    })

    filteredDevices.forEach(device => {
      renderMarker(map, device);
    });
  });
</script>

<style>
  .full-screen {
    width: 100vw;
    height: 100vh;
  }
</style>

<div class="full-screen" bind:this={container} />
