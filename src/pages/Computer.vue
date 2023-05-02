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
      }
    },    
  }

</script>

<template>
  <div class="wrapper">
    <OptionsMenu/>
    <Game      
      :hasGameStarted="this.hasGameStarted"/>    
    <PlayComputerMenu
      @start-game="this.startGame"
      @surrender-game="this.surrenderGame"
      :hasGameStarted="this.hasGameStarted"/>
  </div>  
</template>