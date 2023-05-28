<script>
export default {
    name: 'GameMenu',
    methods: {
        goToPlayComputerPage() {
            this.$router.push('/play/computer');
        },
    },
}

</script>

<template>
    <div class="game-menu">
        <div class="buttons-box">
            <button class="game-button" @click="goToPlayComputerPage">Play Computer</button>
            <SelectMode></SelectMode>
        </div>
    </div>
</template>