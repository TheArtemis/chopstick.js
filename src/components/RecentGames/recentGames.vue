<script>
import recentGame from '@/components/RecentGames/recentGame.vue'

export default {
    name: 'recentGames',
    created() {
    const colors = localStorage.getItem('colors');
    if (colors === 'true') {
      document.documentElement.setAttribute('data-colors', 'light');
    } else {
      document.documentElement.removeAttribute('data-colors');
    }
   },
   components: {
    recentGame,
  },
  props:{
    recentGamesList: Array,
  },
}
</script>

<template>
  <div class="recent-games-container">
    <div v-for="(game, index) in this.recentGamesList" :key="index">
      <recent-game
        :player1="game.player1"
        :rating1="game.rating1"
        :player2="game.player2"
        :rating2="game.rating2"
        :winner="game.winner"
        :date="game.date"
      />
    </div>
  </div>
</template>