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
          playerLeft: 0,
          playerRight: 0,
          opponentLeft: 0,
          opponentRight: 0,
        },        
        boardActive: this.hasGameStarted,
        turn: -1, /* 0 is player 1 is opponent */
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
        console.log("attacked" + event);
      },
      hasPlayerLost(){
        if(this.currentPosition.playerLeft == 0 && this.currentPosition.playerRight == 0)
          return true;
      },
      hasOpponentLost(){
        if(this.currentPosition.opponentLeft == 0 && this.currentPosition.opponentRight == 0)
          return true;
      },
      isGameOver(){
        if(this.hasPlayerLost() || this.hasOpponentLost())
          {console.log("someone lost")
            return true;}
      },
      startGame(){
        console.log("game started");
        const initTurn = Math.round(Math.random());
        this.turn = initTurn;
        this.currentPosition = {
          playerLeft: 1,
          playerRight: 1,
          opponentLeft: 1,
          opponentRight: 1,
        }        
        this.gameLoop();
      },
      gameLoop(){        
        if(this.isGameOver())
          this.endGame();

        console.log("E' il turno di " + this.turn);        
        
      },
      endGame(){
        this.turn = -1;
        this.currentPosition = {
          playerLeft: 0,
          playerRight: 0,
          opponentLeft: 0,
          opponentRight: 0,
        }
        console.log("game ended");
      },
      disableNavbar(){
        this.$emit('disable-navbar');
        /* console.log("navbar disabled") */
      },
      enableNavbar(){
        this.$emit('enable-navbar');
        /* console.log("navbar enabled"); */
      },      
    },
    updated(){
      /* console.log("game -> " + this.boardActive); */
    },
    watch: {
      hasGameStarted: function (val) {   
        this.boardActive = val;     
        if(this.turn == -1)
          this.startGame();
        else
          this.endGame();
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
       @disable-navbar="disableNavbar"
       @enable-navbar="enableNavbar"       
       :boardActive="this.boardActive"
       :playerLeft="this.currentPosition.playerLeft"
       :playerRight="this.currentPosition.playerRight"
       :opponentLeft="this.currentPosition.opponentLeft"
       :opponentRight="this.currentPosition.opponentRight"></GameBoard>
    <PlayerBar :player ="player"></PlayerBar>
    </div>        
  </div>  
</template>