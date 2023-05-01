<script>
import GameBoard from '@/components/Game/GameBoard.vue'
import PlayerBar from '@/components/Game/PlayerBar.vue'

export default {
    name: 'Game',
    props : {
      player : Object,  
      opponentType : {
        type: String,
        validator: function (value) {
          return ['computer', 'human'].indexOf(value) !== -1
        }
      },    
    },
    components: {
    GameBoard,
    PlayerBar,       
    },
    data() {
      return {
        playerLeft: 1,
        playerRight: 1,
        opponentLeft: 1,
        opponentRight: 1,
        boardActive: false,        
      }
    },
    methods: {
      playerAttack(event){
        console.log(event);
      }
    },    
}
</script>

<template>
  <div class="game-panel">
    <div class="game-panel-wrap">
      <PlayerBar :player="{name: 'Opponent', rating: '1000', picture:'https://yt3.googleusercontent.com/CCi8_PVD-0cEWApO1xlTJbBaBzcOyG5xMHp0v1_E8UiJsp3fzoYqKZvJkx6SK2zKEab2hNkGcw=s900-c-k-c0x00ffffff-no-rj'}"></PlayerBar>
       <GameBoard @player-attack="playerAttack"></GameBoard>
    <PlayerBar :player ="{name: 'Player', rating: '1000', picture: 'https://cdn.smehost.net/milesdaviscom-uslegacyprod/wp-content/uploads/2022/04/milesdavis-1.jpg'}"></PlayerBar>
    </div>        
  </div>  
</template>