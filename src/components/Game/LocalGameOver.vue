<script>
export default {
    name: 'LocalGameOver',
    props: {
        winner: String,
        position: {
            type: Object,
        },
        isHidden: String,
        player1: {
            type: Object,
        },
        player2: {
            type: Object,
        },
    },
    data() {
        return {}
    },
    computed: {
        computeWinner() {
            /* console.log(this.winner); */
            if (this.winner == this.player1.name)
                return "You have won!";
            else if (this.winner == this.player2.name)
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
    /* watch: {
        winner: function () {
            this.computeWinner();
        }
    } */
};
</script>

<template>
    <div class="game-over" :class="isHidden">
        <div class="close-game-over" @click="this.closeGameOver" @touchend="this.closeGameOver"></div>
        <h1 class="game-over-top">Game Over</h1>
        <div class="game-over-mid">
            <div class="game-over-pic player-pic" :class="this.winner == `${this.player1.name}` ? 'winner' : 'loser'">
                <img :src="this.player1.picture" alt="player 1 picture" />
            </div>
            <div class="game-over-pic opponent-pic" :class="this.winner == `${this.player2.name}` ? 'loser' : 'winner'">
                <img :src="this.player2.picture" alt="player 2 picture" />
            </div>
        </div>
        <div class="game-over-result-wrapper" :class="isHidden">
            <h2 class="game-over-result">{{ computeWinner }}</h2>
        </div>

    </div>
</template>