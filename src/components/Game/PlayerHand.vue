<script>
export default {
    name: 'PlayerHand',
    props: {
        side: String,

    },
};
</script>

<template>
    <div :class="[`hand player ${side}`]"></div>
</template>