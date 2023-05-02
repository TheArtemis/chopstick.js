<template>
    <div class="game-menu">
        <button 
            class="game-button"
            :class="{inactive: hasGameStarted}"
            @click="startGame">New Game</button>
        <button 
            class="game-button last"
            :class="{inactive: !hasGameStarted}"
            @click="surrenderGame">Surrender</button>
    </div>
</template>

<script>
    export default {
        name: 'PlayComputerMenu',
        props:{
            hasGameStarted: Boolean,
        },
        methods: {
            startGame(){                
                this.$emit('start-game');
            },
            surrenderGame(){
                this.$emit('surrender-game');
            }
        }

    }
</script>