<script>
  import { onMount } from "svelte";
  import { chartState } from "./store.js";
  import Chart from "chart.js";

  let container;
  let chart;

  const updateChart = (labels, lum) => {
    chart.config.data.labels = labels;
    chart.config.data.datasets[0].data = lum;
    chart.update();
  };

  const createChart = (labels, lum) => {
    chart = new Chart(container, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: lum,
            label: "Luminance",
            borderColor: "#3cba9f",
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: false,
          text: "Luminance"
        }
      }
    });
  };

  const unsubscribe = chartState.subscribe(value => {
    if (value.loaded) {
      if (chart) {
        updateChart(value.dates, value.luminance);
      } else {
        createChart(value.dates, value.luminance);
      }
    }
  });
</script>

{#if !$chartState.loaded}
  <p>loading....</p>
{/if}

<canvas bind:this={container} />