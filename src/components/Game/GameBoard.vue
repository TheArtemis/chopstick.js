<script>
import PlayerHand from './PlayerHand.vue'

export default {
    name: 'GameBoard',
    components: {
        PlayerHand,
    }, 
    data () {
      return {
        isDragging: false,
        currentHand: null,
        startX: null,
        startY: null,
      }
    } 
}
</script>

<template>
    <div class="game-board">
      <div class = "game-opponent">
        <div class="hand opponent right"></div>
        <div class="hand opponent left"></div>      
    </div>
    <div class="game-player">
      <PlayerHand side="left"></PlayerHand>
      <PlayerHand side="right"></PlayerHand>
    </div>
    </div>
</template>