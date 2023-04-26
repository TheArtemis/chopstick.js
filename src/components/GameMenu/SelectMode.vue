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
        <transition name="fade" mode="out-in" appear> 
        <div class="game-dropdown-menu" v-if="showMenu">
            <DropdownComponent :isActive="showMenu" mode="Easy" modeIcon="" class="first"></DropdownComponent>
            <DropdownComponent :isActive="showMenu" mode="Medium" modeIcon=""></DropdownComponent>
            <DropdownComponent :isActive="showMenu" mode="Hard" modeIcon=""></DropdownComponent>
        </div>
    </transition>  
    </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0; 
    background-color: blue !important;
  }

  .fade-enter-to, .fade-leave-from {
    opacity: 1;
  }
</style>