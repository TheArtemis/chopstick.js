<script>
    export default {
        name: 'PlayerBar',
        props: {
            player : Object,
        }
    };
</script>

<template>
    <div class = "player-bar">
        <div class = "player-bar-picture">
            <img :src = "player.picture" alt = "player picture">
        </div>
        <div class = "player-bar-name">
            <h3>{{player.name}}</h3>
        </div>
    </div>
</template>