<script>
import GameBoard from '@/components/Game/GameBoard.vue'

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