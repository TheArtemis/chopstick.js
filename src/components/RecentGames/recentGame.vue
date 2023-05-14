<script>

export default {
    name: 'recentGame',
    created() {
    const colors = localStorage.getItem('colors');
    if (colors === 'true') {
      document.documentElement.setAttribute('data-colors', 'light');
    } else {
      document.documentElement.removeAttribute('data-colors');
    }
   },
   props: {
    player1: String,
    rating1: Number,
    player2: String,
    rating2: Number,
    winner: String,
    date: String,
  },
}
</script>

<template>
  <div class="recent-game-container">
    <div class="player-container">
      <div class="player-info-sx">{{ player1 }}: {{ rating1 }}</div>
      <div class="score-container">
        <div class="score">{{ winner === player1 ? '1-0' : '0-1' }}</div>
        <div class="date">{{ date }}</div>
      </div>
      <div class="player-info-dx">{{ player2 }}: {{ rating2 }}</div>
    </div>
  </div>
</template>
