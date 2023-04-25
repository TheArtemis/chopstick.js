<!-- 
    LEFT OPTIONS MENU GOES HERE
 -->

<script>
    export default{
        name: 'OptionsMenu',
    }
</script>

<template>
    <div class="options-menu">
        <h1>Chopstick</h1>
        <table>
            <thead>
                <tr onclick="alert('Cliccato sulla prima riga!')">
                    <td><font size="5">Play</font></td>
                </tr>
                <tr onclick="alert('Cliccato sulla seconda riga!')">
                    <td><font size="5">Recent Game</font></td>
                </tr>
                <tr onclick="alert('Cliccato sulla terza riga!')">
                    <td><font size="5">Stats</font></td>
                </tr>
                <tr onclick="alert('Cliccato sulla quarta riga!')">
                    <td><font size="5">Friends</font></td>
                </tr>
                <tr onclick="alert('Cliccato sulla quinta riga!')">
                    <td><font size="5">Settings</font></td>
                </tr>
            </thead>
        </table>
    </div>
       
   
</template>