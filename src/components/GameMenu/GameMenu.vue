<!-- 
    HERE GOES THE GAME MENU WITH SELECT GAME OPTIONS
 -->

<script>
    import SelectMode from './SelectMode.vue';

    export default{
        name: 'GameMenu',
        components: {
            SelectMode,
        },
    }
</script>

<template>    
    <div class="game-menu">
        <div class="buttons-box">
            <SelectMode></SelectMode>
            <button class="game-button">Play Online</button>
            <button class="game-button">Play Computer</button>
        </div>        
    </div>
</template>