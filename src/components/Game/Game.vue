<script>
import PlayerHand from './PlayerHand.vue'

export default {
    name: 'Game',
    components: {
        PlayerHand,
    },  
}
</script>

<template>
  <div class="game-panel">
    <div class="game-board">
      <div class = "game-opponent">
        <div class="hand opponent right"></div>
        <div class="hand opponent left"></div>      
    </div>
    <div class="game-player">
      <PlayerHand class="hand player left"/>
      <PlayerHand class="hand player right"/>
    </div>
    </div>        
  </div>  
</template>