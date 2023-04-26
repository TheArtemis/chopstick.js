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
        <div class="game-dropdown-menu" v-if="showMenu">
            <DropdownComponent :isActive="showMenu" mode="Easy" modeIcon="" class="first"></DropdownComponent>
            <DropdownComponent :isActive="showMenu" mode="Medium" modeIcon=""></DropdownComponent>
            <DropdownComponent :isActive="showMenu" mode="Hard" modeIcon=""></DropdownComponent>
        </div>
    </div>
</template>