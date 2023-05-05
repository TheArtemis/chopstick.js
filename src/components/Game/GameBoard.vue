<script>
import PlayerHand from '@/components/Game/PlayerHand.vue'

export default {
  name: 'GameBoard',
  props: {
    boardActive: Boolean,
    playerLeft: Number,
    playerRight: Number,
    opponentLeft: Number,
    opponentRight: Number,
    turn: String,
    mouseUpFlag: Boolean,
  },
  components: {
    PlayerHand,
  },
  data() {
    return {
      isDragging: false,
      currentPiece: null,
      startX: 0,
      startY: 0,
      handsPlayer:
      {
        left: {
          id: 'hand-player-left',
          posX: 0,
          posY: 0,
          score: this.playerLeft,
        },
        right: {
          id: 'hand-player-right',
          posX: 0,
          posY: 0,
          score: this.playerRight,
        },
      },
      targetHand: null,
      handsOpponent: {
        left: {
          id: 'hand-opponent-left',
          score: this.opponentLeft,
        },
        right: {
          id: 'hand-opponent-right',
          score: this.opponentRight,
        },
      },

    }
  },
  methods: {
    findCurrentPiece(event) {
      return Object.values(this.handsPlayer).find(hand => hand.id === event.target.id);
    },
    startDrag(event, touch) {
      event.preventDefault();

      if (this.isDragging == true)
        this.stopDrag();

      var ev = event;
      if (touch) {
        ev = event.touches[0];
      }

      if (this.boardActive == false)
        return;

      this.currentPiece = this.findCurrentPiece(event);
      if (!this.currentPiece)
        return; /* If is not a valid piece stops the drag */

      if (this.currentPiece.score == 0)
        return; /* If the hand is empty stops the drag */

      this.isDragging = true;

      this.disableNavbar();

      this.startX = ev.clientX;
      this.startY = ev.clientY;
      /* console.log(this.currentPiece, this.startX, this.startY)    */

    },
    doDrag(event, touch) {

      if (this.isDragging == false)
        return;
      if (!this.currentPiece)
        return;
      /* console.log("dragging"); */


      var ev = event;
      if (touch) {
        ev = event.touches[0];
      }

      /* const boardRect = this.$el.getBoundingClientRect(); */
      /* console.log(boardRect) */
      /* const handRect = event.target.getBoundingClientRect(); */
      /* console.log(handRect) */

      const xDelta = ev.clientX - this.startX;
      const yDelta = ev.clientY - this.startY;

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
      this.startX = ev.clientX

      this.currentPiece.posY = newY;
      this.startY = ev.clientY



      this.handsPlayer[this.currentPiece] = this.currentPiece;

      /* console.log("dragging");
      console.log(this.currentPiece.posX, this.currentPiece.posY)
      console.log(this.handsPlayer[this.currentPiece].posX, this.handsPlayer[this.currentPiece].posY) */

    },
    stopDrag() {

      if (this.isDragging == false)
        return;

      if (this.currentPiece == null)
        return;

      const currentHand = this.handsPlayer[this.currentPiece];
      if (currentHand === undefined) {
        this.isDragging = false;
        this.currentPiece = null;
        this.startX = 0;
        this.startY = 0;
        return;
      }

      this.enableNavbar();

      this.handsPlayer[this.currentPiece].posX = 0;
      this.handsPlayer[this.currentPiece].posY = 0;
      this.isDragging = false;

      if (this.targetHand != null) {
        this.$emit('player-attack', { target: this.targetHand.id, source: this.currentPiece.id });
      }
      this.targetHand = null;
      this.currentPiece = null;
      this.startX = 0;
      this.startY = 0;
      /* console.log("stopped") */


    },
    findCurrentTarget(event) {
      return Object.values(this.handsOpponent).find(hand => hand.id === event.target.id);
    },
    enterTarget(event) {
      if (!this.isDragging)
        return;
      /* console.log("enter") */
      this.targetHand = this.findCurrentTarget(event);
    },
    leaveTarget() {
      if (!this.isDragging)
        return;
      /* console.log("leave") */
      this.targetHand = null;
    },
    mouseclick() {
      /* console.log("clicked") */
    },
    disableNavbar() {
      this.$emit('disable-navbar');
    },
    enableNavbar() {
      this.$emit('enable-navbar');
    },
    handleMouseLeave() {
      console.log("mouse left window");
      if (this.isDragging)
        this.stopDrag();
    },
    isRightDragging() {
      console.log(this.isDragging, this.currentPiece);
      if (this.isDragging && this.currentPiece.id == 'hand-player-right')
        return true;
      return false;
    },
    isLeftDragging() {
      console.log(this.isDragging, this.currentPiece);
      if (this.isDragging && this.currentPiece.id == 'hand-player-left')
        return true;
      return false;
    },
  },
  computed: {
    fingersPlayerLeft() {
      return {
        'zero': this.handsPlayer.left.score == 0,
        'one': this.handsPlayer.left.score == 1,
        'two': this.handsPlayer.left.score == 2,
        'three': this.handsPlayer.left.score == 3,
        'four': this.handsPlayer.left.score == 4,
      }
    },
    fingersPlayerRight() {
      return {
        'zero': this.handsPlayer.right.score == 0,
        'one': this.handsPlayer.right.score == 1,
        'two': this.handsPlayer.right.score == 2,
        'three': this.handsPlayer.right.score == 3,
        'four': this.handsPlayer.right.score == 4,
      }
    },
    fingersOpponentLeft() {
      return {
        'zero': this.handsOpponent.left.score == 0,
        'one': this.handsOpponent.left.score == 1,
        'two': this.handsOpponent.left.score == 2,
        'three': this.handsOpponent.left.score == 3,
        'four': this.handsOpponent.left.score == 4,
      }
    },
    fingersOpponentRight() {
      return {
        'zero': this.handsOpponent.right.score == 0,
        'one': this.handsOpponent.right.score == 1,
        'two': this.handsOpponent.right.score == 2,
        'three': this.handsOpponent.right.score == 3,
        'four': this.handsOpponent.right.score == 4,
      }
    },
  },
  watch: {
    playerLeft: function (val) {
      this.handsPlayer.left.score = val;
    },
    playerRight: function (val) {
      this.handsPlayer.right.score = val;
    },
    opponentLeft: function (val) {
      this.handsOpponent.left.score = val;
    },
    opponentRight: function (val) {
      this.handsOpponent.right.score = val;
    },
    mouseUpFlag: function () {
      console.log("notice external");
      if (this.isDragging) {
        console.log("tried to stop dragging");
        this.stopDrag();
      }
    },
  },
  mounted() {
    window.addEventListener('mouseleave', this.handleMouseLeave);
  },
  beforeUnmount() {
    window.removeEventListener('mouseleave', this.handleMouseLeave);
  },
}

