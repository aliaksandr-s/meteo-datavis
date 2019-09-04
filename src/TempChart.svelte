<script>
  import { onMount } from "svelte";
  import { chartState } from "./store.js";
  import Chart from "chart.js";

  let container;
  let chart;

  const updateChart = (labels, soilTemp, airTemp) => {
    chart.config.data.labels = labels;
    chart.config.data.datasets[0].data = soilTemp;
    chart.config.data.datasets[1].data = airTemp;
    chart.update();
  };

  const createChart = (labels, soilTemp, airTemp) => {
    chart = new Chart(container, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: soilTemp,
            label: "Soil Temperature",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: airTemp,
            label: "Air Temperature",
            borderColor: "#8e5ea2",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: "Soil and Air temperature"
        }
      }
    });
  };

  const unsubscribe = chartState.subscribe(value => {
    if (value.loaded) {
      if (chart) {
        updateChart(value.dates, value.soilTemp, value.airTemp);
      } else {
        createChart(value.dates, value.soilTemp, value.airTemp);
      }
    }
  });
</script>

{#if !$chartState.loaded}
  <p>loading....</p>
{/if}

<canvas bind:this={container} />