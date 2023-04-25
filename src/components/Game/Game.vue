<script>
import GameBoard from './GameBoard.vue'

export default {
    name: 'Game',
    components: {
    GameBoard,   
},
}
</script>

<template>
  <div class="game-panel">
       <GameBoard></GameBoard>
  </div>  
</template>