<script>
    import DropdownComponent from './DropdownComponent.vue';

    export default{
        name: 'SelectMode',
        data(){
            return{
                showMenu: false,
            }
        },
        components: {
            DropdownComponent,
        },
    }
</script>

<template>    
    <div class="select-mode">
        <button class="game-button" @click="showMenu=!showMenu">Mode</button>
        <Transition name="fade" appear> 
        <div class="game-dropdown-menu" v-if="showMenu">
            <DropdownComponent mode="Easy" modeIcon="" class="first"></DropdownComponent>
            <DropdownComponent mode="Medium" modeIcon=""></DropdownComponent>
            <DropdownComponent mode="Hard" modeIcon=""></DropdownComponent>
        </div>
    </Transition>  
    </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;    
  }
</style>