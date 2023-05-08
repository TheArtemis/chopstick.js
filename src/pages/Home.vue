<script>
import Game from '@/components/Game/Game.vue'
import Navbar from '@/components/Navbar/Navbar.vue'
import GameMenu from '@/components/GameMenu/GameMenu.vue'

export default {
  name: 'App',
  created() {
    const colors = localStorage.getItem('colors');
    if (colors === 'true') {
      document.documentElement.setAttribute('data-colors', 'light');
    } else {
      document.documentElement.removeAttribute('data-colors');
    }
   },
  components: {
    Game,
    Navbar,
    GameMenu,
  }
}

</script>

<template>
  <div class="wrapper">
    <Navbar />
    <Game />
    <GameMenu />
  </div>
</template>