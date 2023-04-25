<script>
import PlayerHand from './PlayerHand.vue'

export default {
    name: 'GameBoard',
    components: {
        PlayerHand,
    }, 
    data () {
      return {        
        isDragging: false,
        currentHand: null,
        startX: 0,
        startY: 0,        
        hands: 
            {
            left:{
                id: 'hand-player-left',
                posX: 0,
                posY: 0,
            },
            right:{
                id: 'hand-player-right',
                posX: 0,
                posY: 0,
            },
        },         
      }
    },    
    methods: {
        findCurrentPiece(event){
            return Object.values(this.hands).find(hand => hand.id === event.target.id); 
        },
        startDrag(event) {
        event.preventDefault();       
        this.currentPiece = this.findCurrentPiece(event);
        if(!this.currentPiece) 
            return; /* If is not a valid piece stops the drag */
        this.isDragging = true;        
        this.startX = event.clientX;
        this.startY = event.clientY;         
        console.log(this.currentPiece, this.startX, this.startY)        
        
    },
    doDrag(event) {   

      if (this.isDragging) {
        if(!this.currentPiece) 
            return;        

        const boardRect = this.$el.getBoundingClientRect();
        console.log(boardRect)
        const handRect = event.target.getBoundingClientRect();
        console.log(handRect)

        const xDelta = event.clientX - this.startX;
        const yDelta = event.clientY - this.startY;

        /* event.clientX tells you the current horizontal 
        position of the mouse pointer relative to the viewport */

        const newX = this.currentPiece.posX + xDelta;
        const newY = this.currentPiece.posY + yDelta;
        
        /* TODO: Make so the hands cannot get out of bounds */

        /* if(handRect.x > boardRect.x){
            this.currentPiece.posX = newX;
            this.startX = event.clientX
        }
        if(handRect.y > boardRect.y){
            this.currentPiece.posY = newY;
            this.startY = event.clientY 
        } */

        this.currentPiece.posX = newX;
        this.startX = event.clientX

        this.currentPiece.posY = newY;
        this.startY = event.clientY 
        
        

        this.hands[this.currentPiece] = this.currentPiece;

        console.log("dragging");
        console.log(this.currentPiece.posX, this.currentPiece.posY)
        console.log(this.hands[this.currentPiece].posX, this.hands[this.currentPiece].posY)
      }
    },
    stopDrag() {
        if(!this.currentPiece) 
            return; 
        this.hands[this.currentPiece].posX = 0;
        this.hands[this.currentPiece].posY = 0;
        this.isDragging = false;
        this.currentPiece = null;
        this.startX = 0;
        this.startY = 0;        
        console.log("stopped")
    },
  },  
} 

</script>

<template>
    <div 
    class="game-board"
    @mousedown="startDrag($event)"
    @mousemove="doDrag"
    @mouseup="stopDrag">
      <div class = "game-opponent">
        <div class="hand opponent right"></div>
        <div class="hand opponent left"></div>      
    </div>
    <div class="game-player">
      <PlayerHand 
      :id = "this.hands.left.id"
      :ref = "this.hands.left.id"
      side="left"
      :style="{transform: `translate(${hands.left.posX}%, ${hands.left.posY}%) scale(-1, 1)`}"></PlayerHand>
      <PlayerHand 
      :id="this.hands.right.id"
      :ref = "this.hands.right.id" 
      side="right"
      :style="{transform: `translate(${hands.right.posX}%, ${hands.right.posY}%)`}"></PlayerHand>
    </div>
    </div>
</template>