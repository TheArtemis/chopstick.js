<script>
export default {
    name: 'GameOver',
    props: {
        winner: String,
        position: {
            type: Object,
        },
        isHidden: String,
        player: {
            type: Object,
        },
        opponent: {
            type: Object,
        },
    },
    data() {
        return {}
    },
    computed: {
        computeWinner() {
            if (this.winner == this.player.name)
                return "You have won!";
            else if (this.winner == this.opponent.name)
                return "You have lost!";
            else
                return ""
        }
    },
    methods: {
        closeGameOver() {
            this.$emit('close-game-over');
        }
    },
};
</script>

<template>
    <div class="game-over" :class="isHidden">
        <div class="close-game-over" @click="this.closeGameOver" @touchend="this.closeGameOver"></div>
        <h1 class="game-over-top">Game Over</h1>
        <div class="game-over-mid">
            <div class="game-over-pic player-pic" :class="this.winner == `${this.player.name}` ? 'winner' : 'loser'">
                <img :src="this.player.picture" alt="player picture" />
            </div>
            <div class="game-over-pic opponent-pic" :class="this.winner == `${this.player.name}` ? 'loser' : 'winner'">
                <img :src="this.opponent.picture" alt="opponent picture" />
            </div>
        </div>
        <div class="game-over-result-wrapper" :class="isHidden">
            <h2 class="game-over-result">{{ computeWinner }}</h2>
        </div>

    </div>
</template>