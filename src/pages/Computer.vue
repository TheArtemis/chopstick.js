<script>
import Game from '@/components/Game/Game.vue'
import OptionsMenu from '@/components/OptionsMenu/OptionsMenu.vue'
import GameMenu from '@/components/GameMenu/GameMenu.vue'
import PlayComputerMenu from '@/components/GameMenu/PlayComputerMenu.vue'

export default {
  name: 'Computer',
  components: {
    Game,
    OptionsMenu,
    GameMenu,
    PlayComputerMenu,
  },
  data() {
    return {
      hasGameStarted: false,
      navbarActive: true,
      buttonSwitch: true, /* When true the NEW GAME button is on and the SURRENDER is of. When it's false is vice-versa */
      mouseUpFlag: false,
    }
  },
  methods: {
    startGame() {
      this.hasGameStarted = true;
      /* console.log("computer -> " + this.hasGameStarted); */
    },
    surrenderGame() {
      this.hasGameStarted = false;
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
      console.log("mouse up catched");
    },
  },
}

</script>

<template>
  <div class="wrapper" @mouseup="noticeMouseUp">
    <OptionsMenu :navbarActive="this.navbarActive" />
    <Game :hasGameStarted="this.hasGameStarted" @enable-navbar="this.enableNavbar" @disable-navbar="this.disableNavbar"
      @game-ended="this.endGame" :mouseUpFlag="this.mouseUpFlag" />
    <PlayComputerMenu @start-game="this.startGame" @surrender-game="this.surrenderGame"
      :hasGameStarted="this.hasGameStarted" />
  </div>
</template>