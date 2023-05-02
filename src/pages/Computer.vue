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
    data(){
      return {
        hasGameStarted: false,
        navbarActive: true,
      }
    },
    methods: {
      startGame(){
        this.hasGameStarted = true;
        /* console.log("computer -> " + this.hasGameStarted); */
      },
      surrenderGame(){
        this.hasGameStarted = false;
        /* console.log("computer -> " + this.hasGameStarted); */
      },
      enableNavbar(){
        this.navbarActive = true;
        /* console.log("navbar enabled on computer")
        console.log(this.navbarActive) */
      },
      disableNavbar(){
        this.navbarActive = false;
        /* console.log("navbar disabled on computer")
        console.log(this.navbarActive) */
      },
    },    
  }

</script>

<template>
  <div class="wrapper">
    <OptionsMenu
     :navbarActive="this.navbarActive"/>
    <Game      
      :hasGameStarted="this.hasGameStarted"
      @enable-navbar="this.enableNavbar"
      @disable-navbar="this.disableNavbar"/>    
    <PlayComputerMenu
      @start-game="this.startGame"
      @surrender-game="this.surrenderGame"
      :hasGameStarted="this.hasGameStarted"/>
  </div>  
</template>