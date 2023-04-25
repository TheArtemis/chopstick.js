<script>
    export default {
        name: 'PlayerHand',
    }
</script>

<template>
    <div                
      @mousedown="startDrag"
      @touchstart="startDrag"
      @mouseup="stopDrag"
      @touchend="stopDrag"
      ></div>
</template>