<script>
import Navbar from '@/components/Navbar/Navbar.vue';
import { Chart } from 'chart.js/auto';
import recentGames from '@/components/RecentGames/recentGames.vue';

export default {
  name: 'Stats',
  components: {
    Navbar,
    recentGames,
  },
  data() {
    return {
      recentGamesList: [],
      chartInstance: null, // new data property to hold chart instance
    };
  },
  beforeMount() {
    /* QUERY AL DATABASE PER AVERE LE PARTITE RECENTI */
    /* RESTITUISCE UN INSIEME DI OGGETTI */
    /* OGNI OGGETTO VERRA AGGIUNTO A this.recentGameList */

    this.recentGamesList.push({
      player1: 'Miles',
      rating1: 1200,
      player2: 'Peter',
      rating2: 1200,
      winner: 'Miles',
      date: '2021-10-10',
    })

    this.recentGamesList.push({
      player1: 'Miles',
      rating1: 1200,
      player2: 'Peter',
      rating2: 1200,
      winner: 'Peter',
      date: '2021-11-10',
    })
  },
  mounted() {
    this.createLineChart(this.recentGamesList);
  },
  watch: {
    recentGamesList() {
      this.chartInstance && this.chartInstance.destroy(); // destroy previous chart instance
      this.createLineChart(this.recentGamesList); // create new chart instance with updated data
    },
  },
  methods: {
    createLineChart(recentGames) {
      const labels = recentGames.map(game => game.date);
      const data = {
        labels,
        datasets: [
          {
            label: '1 = win; -1 = losses; 0 = ties',
            data: recentGames.map(game => {
              const result = game.winner === game.player1 ? 1 : -1;
              return result;
            }),
            borderColor: 'black',
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };

      this.chartInstance = new Chart(this.$refs.lineChart, {
        type: 'line',
        data,
        options,
      });
    },
  },
};
</script>

<template>
    <div class="wrapper">
        <Navbar />
        <div class="total">
            <div class="graph">
                <label id="Stats">Stats</label>
                <div class="line-chart">
                    <canvas ref="lineChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

