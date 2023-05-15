<!-- 
    HERE GOES THE GAME MENU WITH SELECT GAME OPTIONS
 -->

<script>
import SelectMode from '@/components/GameMenu/SelectMode.vue';

export default {
    name: 'GameMenu',
    components: {
        SelectMode,
    },
    methods: {
        goToPlayComputerPage() {
            this.$router.push('/play/computer');
        },
        goToLocalMatchPage() {
            this.$router.push('/play/local');
        },
    },
}

</script>

<template>
    <div class="game-menu">
        <div class="buttons-box">
            <button class="game-button" @click="goToLocalMatchPage">Local Match</button>
            <button class="game-button" @click="goToPlayComputerPage">Play Computer</button>
            <SelectMode></SelectMode>
        </div>
    </div>
</template>