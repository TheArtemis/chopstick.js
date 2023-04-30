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
        <div class = "player-bar-info">
            <span class="player-bar-name">{{player.name}}</span>
            <span class="player-bar-rating">({{player.rating}})</span>
        </div>
    </div>
</template>