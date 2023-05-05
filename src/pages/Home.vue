<script>
import Game from '@/components/Game/Game.vue'
import Navbar from '@/components/Navbar/Navbar.vue'
import GameMenu from '@/components/GameMenu/GameMenu.vue'

export default {
  name: 'App',
  components: {
    Game,
    Navbar,
    GameMenu,
  }
}

</script>

<template>
  <div class="wrapper">
    <OptionsMenu />
    <Game />
    <GameMenu />
  </div>
</template>