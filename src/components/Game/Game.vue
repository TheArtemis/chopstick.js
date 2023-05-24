<script>
import GameBoard from '@/components/Game/GameBoard.vue'
import PlayerBar from '@/components/Game/PlayerBar.vue'
import GameOver from '@/components/Game/GameOver.vue'

import axiosInstance from '@/services/axiosIstance.js';

export default {
  name: 'Game',
  props: {
    mouseUpFlag: Boolean,
    hasGameStarted: Boolean,
  },
  components: {
    GameBoard,
    PlayerBar,
    GameOver,
  },
  data() {
    return {
      boardPosition: { top: 0, left: 0, boardWidth: 0, boardHeight: 0, gameOverWidth: 0, gameOverHeight: 0 },
      pastPositions: [],
      currentPosition: {
        playerLeft: 0,
        playerRight: 0,
        opponentLeft: 0,
        opponentRight: 0,
      },
      boardActive: this.hasGameStarted,
      turn: -1, /* 0 is player 1 is opponent */
      player: {
        name: 'Guest',
        rating: '0000',
        picture: '/src/assets/imgs/img3.png'
      },
      opponent: {
        name: 'Handy',
        rating: '8080',
        picture: '/src/assets/imgs/pc.png'
      },
      winner: null,
      loser: null,
      isGameOverHidden: true,
      guest: true,
      surrendered: false,
    }
  },
  async created() {
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
      this.player.name = 'Guest';
      this.player.rating = '0000';
      this.player.picture = '/src/assets/imgs/img3.png'
    }
    else {
      this.guest = false;
      console.log("not guest");
      this.player.name = JSON.parse(localStorage.getItem('chopsticks_userInfo')).username;
      this.player.rating = JSON.parse(localStorage.getItem('chopsticks_userInfo')).rating;
      if (JSON.parse(localStorage.getItem('chopsticks_userInfo')).picture == null)
        this.player.picture = '/src/assets/imgs/img3.png'
      else {
        console.log("picture is not null");
        this.player.picture = JSON.parse(localStorage.getItem('chopsticks_userInfo')).picture;
      }
    }
  },
  methods: {
    /* Game Over Conditions */

    // Checks if the current player has lost by examining if both the player's left and right positions are empty.
    hasPlayerLost() {
      if (this.currentPosition.playerLeft == 0 && this.currentPosition.playerRight == 0)
        return true;
      return false;
    },
    // Checks if the opponent has lost by examining if both the opponent's left and right positions are empty
    hasOpponentLost() {
      if (this.currentPosition.opponentLeft == 0 && this.currentPosition.opponentRight == 0)
        return true;
      return false;
    },
    // Determines if the game is over by checking if either the player or the opponent has lost, and logs a message indicating that someone has lost.
    isGameOver() {
      if (this.hasPlayerLost() || this.hasOpponentLost()) {
        console.log("someone lost")
        return true;
      }
    },

    /* Game Initialization and Execution */

    initGame() {
      const initTurn = Math.round(Math.random());
      this.boardActive = true;
      this.turn = initTurn;
      this.pastPositions = [];
      this.currentPosition = {
        playerLeft: 1,
        playerRight: 1,
        opponentLeft: 1,
        opponentRight: 1,
      };
      this.isGameOverHidden = true;
      this.winner = null;
      this.loser = null;
      this.surrendered = false;
    },
    startGame() {
      console.log("game started");
      this.initGame();
      this.gameLoop();
    },
    gameLoop() {
      if (this.isGameOver())
        return this.endGame();

      /* console.log("E' il turno di " + this.turn); */

      this.pastPositions.push([this.currentPosition.playerLeft, this.currentPosition.playerRight, this.currentPosition.opponentLeft, this.currentPosition.opponentRight]);

      if (this.turn == 1)
        this.computerAction();

      if (this.turn == 0)
        console.log("player turn");
    },
    async computerAction() {
      if (this.isGameOver()) {
        return this.endGame();
      }

      /* Deactivate player hands */
      this.boardActive = false;

      /* console.log("computer is thinking"); */
      await new Promise(resolve => setTimeout(resolve, 1000))
      /* console.log("computer attack"); */

      if (this.currentPosition.opponentLeft == 0 && this.currentPosition.opponentRight % 2 == 0 || this.currentPosition.opponentRight == 0 && this.currentPosition.opponentLeft % 2 == 0) {
        const dec = Math.round(Math.random());
        if (dec == 0)
          this.computerAttack();
        else
          this.computerSplit();
      }
      else
        this.computerAttack();

      /* Activate Player Hands */
      this.boardActive = true;
      this.turn = 0;
      this.gameLoop();

    },
    computerSplit() {
      console.log("computer splitting");
      if (this.currentPosition.opponentLeft == 0) {
        this.currentPosition.opponentLeft = this.currentPosition.opponentRight / 2;
        this.currentPosition.opponentRight = this.currentPosition.opponentRight / 2;
      }
      else if (this.currentPosition.opponentRight == 0) {
        this.currentPosition.opponentRight = this.currentPosition.opponentLeft / 2;
        this.currentPosition.opponentLeft = this.currentPosition.opponentLeft / 2;
      }
    },
    computerAttack() {
      let currHandValue; /* Current value hand for opponent */
      let currHandId; /* Current hand id for opponent */
      if (this.currentPosition.opponentLeft == 0) {
        currHandValue = this.currentPosition.opponentRight;
        currHandId = 'hand-opponent-right';
      }
      else if (this.currentPosition.opponentRight == 0) {
        currHandValue = this.currentPosition.opponentLeft;
        currHandId = 'hand-opponent-left';
      }
      else {
        const hnd = Math.round(Math.random());
        if (hnd == 1) {
          currHandValue = this.currentPosition.opponentLeft;
          currHandId = 'hand-opponent-left';
        }
        else {
          currHandValue = this.currentPosition.opponentRight;
          currHandId = 'hand-opponent-right';
        }
      }

      if (this.currentPosition.playerLeft == 0) /* Se la mano sinistre è morta attacca la destra */
        this.computerAttackRight(currHandValue, currHandId);
      else if (this.currentPosition.playerRight == 0) /* Se la mano destra è morta attacca la sinistra */
        this.computerAttackLeft(currHandValue, currHandId);
      else {
        const hnd = Math.round(Math.random());
        if (hnd == 0)
          this.computerAttackLeft(currHandValue, currHandId);
        else
          this.computerAttackRight(currHandValue, currHandId);
      }
    },
    playerAttack(event) {
      console.log(event.source + " is attacking " + event.target);
      if (event.target == 'hand-opponent-left') {
        if (this.currentPosition.opponentLeft == 0)
          return this.gameLoop();

        this.playerAttackLeft(event.source);
      }
      else if (event.target == 'hand-opponent-right') {
        if (this.currentPosition.opponentRight == 0)
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
      if (sum == 5)
        this.currentPosition.opponentRight = 0;
      else if (sum > 5)
        this.currentPosition.opponentRight = sum - 5;
      else
        this.currentPosition.opponentRight = sum;
    },
    playerAttackLeft(hand) {
      console.log("player attacking left");
      var playerVal;
      if (hand == 'hand-player-left')
        playerVal = this.currentPosition.playerLeft;
      else if (hand == 'hand-player-right')
        playerVal = this.currentPosition.playerRight;

      var sum = playerVal + this.currentPosition.opponentLeft;
      if (sum == 5)
        this.currentPosition.opponentLeft = 0;
      else if (sum > 5)
        this.currentPosition.opponentLeft = sum - 5;
      else
        this.currentPosition.opponentLeft = sum;
    },

    playerSplit(event) {
      console.log("split registered");

      if (event.target == 'hand-player-left')
        if (this.currentPosition.playerLeft != 0 || this.currentPosition.playerRight % 2 != 0)
          return this.gameLoop();
        else
          this.playerSplitLeft();

      else if (event.target == 'hand-player-right')
        if (this.currentPosition.playerRight != 0 || this.currentPosition.playerLeft % 2 != 0)
          return this.gameLoop();
        else
          this.playerSplitRight();

      this.turn = 1;
      this.gameLoop();
    },

    playerSplitLeft() {
      this.currentPosition.playerLeft = this.currentPosition.playerRight / 2;
      this.currentPosition.playerRight = this.currentPosition.playerRight / 2;
    },

    playerSplitRight() {
      this.currentPosition.playerRight = this.currentPosition.playerLeft / 2;
      this.currentPosition.playerLeft = this.currentPosition.playerLeft / 2;
    },

    computerAttackLeft(handValue, handId) {
      console.log("attacking left with value " + handValue);

      this.playAttackAnimation(handId, 'hand-player-left');

      var sum = handValue + this.currentPosition.playerLeft;
      if (sum == 5)
        this.currentPosition.playerLeft = 0;
      else if (sum > 5)
        this.currentPosition.playerLeft = sum - 5;
      else
        this.currentPosition.playerLeft = sum;

      console.log("new value for left is " + this.currentPosition.playerLeft);
    },
    computerAttackRight(handValue, handId) {
      console.log("attacking right with value " + handValue);

      this.playAttackAnimation(handId, 'hand-player-right');

      var sum = handValue + this.currentPosition.playerRight;
      if (sum == 5)
        this.currentPosition.playerRight = 0;
      else if (sum > 5)
        this.currentPosition.playerRight = sum - 5;
      else
        this.currentPosition.playerRight = sum;
      console.log("new value for right is " + this.currentPosition.playerRight);
    },



    playAttackAnimation(opponentHand, playerHand) {
      const playerHandObject = this.$refs.gameBoard.$refs[playerHand];
      const playerHandPosition = playerHandObject.$el.getBoundingClientRect();

      this.$refs.gameBoard.$refs[opponentHand].AttackAnimation(playerHand, playerHandPosition);

    },
    async endGame() {
      console.log("game ended");
      if (this.turn == -1)
        return;
      this.turn = -1;
      this.boardActive = false;
      this.isGameOverHidden = false;

      if (this.hasPlayerLost() || this.surrendered) {
        this.winner = this.opponent.name;
        this.loser = this.player.name;
      }
      else {
        this.winner = this.player.name;
        this.loser = this.opponent.name;
      }

      this.$emit('game-ended');

      if (this.guest == false) {

        /* console.log("CALL THE GAME OVER TO DATABASE HERE") */
        try {
          const token = localStorage.getItem('chopsticks_authToken');
          console.log(token);
          console.log(this.player.name);
          console.log(this.opponent.name);
          console.log(this.winner);

          this.updateRating();

          const response = await axiosInstance.post('/add-game', {
            player1: this.player.name,
            player2: this.opponent.name,
            rating1: this.player.rating,
            rating2: this.opponent.rating,
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
    async updateRating() {
      if (this.winner == this.player.name) {
        this.player.rating = this.player.rating + 10;
      }
      else if (this.winner == this.opponent.name) {
        this.player.rating = this.player.rating - 10;
      }
      const token = localStorage.getItem('chopsticks_authToken');
      const response = await axiosInstance.post('/update-rating', {
        username: this.player.name,
        rating: this.player.rating,
      }, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data)

      const user = JSON.parse(localStorage.getItem('chopsticks_userInfo'));
      user.rating = this.player.rating;
      localStorage.setItem('chopsticks_userInfo', JSON.stringify(user));

    },
    disableNavbar() {
      this.$emit('disable-navbar');
    },
    enableNavbar() {
      this.$emit('enable-navbar');
    },
    closeGameOver() {
      this.isGameOverHidden = true;
    },
    surrenderGame() {
      this.surrendered = true;
      this.endGame();
    }
  },
}
</script>

<template>
  <div class="game-panel">
    <div class="game-panel-wrap">
      <PlayerBar :player="opponent"></PlayerBar>
      <GameBoard ref='gameBoard' @player-attack="playerAttack" @player-split="playerSplit" @disable-navbar="disableNavbar"
        @enable-navbar="enableNavbar" :boardActive="this.boardActive" :playerLeft="this.currentPosition.playerLeft"
        :playerRight="this.currentPosition.playerRight" :opponentLeft="this.currentPosition.opponentLeft"
        :opponentRight="this.currentPosition.opponentRight" :mouseUpFlag="this.mouseUpFlag"
        :isGameOverHidden="this.isGameOverHidden" :player="this.player" :opponent="this.opponent" :winner="this.winner"
        @close-game-over="this.closeGameOver">
      </GameBoard>
      <PlayerBar :player="player"></PlayerBar>
    </div>
  </div>
</template>