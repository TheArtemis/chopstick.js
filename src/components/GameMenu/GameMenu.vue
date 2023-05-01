<!-- 
    HERE GOES THE GAME MENU WITH SELECT GAME OPTIONS
 -->

<script>
    import SelectMode from '@/components/GameMenu/SelectMode.vue';

    export default{
        name: 'GameMenu',
        components: {
            SelectMode,
        },
        methods:{
            goToPlayComputerPage(){
                this.$router.push('/play/computer');
            }
        }
    }
</script>

<template>    
    <div class="game-menu">
        <div class="buttons-box">            
            <button class="game-button">Play Online</button>
            <button class="game-button" @click="goToPlayComputerPage">Play Computer</button>
            <SelectMode></SelectMode>
        </div>        
    </div>
</template>