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
    <p>{{ player1 }} vs {{ player2 }}</p>
    <p>Winner: {{ winner }}</p>
    <p>Date: {{ date }}</p>
  </div>
</template>