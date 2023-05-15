<script>
import LocalGameBoard from '@/components/Game/LocalGameBoard.vue'
import PlayerBar from '@/components/Game/PlayerBar.vue'
import LocalGameOver from '@/components/Game/LocalGameOver.vue'

import axiosInstance from '@/services/axiosIstance.js';

export default {
  name: 'LocalGame',  
  props: {
    mouseUpFlag: Boolean,
    hasGameStarted: Boolean,
  },
  components: {
    LocalGameBoard,
    PlayerBar,
    LocalGameOver,
  },
  data() {
    return {
      boardPosition: { top: 0, left: 0, boardWidth: 0, boardHeight: 0, gameOverWidth: 0, gameOverHeight: 0 },
      pastPositions: [],
      currentPosition: {
        player1Left: 0,
        player1Right: 0,
        player2Left: 0,
        player2Right: 0,
      },
      boardActive: this.hasGameStarted,
      turn: 1, 
      player1: {
        name: '',
        rating: '',
        picture: ''
      },
      player2: {
        name: 'Guest',
        rating: '',
        picture: '',
      },
      winner: null,
      loser: null,
      isGameOverHidden: true,
      guest: true,
      surrendered: false,
    }
  },
  async created() {
    /* console.log(JSON.parse(localStorage.getItem('chopsticks_userInfo')).username) */

    try {
      const token = localStorage.getItem('chopsticks_authToken');
      console.log('Getting user info...');
      const response = await axiosInstance.get('/users', {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data);
      localStorage.setItem('chopsticks_userInfo', JSON.stringify(response.data));
      console.log(localStorage.getItem('chopsticks_userInfo'));
    } catch (error) {
      console.log(error);
    }
    if (localStorage.getItem('chopsticks_authToken') == null || localStorage.getItem('chopsticks_userInfo') == null) {
      console.log("guest");
      this.player2.name = 'Guest';
      this.player2.rating = '000';
      this.player2.picture = '/src/assets/imgs/img3.png'
    }
    else {
      this.guest = false;
      console.log("not guest");
      this.player1.name = JSON.parse(localStorage.getItem('chopsticks_userInfo')).username;
      this.player1.rating = JSON.parse(localStorage.getItem('chopsticks_userInfo')).rating;
      if (JSON.parse(localStorage.getItem('chopsticks_userInfo')).picture == null)
        this.player1.picture = '/src/assets/imgs/img3.png'
      else {
        console.log("picture is not null");
        this.player1.picture = JSON.parse(localStorage.getItem('chopsticks_userInfo')).picture;
      }
    }

  },
  methods: {
    /* Game Over Conditions */

    // Checks if the current player has lost by examining if both the player's left and right positions are empty.
    hasPlayer1Lost() {
      if (this.currentPosition.player1Left == 0 && this.currentPosition.player1Right == 0)
        return true;
      return false;
    },
    // Checks if the opponent has lost by examining if both the opponent's left and right positions are empty
    hasPlayer2Lost() {
      if (this.currentPosition.player2Left == 0 && this.currentPosition.player2Right == 0)
        return true;
      return false;
    },
    // Determines if the game is over by checking if either the player or the opponent has lost, and logs a message indicating that someone has lost.
    isGameOver() {
      if (this.hasPlayer1Lost() || this.hasPlayer2Lost()) {
        console.log("someone lost")
        return true;
      }
    },

    /* Local Game Initialization and Execution */

    initLocalGame() {
      const initTurn = Math.round(Math.random());
      this.boardActive = true;
      this.turn = initTurn;
      this.pastPositions = [];
      this.currentPosition = {
        player1Left: 1,
        player1Right: 1,
        player2Left: 1,
        player2Right: 1,
      };
      this.isGameOverHidden = true;
      this.winner = null;
      this.loser = null;
      this.surrendered = false;
    },
    startGame() {
      console.log("game started");
      this.initLocalGame();
      this.gameLoop();
    },
    gameLoop() {
      if (this.isGameOver())
        return this.endGame();

      this.pastPositions.push([this.currentPosition.player1Left, this.currentPosition.player1Right, this.currentPosition.player2Left, this.currentPosition.player2Right]);

      if (this.turn == 1){
        console.log("player 1 turn");
      }

      else if (this.turn == 2){
        console.log("player 2 turn");
      }
    },
    playerAttack(event) {
      console.log(event.source + " is attacking " + event.target);
      if (event.target == 'hand-opponent-left') {
        this.turn=2;
        if (this.currentPosition.player2Left == 0)
          return this.gameLoop();

        this.player1AttackLeft(event.source);
      }
      else if (event.target == 'hand-opponent-right') {
        this.turn=2;
        if (this.currentPosition.player2Right == 0)
          return this.gameLoop();
        this.player1AttackRight(event.source);
      }
      else if (event.target == 'hand-player-right') {
        this.turn=1;
        if (this.currentPosition.player1Left == 0)
          return this.gameLoop();
        this.player2AttackRight(event.source);
      }
      else if (event.target == 'hand-player-left') {
        this.turn=1;
        if (this.currentPosition.player1Right == 0)
          return this.gameLoop();
        this.player2AttackRight(event.source);
      }
      this.mouseUpFlag = false;
      this.gameLoop();
    },
    player1AttackRight(hand) { 
      console.log("player 1 attacking right");
      var playerVal;
      if (hand == 'hand-player-left')
        playerVal = this.currentPosition.player1Left;
      else if (hand == 'hand-player-right')
        playerVal = this.currentPosition.player1Right;

      var sum = playerVal + this.currentPosition.player2Right;
      if (sum == 5)
        this.currentPosition.player2Right = 0;
      else if (sum > 5)
        this.currentPosition.player2Right = sum - 5;
      else
        this.currentPosition.player2Right = sum;
    },
    player1AttackLeft(hand) {
      console.log("player 1 attacking left");
      var playerVal;
      if (hand == 'hand-player-left')
        playerVal = this.currentPosition.player1Left;
      else if (hand == 'hand-player-right')
        playerVal = this.currentPosition.player1Right;

      var sum = playerVal + this.currentPosition.player2Left;
      if (sum == 5)
        this.currentPosition.player2Left = 0;
      else if (sum > 5)
        this.currentPosition.player2Left = sum - 5;
      else
        this.currentPosition.player2Left = sum;
    },

    player1Split(event) {
      console.log("split registered");

      if (event.target == 'hand-player-left')
        if (this.currentPosition.player1Left != 0 || this.currentPosition.player1Right % 2 != 0)
          return this.gameLoop();
        else
          this.player1SplitLeft();

      else if (event.target == 'hand-player-right')
        if (this.currentPosition.player1Right != 0 || this.currentPosition.player1Left % 2 != 0)
          return this.gameLoop();
        else
          this.player1SplitRight();

      this.turn = 1;
      this.gameLoop();
    },

    player1SplitLeft() {
      this.currentPosition.player1Left = this.currentPosition.player1Right / 2;
      this.currentPosition.player1Right = this.currentPosition.player1Right / 2;

    },

    player1SplitRight() {

      this.currentPosition.player1Right = this.currentPosition.player1Left / 2;
      this.currentPosition.player1Left = this.currentPosition.player1Left / 2;

    },

    //Player 2
    player2AttackRight(hand) { /* hand is source hand */
      console.log("player 2 attacking right");
      var playerVal;
      if (hand == 'hand-opponent-left')
        playerVal = this.currentPosition.player2Left;
      else if (hand == 'hand-opponent-right')
        playerVal = this.currentPosition.player2Right;

      var sum = playerVal + this.currentPosition.player1Right;
      if (sum == 5)
        this.currentPosition.player1Right = 0;
      else if (sum > 5)
        this.currentPosition.player1Right = sum - 5;
      else
        this.currentPosition.player1Right = sum;
    },
    player2AttackLeft(hand) {
      console.log("player 2 attacking left");
      var playerVal;
      if (hand == 'hand-opponent-left')
        playerVal = this.currentPosition.player2Left;
      else if (hand == 'hand-opponent-right')
        playerVal = this.currentPosition.player2Right;

      var sum = playerVal + this.currentPosition.player1Left;
      if (sum == 5)
        this.currentPosition.player1Left = 0;
      else if (sum > 5)
        this.currentPosition.player1Left = sum - 5;
      else
        this.currentPosition.player1Left = sum;
    },

    player2Split(event) {
      console.log("split registered");

      if (event.target == 'hand-opponent-left')
        if (this.currentPosition.player2Left != 0 || this.currentPosition.player2Right % 2 != 0)
          return this.gameLoop();
        else
          this.player2SplitLeft();

      else if (event.target == 'hand-opponent-right')
        if (this.currentPosition.player2Right != 0 || this.currentPosition.player2Left % 2 != 0)
          return this.gameLoop();
        else
          this.player2SplitRight();

      this.turn = 1;
      this.gameLoop();
    },

    player2SplitLeft() {
      this.currentPosition.player2Left = this.currentPosition.player2Right / 2;
      this.currentPosition.player2Right = this.currentPosition.player2Right / 2;

    },

    player2SplitRight() {

      this.currentPosition.player2Right = this.currentPosition.player2Left / 2;
      this.currentPosition.player2Left = this.currentPosition.player2Left / 2;

    },


    playAttackAnimation(opponentHand, playerHand) {
      /* console.log(this.$refs.gameBoard.$refs[opponentHand]); */

      const playerHandObject = this.$refs.gameBoard.$refs[playerHand];
      const playerHandPosition = playerHandObject.$el.getBoundingClientRect();
      /* console.log(playerHandObject.$el) */

      /* console.log(playerHandPosition); */

      this.$refs.gameBoard.$refs[opponentHand].AttackAnimation(playerHand, playerHandPosition);
      /* this.$refs.GameBoard[opponentHand].AttackAnimation(playerHand); */
    },
    async endGame() {
      console.log("game ended");
      if (this.turn == -1)
        return;
      this.turn = -1;
      this.boardActive = false;
      /* this.currentPosition = {
        playerLeft: 0,
        playerRight: 0,
        opponentLeft: 0,
        opponentRight: 0,
      } */

      this.isGameOverHidden = false;

      /* if (this.playerSurrenderFlag == true) {
        this.winner = this.opponent.name;
        this.loser = this.player.name;
      } */



      if (this.hasPlayer1Lost() || this.hasPlayer2Lost() ||this.surrendered) {
        this.winner = this.player2.name;
        this.loser = this.player1.name;
      }
      else {
        this.winner = this.player1.name;
        this.loser = this.player2.name;
      }

      this.$emit('game-ended');

      if (this.guest == false) {

        console.log("CALL THE GAME OVER TO DATABASE HERE")
        try {
          const token = localStorage.getItem('chopsticks_authToken');
          console.log(token);
          console.log(this.player1.name);
          console.log(this.player2.name);
          console.log(this.winner);

          const response = await axiosInstance.post('/add-game', {
            player1: this.player1.name,
            player2: this.player2.name,
            rating1: this.player1.rating,
            rating2: this.player2.rating,
            winner: this.winner,
          }, {
            headers: {
              Authorization: token,
            },
          });
          console.log("game ended, winner is: " + this.winner);
          console.log(this.pastPositions);
          console.log(response.data)

        } catch (error) {
          console.log(error)
        }


      }
    },
    disableNavbar() {
      this.$emit('disable-navbar');
      /* console.log("navbar disabled") */
    },
    enableNavbar() {
      this.$emit('enable-navbar');
      /* console.log("navbar enabled"); */
    },
    closeGameOver() {
      this.isGameOverHidden = true;
    },
    surrenderGame() {
      console.log("surrender game catched");
      /* this.playerSurrenderFlag = true; */
      this.surrendered = true;
      this.endGame();
    }
  },
  updated() {
    /* console.log("game -> " + this.boardActive); */
  },
  watch: {
    /* hasGameStarted: function (val) {
      this.boardActive = val;

      if (val == false) {
        return;
      }
      else if (this.turn == -1) {
        console.log("HERE GAME STARTS")
        this.startGame();
      }

      

    }, */
    /* else {
        console.log("HERE GAME ENDS")
        return this.endGame();
      } */

    /* playerSurrenderFlag: function (val) {
      if (val == true) {
        this.turn = -1;
        return this.endGame();
      }
    } */
  },
  /* computed: {
    computedStyles() {
      const left = this.boardPosition.left + (this.boardPosition.boardWidth - this.boardPosition.gameOverWidth) / 2
      const top = this.boardPosition.top + (this.boardPosition.boardHeight - this.boardPosition.gameOverHeight) / 2
      console.log(left, top)
      return {
        left: left + 'px',
        top: top + 'px',
      }
    }
  },
  mounted() {
    const position = document.getElementById('game-board').getBoundingClientRect();

    console.log(position);

    this.boardPosition = {
      top: position.top,
      left: position.left,
      boardWidth: position.width,
      boardHeight: position.height,
      gameOverWidth: document.getElementById('game-over').getBoundingClientRect().width,
      gameOverHeight: document.getElementById('game-over').getBoundingClientRect().height,
    };

    console.log(this.boardPosition);
  }, */
}
</script>

<template>
  <div class="game-panel">
  <div class="game-panel-wrap">
    <PlayerBar :player="player2"></PlayerBar>
    <LocalGameBoard ref='localGameBoard'
      @player1-attack="playerAttack"
      @player2-attack="playerAttack"
      @player1-split="player1Split"
      @player2-split="player2Split"
      @disable-navbar="disableNavbar"
      @enable-navbar="enableNavbar"
      :boardActive="this.boardActive"
      :player1Left="this.currentPosition.player1Left"
      :player1Right="this.currentPosition.player1Right"
      :player2Left="this.currentPosition.player2Left"
      :player2Right="this.currentPosition.player2Right"
      :mouseUpFlag="this.mouseUpFlag"
      :isGameOverHidden="this.isGameOverHidden"
      :player1="this.player1"
      :player2="this.player2"
      :winner="this.winner"
      @close-game-over="this.closeGameOver">
    </LocalGameBoard>
    <PlayerBar :player="player1"></PlayerBar>
  </div>
</div>
</template>