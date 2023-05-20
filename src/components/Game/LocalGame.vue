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
  hasPlayer1Lost() {
    if (this.currentPosition.player1Left === 0 && this.currentPosition.player1Right === 0) {
      return true;
    }
    return false;
  },
  hasPlayer2Lost() {
    if (this.currentPosition.player2Left === 0 && this.currentPosition.player2Right === 0) {
      return true;
    }
    return false;
  },
  isGameOver() {
    if (this.hasPlayer1Lost() || this.hasPlayer2Lost()) {
      console.log("someone lost");
      return true;
    }
    return false;
  },

  /* Local Game Initialization and Execution */
  initLocalGame() {
    console.log("now is player1 turn");
    this.boardActive = true;
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
  if (this.isGameOver()) {
    return this.endGame();
  }

  this.pastPositions.push([
    this.currentPosition.player1Left,
    this.currentPosition.player1Right,
    this.currentPosition.player2Left,
    this.currentPosition.player2Right,
  ]);

  setTimeout(() => {
    this.gameLoop();
  }, 0);
},



  playerAttack(event) {
    console.log(`${event.source} is attacking ${event.target}`);

    const currentPlayer = (event.source === 'hand-player1-left') ? 'player1' : 'player2';
    const opponent = (event.source === 'player1') ? 'player2' : 'player1';
    const sourceHand = event.source;
    const targetHand = event.target;

    if (targetHand === `hand-${opponent}-left`) {
      if (this.currentPosition[`${opponent}Left`] === 0) {
        return this.gameLoop();
      }
      this.attack(currentPlayer, sourceHand, opponent, 'Left');
    } else if (targetHand === `hand-${opponent}-right`) {
      if (this.currentPosition[`${opponent}Right`] === 0) {
        return this.gameLoop();
      }
      this.attack(currentPlayer, sourceHand, opponent, 'Right');
    }

    this.$emit('update:mouseUpFlag', false);
    this.gameLoop();
  },

  attack(attacker, sourceHand, defender, targetHand) {
    console.log(`${attacker} attacking ${targetHand.toLowerCase()}`);
    const attackerVal = this.currentPosition[`${attacker}${sourceHand.split('-')[2]}`];
    const defenderVal = this.currentPosition[`${defender}${targetHand}`];

    const sum = attackerVal + defenderVal;
    if (sum >= 5) {
      this.currentPosition[`${defender}${targetHand}`] = sum - 5;
    } else {
      this.currentPosition[`${defender}${targetHand}`] = sum;
    }
  },

  playerSplit(event) {
    console.log("split registered");

    const currentPlayer = this.turn;
    const targetHand = event.target;

    if (targetHand === 'hand-player1-left' || targetHand === 'hand-player1-right') {
      if (this.currentPosition.player1Left === 0 || this.currentPosition.player1Right % 2 !== 0) {
        return this.gameLoop();
      }
      this.split(currentPlayer, 'Left');
    } else if (targetHand === 'hand-player2-left' || targetHand === 'hand-player2-right') {
      if (this.currentPosition.player1Right === 0 || this.currentPosition.player1Left % 2 !== 0) {
        return this.gameLoop();
      }
      this.split(currentPlayer, 'Right');
    }
    this.gameLoop();
  },

  split(player, hand) {
    console.log(`${player} splitting ${hand.toLowerCase()}`);
    const handValue = this.currentPosition[`${player}${hand}`];
    this.currentPosition[`${player}${hand}`] = handValue / 2;
    this.currentPosition[`${player}${hand === 'Left' ? 'Right' : 'Left'}`] = handValue / 2;
  },

  async endGame() {
    console.log("game ended");
    this.boardActive = false;

    this.isGameOverHidden = false;

    if (this.hasPlayer1Lost() || this.hasPlayer2Lost() || this.surrendered) {
      this.winner = this.player2.name;
      this.loser = this.player1.name;
    } else {
      this.winner = this.player1.name;
      this.loser = this.player2.name;
    }

    this.$emit('game-ended');

    if (this.guest === false) {
      console.log("CALL THE GAME OVER TO DATABASE HERE");
      try {
        const token = localStorage.getItem('chopsticks_authToken');
        console.log(token);
        console.log(this.player1.name);
        console.log(this.player2.name);
        console.log(this.winner);

        const response = await axiosInstance.post(
          '/add-game',
          {
            player1: this.player1.name,
            player2: this.player2.name,
            rating1: this.player1.rating,
            rating2: this.player2.rating,
            winner: this.winner,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("game ended, winner is: " + this.winner);
        console.log(this.pastPositions);
        console.log(response.data);
      } catch (error) {
        console.log(error);
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
    console.log("surrender game caught");
    /* this.playerSurrenderFlag = true; */
    this.surrendered = true;
    this.endGame();
  },
}

}
</script>

<template>
  <div class="game-panel">
    <div class="game-panel-wrap">
      <PlayerBar :player="player2"></PlayerBar>
      <LocalGameBoard ref="localGameBoard"
        @player1-attack="playerAttack($event)"
        @player2-attack="playerAttack($event)"
        @player1-split="playerSplit"
        @player2-split="playerSplit"
        @disable-navbar="disableNavbar"
        @enable-navbar="enableNavbar"
        :boardActive="boardActive"
        :player1Left="currentPosition.player1Left"
        :player1Right="currentPosition.player1Right"
        :player2Left="currentPosition.player2Left"
        :player2Right="currentPosition.player2Right"
        :mouseUpFlag="mouseUpFlag"
        :isGameOverHidden="isGameOverHidden"
        :player1="player1"
        :player2="player2"
        :winner="winner"
        @close-game-over="closeGameOver"
      ></LocalGameBoard>
      <PlayerBar :player="player1"></PlayerBar>
    </div>
  </div>
</template>

