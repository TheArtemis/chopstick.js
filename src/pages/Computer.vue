<script>
import Game from '@/components/Game/Game.vue'
import Navbar from '@/components/Navbar/Navbar.vue'
import GameMenu from '@/components/GameMenu/GameMenu.vue'
import PlayComputerMenu from '@/components/GameMenu/PlayComputerMenu.vue'

export default {
  name: 'Computer',
  components: {
    Game,
    Navbar,
    GameMenu,
    PlayComputerMenu,
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
      /* console.log("computer -> " + this.hasGameStarted); */
    },
    surrenderGame() {
      /* this.hasGameStarted = false;
      this.playerSurrenderFlag = true; */
      this.$refs.game.surrenderGame();
      /* console.log("computer -> " + this.hasGameStarted); */
    },
    enableNavbar() {
      this.navbarActive = true;
      /* console.log("navbar enabled on computer")
      console.log(this.navbarActive) */
    },
    disableNavbar() {
      this.navbarActive = false;
      /* console.log("navbar disabled on computer")
      console.log(this.navbarActive) */
    },
    endGame() {
      console.log("end game catched");
      this.hasGameStarted = !this.hasGameStarted;
    },
    noticeMouseUp() {
      this.mouseUpFlag = !this.mouseUpFlag;
      /* console.log("mouse up catched"); */
    },
  },
}

</script>

<template>
  <div class="wrapper" @mouseup="noticeMouseUp">
    <Navbar :navbarActive="this.navbarActive" />
    <Game ref="game" :hasGameStarted="this.hasGameStarted" @enable-navbar="this.enableNavbar"
      @disable-navbar="this.disableNavbar" @game-ended="this.endGame" :mouseUpFlag="this.mouseUpFlag"
      :playerSurrenderFlag="this.playerSurrenderFlag" />
    <PlayComputerMenu @start-game="this.startGame" @surrender-game="this.surrenderGame"
      :hasGameStarted="this.hasGameStarted" />
  </div>
</template>