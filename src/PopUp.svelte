<script>
  import { onMount } from "svelte";
  import { fade, draw } from "svelte/transition";
  import { getMeteoData } from "./ajax";
  import { popUpState, chartState, controlsState } from "./store.js";
  import TempChart from "./TempChart.svelte";
  import LuminanceChart from "./LuminanceChart.svelte";

  let today = new Date().toISOString().split("T")[0];
  let dateFrom = $controlsState.dateFrom;
  let dateTo = $controlsState.dateTo;

  const handleDateChange = async e => {
    const isSecondDateBigger = new Date(dateFrom) < new Date(dateTo);

    if (dateFrom && dateTo && isSecondDateBigger) {
      const mockId = 177; // we're mocking this because the api doesn't return any data for devices on the map

      const data = await getMeteoData(mockId, 15, dateFrom, dateTo);
      chartState.setData({
        loaded: true,
        ...data
      });

      console.log(data);
    }
  };

</script>

<style>
  .pop-up {
    position: absolute;
    background-color: white;
    left: 50%;
    top: 3rem;
    transform: translate(-50%, 0);
    padding: 1rem;
    width: 90%;
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 1rem;
  }

  .controls > div {
    margin: 0.5rem;
  }

	.chart-box {
		display: flex;
	}

	.chart-wrapper {
		width: 50%;
	}
</style>

{#if $popUpState}
  <div transition:fade class="pop-up">

    <div class="controls">
      <div>
        <label for="start">Start date:</label>

        <input
          bind:value={dateFrom}
          type="date"
          id="date_from"
          name="date_from"
          min="2018-01-01"
          max={today}
          on:change={handleDateChange} />
      </div>

      <div>
        <label for="end">End date:</label>

        <input
          bind:value={dateTo}
          type="date"
          id="date_to"
          name="date_to"
          min="2018-01-01"
          max={today}
          on:change={handleDateChange} />
      </div>
    </div>

    <div class="chart-box">
      <div class="chart-wrapper">
        <TempChart />
      </div>
      <div class="chart-wrapper">
        <LuminanceChart />
      </div>
    </div>
  </div>
{/if}
