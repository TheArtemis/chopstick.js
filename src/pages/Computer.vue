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
    }
  }

</script>

<template>
  <div class="wrapper">
    <OptionsMenu/>
    <Game/>    
    <PlayComputerMenu/>
  </div>  
</template>