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
        winner: null,
        loser: null,             
      }
    },
    methods: {
      playerAttack(event){
        console.log(event.source + " is attacking " + event.target);        
        if (event.target == 'hand-opponent-left'){
          if(this.currentPosition.opponentLeft == 0)
            return this.gameLoop();
          
          this.playerAttackLeft(event.source);
        }
        else if (event.target == 'hand-opponent-right'){
          if(this.currentPosition.opponentRight == 0)
            return this.gameLoop();
          this.playerAttackRight(event.source);
        }
        this.turn = 1;
        this.gameLoop();
      },  
      playerAttackRight(hand) { /* hand is source hand */
        console.log("player attacking right");
        var playerVal;
        if (hand == 'hand-player-left')
          playerVal = this.currentPosition.playerLeft;
        else if (hand == 'hand-player-right')
          playerVal = this.currentPosition.playerRight;

        var sum = playerVal + this.currentPosition.opponentRight;
        if(sum == 5)
          this.currentPosition.opponentRight = 0;
        else if(sum > 5)
          this.currentPosition.opponentRight = sum - 5;
        else 
          this.currentPosition.opponentRight = sum;        
      },
      playerAttackLeft(hand){
        console.log("player attacking left");
        var playerVal;
        if (hand == 'hand-player-left')
          playerVal = this.currentPosition.playerLeft;
        else if (hand == 'hand-player-right')
          playerVal = this.currentPosition.playerRight;

        var sum = playerVal + this.currentPosition.opponentLeft;
        if(sum == 5)
          this.currentPosition.opponentLeft = 0;
        else if(sum > 5)
          this.currentPosition.opponentLeft = sum - 5;
        else 
          this.currentPosition.opponentLeft = sum; 
      },    
      hasPlayerLost(){
        if(this.currentPosition.playerLeft == 0 && this.currentPosition.playerRight == 0)
          return true;
        return false;
      },
      hasOpponentLost(){
        if(this.currentPosition.opponentLeft == 0 && this.currentPosition.opponentRight == 0)
          return true;
        return false;
      },
      isGameOver(){
        if(this.hasPlayerLost() || this.hasOpponentLost())
          {console.log("someone lost")
            return true;}
      },
      initGame(){
        const initTurn = Math.round(Math.random());
        this.boardActive = true;
        this.turn = initTurn;
        this.currentPosition = {
          playerLeft: 1,
          playerRight: 1,
          opponentLeft: 1,
          opponentRight: 1,
        };
        this.winner = null;
        this.loser = null;
      },
      startGame(){
        console.log("game started");        
        this.initGame();
        this.gameLoop();
      },
      gameLoop(){        
        if(this.isGameOver())
          this.endGame();

        console.log("E' il turno di " + this.turn);
        
        if (this.turn == 1)
          this.computerAction();

        if(this.turn == 0)
          console.log("player turn");        
      },
      async computerAction(){        
        if(this.isGameOver())
          this.endGame();
          
        /* Deactivate player hands */
        this.boardActive = false;

        console.log("computer is thinking");
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log("computer attack");

        let currHand;
        if(this.currentPosition.opponentLeft == 0)
          currHand = this.currentPosition.opponentRight;
        else if(this.currentPosition.opponentRight == 0)
          currHand = this.currentPosition.opponentLeft;
        else {
          const hnd = Math.round(Math.random());
          if(hnd == 0)
            currHand = this.currentPosition.opponentLeft;
          else
            currHand = this.currentPosition.opponentRight;
        }

        if(this.currentPosition.playerLeft == 0) /* Se la mano sinistre è morta attacca la destra */
          this.computerAttackRight(currHand);
        else if(this.currentPosition.playerRight == 0) /* Se la mano destra è morta attacca la sinistra */
          this.computerAttackLeft(currHand);
        else {
          const hnd = Math.round(Math.random());
          if(hnd == 0)
            this.computerAttackLeft(currHand);
          else
            this.computerAttackRight(currHand);
        }
        
        /* Activate Player Hands */
        this.boardActive = true;
        this.turn = 0;
        this.gameLoop();
        
      },
      computerAttackLeft(hand){
        console.log("attacking left with value " + hand);           
        
        var sum = hand + this.currentPosition.playerLeft;
        if(sum == 5)
          this.currentPosition.playerLeft = 0;
        else if(sum > 5)
          this.currentPosition.playerLeft = sum - 5;
        else 
          this.currentPosition.playerLeft = sum;        

        console.log("new value for left is " + this.currentPosition.playerLeft);
      },
      computerAttackRight(hand){
        console.log("attacking right with value " + hand);           
        
        var sum = hand + this.currentPosition.playerRight;
        if(sum == 5)
          this.currentPosition.playerRight = 0;
        else if(sum > 5)
          this.currentPosition.playerRight = sum - 5;
        else 
          this.currentPosition.playerRight = sum;
        console.log("new value for right is " + this.currentPosition.playerRight);  
      },
      endGame(){
        this.turn = -1;
        this.boardActive = false;
        /* this.currentPosition = {
          playerLeft: 0,
          playerRight: 0,
          opponentLeft: 0,
          opponentRight: 0,
        } */

        if(this.hasPlayerLost()) {
          this.winner = this.opponent.name;
          this.loser = this.player.name;
        }
        else{ 
          this.winner = this.player.name;
          this.loser = this.opponent.name;
        }

        this.$emit('game-ended');

        console.log("game ended, winner is: " + this.winner);
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
        if (val == false)
          return;     
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
       :opponentRight="this.currentPosition.opponentRight"
       ></GameBoard>
    <PlayerBar :player ="player"></PlayerBar>
    </div>        
  </div>  
</template>