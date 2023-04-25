<script>
export default {
    name: 'Game',  
    
}
</script>

<template>
  <div class="game-panel">
    <div class="game-board">
      <div class = "game-opponent">
        <div class="hand opponent right"></div>
        <div class="hand opponent left"></div>      
    </div>
    <div class="game-player">
      <div class="hand player left"></div>
      <div class="hand player right"></div>
    </div>
    </div>        
  </div>
  <!-- <div style="width: 60%;
        position: absolute;
        top: 0;
        left: 20%;
        height: 100vh;
        padding: 20px;
        background-color: #171616;
        color: white;">
         <table style= "width: 50%; height: 50%; background-color: #811394; margin-top: 12%; margin-left: 27%;">
          <tr>
            <td style="width: 100%; height: 0; padding-bottom: 100%;"> </td>
          </tr>
        </table>
        </div> -->
</template>