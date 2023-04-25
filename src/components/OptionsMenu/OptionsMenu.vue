<!-- 
    LEFT OPTIONS MENU GOES HERE
 -->

<script>
    export default{
        name: 'OptionsMenu',
    }
</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <div class="options-menu">
        <div class="sidebar">
            <h1>Chopsticks</h1>
                <ul>
                    <li><i class="fa-solid fa-user"></i>   Profile</li>
                    <li><i class="fa-solid fa-users"></i>   Friends</li>
                    <li><i class="fa-solid fa-list-ul"></i>   Recent Games</li>
                    <li><i class="fa-solid fa-chart-simple"></i>   Stats</li>
               </ul>
            <h2>
               <li id="Settings"><i class="fa-solid fa-gear"></i>   Settings</li>
            </h2>
        </div>
     </div>
</template>