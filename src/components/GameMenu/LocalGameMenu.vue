<template>
    <div class="game-menu">
        <button class="game-button" :class="{ inactive: hasGameStarted }" @click="startGame">New Game</button>
        <button class="game-button last" :class="{ inactive: !hasGameStarted }" @click="surrenderGame">Surrender</button>
    </div>
</template>

<script>
import GameOver from '@/components/Game/GameOver.vue'

export default {
    name: 'LocalGameMenu',
    props: {
        hasGameStarted: Boolean,
    },
    components: {
        GameOver
    },
    methods: {
        startGame() {
            this.$emit('start-game');
        },
        surrenderGame() {
            this.$emit('surrender-game');
        }
    },
    /* watch: {
    hasGameStarted: function (val) {   
        this.hasGameStarted = val;
        }
    }  */

}
</script>