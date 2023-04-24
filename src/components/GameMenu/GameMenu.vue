<!-- 
    HERE GOES THE GAME MENU WITH SELECT GAME OPTIONS
 -->

<script>
    export default{
        name: 'GameMenu',
    }
</script>

<template>
    <div>Game Menu</div>
    <div style=" width: 20%;
        position: absolute;
        top: 0;
        left: 80%;
        height: 100vh;
        padding: 20px;
        background-color: #171616;
        float: right;
        color: white;"
        >
        <button style=" margin: auto; background-color: #811394; color: white; padding: 16px 32px; border-radius: 25px; border: none; font-size: 20px;">Play Online</button>
        <button style="margin: auto; background-color: #811394; color: white; padding: 16px 32px; border-radius: 25px; border: none; font-size: 20px;">Play Computer</button>
    </div>
</template>