<script>
import Navbar from '@/components/Navbar/Navbar.vue';
import { Chart } from 'chart.js/auto';
import { Bar } from 'vue-chartjs';
import { Pie } from 'vue-chartjs';
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
      chartInstance: null, 
      lineChartInstance: null, 
      pieChartInstance: null, 
      wins:0,
      losses:0,
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
    this.recentGamesList.push({
      player1: 'Miles',
      rating1: 1200,
      player2: 'Peter',
      rating2: 1200,
      winner: 'Peter',
      date: '2021-11-10',
    })
    this.recentGamesList.push({
      player1: 'Miles',
      rating1: 1200,
      player2: 'Peter',
      rating2: 1200,
      winner: 'Miles',
      date: '2021-11-10',
    })
  },
  mounted() {
    this.createLineChart(this.recentGamesList);
    setTimeout(() => {
        this.createPieChart();
    }, 100); //wait for the render to finish before creating the chart
    this.updateWinLossCounts();
  },
  watch: {
    recentGamesList() {
      this.lineChartInstance && this.lineChartInstance.destroy(); 
      this.pieChartInstance && this.pieChartInstance.destroy(); 
      this.createLineChart(this.recentGamesList); 
      this.createPieChart(); 
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

      this.lineChartInstance = new Chart(this.$refs.lineChart, {
        type: 'line',
        data,
        options,
      });
    },
    updateWinLossCounts() {
      this.wins = 0;
      this.losses = 0;

      this.recentGamesList.forEach((game) => {
      if (game.winner === game.player1) {
        this.wins++;
      } else if (game.winner === game.player2) {
        this.losses++;
      }
    });
},
createPieChart() {
  const data = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [this.wins, this.losses],
        backgroundColor: ['#8BC34A', '#F44336'],
        borderColor: 'black',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  this.pieChartInstance = new Chart(this.$refs.pieChart, {
    type: 'pie',
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
            <div class="stats-bottom">
              <div class="bar">
                <canvas ref="pieChart"></canvas>
              </div>
                 <div class="t-container">
                     <span class="text">Game Time</span>
                     <span class="count" data-val="400">0</span>
                 </div>
             </div>
        </div>
    </div>
</template>

