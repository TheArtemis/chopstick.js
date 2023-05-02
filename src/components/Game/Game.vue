<script>
import GameBoard from '@/components/Game/GameBoard.vue'
import PlayerBar from '@/components/Game/PlayerBar.vue'

export default {
    name: 'Game',
    props : {       
      opponentType : {
        type: String,
        validator: function (value) {
          return ['computer', 'human'].indexOf(value) !== -1
        }
      },
      hasGameStarted : Boolean,    
    },
    components: {
    GameBoard,
    PlayerBar,       
    },
    data() {
      return {
        pastPositions: [[1, 1, 1, 1]],   
        currentPosition : {
          playerLeft: 1,
          playerRight: 1,
          opponentLeft: 1,
          opponentRight: 1,
        },        
        boardActive: this.hasGameStarted,
        player: {
          name: 'You',
          rating: '1000',
          picture: 'https://cdn.smehost.net/milesdaviscom-uslegacyprod/wp-content/uploads/2022/04/milesdavis-1.jpg'
        },
        opponent: {
          name: 'Opponent',
          rating: '1000',
          picture: 'https://yt3.googleusercontent.com/CCi8_PVD-0cEWApO1xlTJbBaBzcOyG5xMHp0v1_E8UiJsp3fzoYqKZvJkx6SK2zKEab2hNkGcw=s900-c-k-c0x00ffffff-no-rj'
        },             
      }
    },
    methods: {
      playerAttack(event){
        console.log(event);
      },      
    },
    updated(){
      console.log("game -> " + this.boardActive);
    },
    watch: {
      hasGameStarted: function (val) {
        this.boardActive = val;
      }
    }        
}
</script>

<template>
  <div class="game-panel">
    <div class="game-panel-wrap">
      <PlayerBar 
      :player="opponent"
      ></PlayerBar>
       <GameBoard 
       @player-attack="playerAttack"       
       :boardActive="this.boardActive"
       :playerLeft="this.currentPosition.playerLeft"
       :playerRight="this.currentPosition.playerRight"
       :opponentLeft="this.currentPosition.opponentLeft"
       :opponentRight="this.currentPosition.opponentRight"></GameBoard>
    <PlayerBar :player ="player"></PlayerBar>
    </div>        
  </div>  
</template>