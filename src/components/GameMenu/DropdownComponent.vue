<script>
    export default {
        name: 'DropdownComponent',
        props: {
            mode : String,
            modeIcon: String,            
        },        
    }
</script>

<!-- :class="{'game-dropdown-component': true, 'show': isActive}" -->

<template>
    
        <div class="game-dropdown-component">
        <h4>{{ mode }}</h4>
        <div style="display: flex;">
            <button class="dropdown-button">1 min</button>
            <button class="dropdown-button">2 min</button>
            <button class="dropdown-button">3 min</button>            
        </div>        
    </div>
     
</template>



