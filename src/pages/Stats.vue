<script>
import Navbar from '@/components/Navbar/Navbar.vue';
import { Chart } from 'chart.js/auto';
import { Bar } from 'vue-chartjs';
import { Pie } from 'vue-chartjs';
import recentGames from '@/components/RecentGames/recentGames.vue';

import axiosInstance from '@/services/axiosIstance.js';

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
      wins: 0,
      losses: 0,
      guest: true,
      player: 'guest',
      score: [],
    };
  },
  async created() {
    try {
      console.log("created");
      if (localStorage.getItem('chopsticks_authToken')) {
        this.guest = false;
      }
      if (this.guest == false) {

        this.player = JSON.parse(localStorage.getItem('chopsticks_userInfo')).username;

        try {
          const token = localStorage.getItem('chopsticks_authToken');
          const response = await axiosInstance.get('/games', {
            headers: {
              Authorization: token,
            },
          });
          console.log(response.data);
          const data = [].concat(...Object.values(response.data));
          var gamelist = data.map(item => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "numeric",
              year: "numeric"
            });
            return { ...item, date: formattedDate };
          });
          this.recentGamesList = gamelist;
          console.log(this.recentGamesList);
          this.updateLineChart();
          this.updateWinLossCounts();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error("created error", error);
    }
  },
  beforeMount() {
    /* QUERY AL DATABASE PER AVERE LE PARTITE RECENTI */
    /* RESTITUISCE UN INSIEME DI OGGETTI */
    /* OGNI OGGETTO VERRA AGGIUNTO A this.recentGameList */

    /* this.recentGamesList.push({
     player1: 'guest',
     rating1: 1200,
     player2: 'Peter',
     rating2: 1200,
     winner: 'Peter',
     date: '2021-10-10',
   })

   this.recentGamesList.push({
     player1: 'guest',
     rating1: 1200,
     player2: 'Peter',
     rating2: 1200,
     winner: 'guest',
     date: '2021-11-10',
   })
   this.recentGamesList.push({
     player1: 'guest',
     rating1: 1200,
     player2: 'Peter',
     rating2: 1200,
     winner: 'Peter',
     date: '2021-11-10',
   })
   this.recentGamesList.push({
     player1: 'guest',
     rating1: 1200,
     player2: 'Peter',
     rating2: 1200,
     winner: 'guest',
     date: '2021-11-10',
   })  */

    console.log(this.recentGamesList);
  },
  mounted() {
    console.log("mounted");
    this.$nextTick(() => {
      this.createLineChart(this.recentGamesList);
      this.createPieChart();
    }); // wait for the render to finish before creating the chart
    this.updateLineChart();
    this.updateWinLossCounts();
    console.log(this.score);

  },
  watch: {
    recentGamesList() {
      console.log("changed");
      this.destroyCharts();
      this.createLineChart(this.recentGamesList);
      this.createPieChart();
    },
  },
  methods: {
    updateLineChart() {
      this.score = [];
      let rating;
      this.recentGamesList.forEach((game) => {
        rating = parseFloat(game.rating1);
        if (game.player1 === this.player) {
          rating = game.rating1;
        } else if (game.player2 === this.player) {
          rating = parseFloat(game.rating2)
        }
        this.score.push(rating);
      });
    },
    createLineChart(recentGames) {
      const labels = recentGames.map((game) => game.date);
      const data = {
        labels,
        datasets: [
          {
            label: 'Rating',
            data: this.score,
            borderColor: '#F44336',
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };

      if (this.lineChartInstance) {
        this.lineChartInstance.destroy();
      }

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
        console.log(game.winner);
        if (game.winner == this.player) {
          this.wins++;
        } else {
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

      if (this.pieChartInstance) {
        this.pieChartInstance.destroy();
      }

      this.pieChartInstance = new Chart(this.$refs.pieChart, {
        type: 'pie',
        data,
        options,
      });
    },
    destroyCharts() {
      if (this.lineChartInstance) {
        this.lineChartInstance.destroy();
      }
      if (this.pieChartInstance) {
        this.pieChartInstance.destroy();
      }
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
          <span class="text">GAMES PLAYED</span>
          <span class="count" data-val="400">{{ this.wins + this.losses }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

