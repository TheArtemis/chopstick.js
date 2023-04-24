<script>
  import Game from './components/Game/Game.vue'
  import OptionsMenu from './components/OptionsMenu/OptionsMenu.vue'
  import GameMenu from './components/GameMenu/GameMenu.vue'

  export default {
    name: 'App',
    components: {
      Game,
      OptionsMenu,
      GameMenu,
    }
  }

</script>

<template>
  <div>Hello World</div>
  <Game/>
  <OptionsMenu/>
  <GameMenu/>
</template>