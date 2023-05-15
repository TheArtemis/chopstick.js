<template>
    <div class="wrapper" @mouseup="noticeMouseUp">
      <Navbar :navbarActive="this.navbarActive" />
      <Game ref="game" :hasGameStarted="this.hasGameStarted" @enable-navbar="this.enableNavbar"
        @disable-navbar="this.disableNavbar" @game-ended="this.endGame" :mouseUpFlag="this.mouseUpFlag"
        :playerSurrenderFlag="this.playerSurrenderFlag" />
      <LocalGameMenu @start-game="this.startGame" @surrender-game="this.surrenderGame"
        :hasGameStarted="this.hasGameStarted" />
    </div>
  </template>
  
  <script>
  import Game from '@/components/Game/Game.vue'
  import Navbar from '@/components/Navbar/Navbar.vue'
  import GameMenu from '@/components/GameMenu/GameMenu.vue'
  import LocalGameMenu from '@/components/GameMenu/LocalGameMenu.vue'
  
  export default {
    name: 'Local',
    components: {
      Game,
      Navbar,
      LocalGameMenu,
    },
    data() {
      return {
        hasGameStarted: false,
        navbarActive: true,
        buttonSwitch: true, /* When true the NEW GAME button is on and the SURRENDER is of. When it's false is vice-versa */
        mouseUpFlag: false,
        playerSurrenderFlag: false,
      }
    },
    methods: {
      startGame() {
        this.hasGameStarted = true;
        this.$refs.game.startGame();
      },
      surrenderGame() {
        this.$refs.game.surrenderGame();
      },
      enableNavbar() {
        this.navbarActive = true;
      },
      disableNavbar() {
        this.navbarActive = false;
      },
      endGame() {
        this.hasGameStarted = !this.hasGameStarted;
      },
      noticeMouseUp() {
        this.mouseUpFlag = !this.mouseUpFlag;
      },
    },
  }
  </script>