</script>

<template>
  <div class="game-board" :class="{ inactive: !this.boardActive }" @mousedown="startDrag($event, false)"
    @mousemove="doDrag($event, false)" @mouseup="stopDrag" @touchstart="startDrag($event, true)"
    @touchmove="doDrag($event, true)" @touchend="stopDrag" @click="handleClick">
    <div class="game-opponent">
      <div :id="this.handsOpponent.right.id" class="hand opponent right" @mouseenter="enterTarget"
        @mouseleave="leaveTarget" @touchenter="enterTarget" @touchend="leaveTarget" :class="fingersOpponentRight"></div>
      <div :id="this.handsOpponent.left.id" class="hand opponent left" @mouseenter="enterTarget" @mouseleave="leaveTarget"
        :class="fingersOpponentLeft"></div>
    </div>
    <div class="game-player">
      <PlayerHand :id="this.handsPlayer.left.id" :ref="this.handsPlayer.left.id" side="left" :style="{
        transform: `translate(${handsPlayer.left.posX}px, ${handsPlayer.left.posY}px) scale(-1, 1)`,
        pointerEvents: isDragging ? 'none' : 'auto'
      }" :class="[{ moving: this.isLeftDragging() }, fingersPlayerLeft]"></PlayerHand>
      <PlayerHand :id="this.handsPlayer.right.id" :ref="this.handsPlayer.right.id" side="right" :style="{
        transform: `translate(${handsPlayer.right.posX}px, ${handsPlayer.right.posY}px)`,
        pointerEvents: isDragging ? 'none' : 'auto',
      }" :class="[{ moving: this.isRightDragging() }, fingersPlayerRight,]"></PlayerHand>
    </div>
  </div>
</template>