<script>
    import Navbar from '@/components/Navbar/Navbar.vue'
    import { Chart } from 'chart.js/auto';
    
    export default {
        name: 'Stats',
        components: {
        Navbar,
    },
    created() {
    const colors = localStorage.getItem('colors');
    if (colors === 'true') {
      document.documentElement.setAttribute('data-colors', 'light');
    } else {
      document.documentElement.removeAttribute('data-colors');
    }
   },

    mounted() {
        this.createLineChart();
        this.createPolarAreaChart();
    },
    methods: {
    createLineChart() {
      const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
          {
            label: '1 = win; -1 = losses; 0 = ties',
            data: [0, -1, 1, 1, 0],
            borderColor: '#f1cc53',
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };

      this.$refs.lineChart = new Chart(this.$refs.lineChart, {
        type: 'line',
        data,
        options,
      });
    },
  },
}
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

