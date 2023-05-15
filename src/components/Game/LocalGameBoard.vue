<script>
import PlayerHand from '@/components/Game/PlayerHand.vue'
import LocalGameOver from '@/components/Game/LocalGameOver.vue'

export default {
  name: 'LocalGameBoard',
  props: {
    boardActive: Boolean,
    player1Left: Number,
    player1Right: Number,
    player2Left: Number,
    player2Right: Number,
    turn: {
    type: String,
    default: 'player1'
    },
    mouseUpFlag: Boolean,
    isGameOverHidden: Boolean,
    player1: {
      type: Object,
    },
    player2: {
      type: Object,
    },
    winner: String,
  },
  components: {
    PlayerHand,
    LocalGameOver,
  },
  data() {
  return {
    isDragging: false,
    currentPiece: null,
    startX: 0,
    startY: 0,
    handsPlayer1: {
      left: {
        id: 'hand-player1-left',
        posX: 0,
        posY: 0,
        score: this.player1Left,
      },
      right: {
        id: 'hand-player1-right',
        posX: 0,
        posY: 0,
        score: this.player1Right,
      },
    },
    handsPlayer2: {
      left: {
        id: 'hand-player2-left',
        posX: 0,
        posY: 0,
        score: this.player2Left,
      },
      right: {
        id: 'hand-player2-right',
        posX: 0,
        posY: 0,
        score: this.player2Right,
      },
    },
    targetHand: null,
   }
  },
  methods: {
    findCurrentPiece(event) {
  const allHands = [
    this.handsPlayer1.left,
    this.handsPlayer1.right,
    this.handsPlayer2.left,
    this.handsPlayer2.right
  ];
  const id = event.target?.id; // check if event.target has an id property
  return allHands.find(hand => hand.id === id); 
},

startDrag(event) {
  event.preventDefault();

  if (this.isDragging == true) {
    this.stopDrag();
  }

  let clientX, clientY;

  if (event.type === 'mousedown') {
    clientX = event.clientX;
    clientY = event.clientY;
  } else if (event.type === 'touchstart') {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else {
    return;
  }

  this.currentPiece = this.findCurrentPiece(event);

  if (!this.currentPiece || this.currentPiece.score == 0) {
    return;
  }

  this.isDragging = true;
  this.disableNavbar();
  this.startX = clientX;
  this.startY = clientY;
},


doDrag(event, touch) {
  if (this.isDragging == false) return;
  if (!this.currentPiece) return;

  var ev = event;
  if (touch) ev = event.touches[0];

  const xDelta = ev.clientX - this.startX;
  const yDelta = ev.clientY - this.startY;

  const newX = this.currentPiece.posX + xDelta;
  const newY = this.currentPiece.posY + yDelta;

  this.currentPiece.posX = newX;
  this.startX = ev.clientX

  this.currentPiece.posY = newY;
  this.startY = ev.clientY

  // Check if the current player's hand is dragged over an opponent's hand
  const currentHandPlayer = this.turn === 'player1' ? this.handsPlayer1 : this.handsPlayer2;
  const opponentHandPlayer = this.turn === 'player1' ? this.handsPlayer2 : this.handsPlayer1;

  const draggedHand = this.currentPiece;

  const opponentHandLeftRect = opponentHandPlayer.left.el.getBoundingClientRect();
  const opponentHandRightRect = opponentHandPlayer.right.el.getBoundingClientRect();
  const draggedHandRect = draggedHand.el.getBoundingClientRect();

  if (this.intersectRect(opponentHandLeftRect, draggedHandRect)) {
    if (currentHandPlayer.left.score !== 0) {
      this.targetHand = opponentHandPlayer.left;
    }
  } else if (this.intersectRect(opponentHandRightRect, draggedHandRect)) {
    if (currentHandPlayer.right.score !== 0) {
      this.targetHand = opponentHandPlayer.right;
    }
  } else {
    this.targetHand = null;
  }

  if (this.turn === 'player1') {
    this.handsPlayer1[this.currentPiece.id] = this.currentPiece;
  } else {
    this.handsPlayer2[this.currentPiece.id] = this.currentPiece;
  }

  // Update the position of the dragged hand for the current player
  if (this.turn === 'player1') {
    if (this.currentPiece.id === 'left') {
      this.player1Left = this.currentPiece.score;
    } else {
      this.player1Right = this.currentPiece.score;
    }
  } else {
    if (this.currentPiece.id === 'left') {
      this.player2Left = this.currentPiece.score;
    } else {
      this.player2Right = this.currentPiece.score;
    }
  }
},


intersectRect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
},
switchPlayer() {
  this.currentHandPlayer = this.currentHandPlayer === 1 ? 2 : 1;
},
stopDrag() {
  if (!this.isDragging || !this.currentPiece || !this.targetHand) {
    this.isDragging = false;
    return;
  }

  const sourceHand = this.currentPiece.id;
  const targetHand = this.targetHand.id;
  const currentHandPlayer = this.turn === 'player1' ? this.handsPlayer1 : this.handsPlayer2;
  const opponentHandPlayer = this.turn === 'player1' ? this.handsPlayer2 : this.handsPlayer1;

  if (targetHand === opponentHandPlayer.left.id || targetHand === opponentHandPlayer.right.id) {
    const sourceScore = currentHandPlayer[sourceHand].score;
    const targetScore = opponentHandPlayer[targetHand].score;

    if (sourceScore <= targetScore) {
      this.targetHand.score = targetScore - sourceScore;
    } else {
      this.targetHand.score = 0;
    }
    this.currentPiece.score = sourceScore - targetScore;

    if (opponentHandPlayer.left.score === 0 && opponentHandPlayer.right.score === 0) {
      this.$emit('game-over', this.turn);
    } else {
      this.switchPlayer();
    }
  } else {
    this.currentPiece.posX = this.currentPiece.initX;
    this.currentPiece.posY = this.currentPiece.initY;
  }

  this.isDragging = false;
  this.targetHand = null;
  this.switchPlayer();
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
    isRight1Dragging() {
      /* console.log(this.isDragging, this.currentPiece); */
      if (this.isDragging && this.currentPiece.id == 'hand-player1-right')
        return true;
      return false;
    },
    isLeft1Dragging() {
      /* console.log(this.isDragging, this.currentPiece); */
      if (this.isDragging && this.currentPiece.id == 'hand-player1-left')
        return true;
      return false;
    },
    isRight2Dragging() {
      /* console.log(this.isDragging, this.currentPiece); */
      if (this.isDragging && this.currentPiece.id == 'hand-player2-right')
        return true;
      return false;
    },
    isLeft2Dragging() {
      /* console.log(this.isDragging, this.currentPiece); */
      if (this.isDragging && this.currentPiece.id == 'hand-player2-left')
        return true;
      return false;
    },
    closeGameOver() {
      this.$emit('close-game-over');
    },
  },
  computed: {
    fingersPlayer1Left() {
      return {
        'zero': this.handsPlayer1.left.score == 0,
        'one': this.handsPlayer1.left.score == 1,
        'two': this.handsPlayer1.left.score == 2,
        'three': this.handsPlayer1.left.score == 3,
        'four': this.handsPlayer1.left.score == 4,
      }
    },
    fingersPlayer1Right() {
      return {
        'zero': this.handsPlayer1.right.score == 0,
        'one': this.handsPlayer1.right.score == 1,
        'two': this.handsPlayer1.right.score == 2,
        'three': this.handsPlayer1.right.score == 3,
        'four': this.handsPlayer1.right.score == 4,
      }
    },
    fingersPlayer2Left() {
      return {
        'zero': this.handsPlayer2.left.score == 0,
        'one': this.handsPlayer2.left.score == 1,
        'two': this.handsPlayer2.left.score == 2,
        'three': this.handsPlayer2.left.score == 3,
        'four': this.handsPlayer2.left.score == 4,
      }
    },
    fingersPlayer2Right() {
      return {
        'zero': this.handsPlayer2.right.score == 0,
        'one': this.handsPlayer2.right.score == 1,
        'two': this.handsPlayer2.right.score == 2,
        'three': this.handsPlayer2.right.score == 3,
        'four': this.handsPlayer2.right.score == 4,
      }
    },
  },
  watch: {
    player1Left: function (val) {
      this.handsPlayer1.left.score = val;
    },
    player1Right: function (val) {
      this.handsPlayer1.right.score = val;
    },
    player2Left: function (val) {
      this.handsPlayer2.left.score = val;
    },
    player2Right: function (val) {
      this.handsPlayer2.right.score = val;
    },
    mouseUpFlag: function () {
      /* console.log("notice external"); */
      if (this.isDragging) {
        /* console.log("tried to stop dragging"); */
        this.stopDrag();
      }
    },
  },
  mounted(){
    window.addEventListener('resize', function() {
    // Code to be executed when the window is resized
    console.log('Window resized!');
    const handRect1_left = this.$refs[this.player1.left.id].$el.getBoundingClientRect(); 
    const handRect1_right = event.target.getBoundingClientRect();
    const handRect2_left = event.target.getBoundingClientRect();
    const handRect2_right = event.target.getBoundingClientRect();
    console.log(handRect1_left);
    console.log(handRect1_right);
    console.log(handRect2_left);
    console.log(handRect2_right);
    });
  }
}

</script>

<template>
    <div id="game-board" class="game-board" :class="{ inactive: !this.boardActive }">

      <LocalGameOver :isHidden="this.isGameOverHidden ? 'hidden' : ''" :player1="this.player1" :player2="this.player2"
        :winner="this.winner" @close-game-over="this.closeGameOver" />
  
      <div class="game-players">
        <div class="game-player">
          <PlayerHand :id="this.handsPlayer1.left.id" :ref="this.handsPlayer1.left.id" side="left" :style="{
            transform: `translate(${handsPlayer1.left.posX}px, ${handsPlayer1.left.posY}px) scale(-1, 1)`,
            pointerEvents: isDragging ? 'none' : 'auto',
            touchAction: isDragging ? 'none' : 'auto',
          }" :class="[{ moving: this.isLeft1Dragging() }, fingersPlayer1Left]"></PlayerHand>
  
          <PlayerHand :id="this.handsPlayer1.right.id" :ref="this.handsPlayer1.right.id" side="right" :style="{
            transform: `translate(${handsPlayer1.right.posX}px, ${handsPlayer1.right.posY}px)`,
            pointerEvents: isDragging ? 'none' : 'auto',
            touchAction: isDragging ? 'none' : 'auto',
          }" :class="[{ moving: this.isRight1Dragging() }, fingersPlayer1Right,]"></PlayerHand>
        </div>
  
        <div class="game-player">
          <PlayerHand :id="this.handsPlayer2.left.id" :ref="this.handsPlayer2.left.id" side="left" :style="{
            transform: `translate(${handsPlayer2.left.posX}px, ${handsPlayer2.left.posY}px) scale(-1, 1)`,
            pointerEvents: isDragging ? 'none' : 'auto',
            touchAction: isDragging ? 'none' : 'auto',
          }" :class="[{ moving: this.isLeft2Dragging() }, fingersPlayer2Left]"></PlayerHand>
  
          <PlayerHand :id="this.handsPlayer2.right.id" :ref="this.handsPlayer2.right.id" side="right" :style="{
            transform: `translate(${handsPlayer2.right.posX}px, ${handsPlayer2.right.posY}px)`,
            pointerEvents: isDragging ? 'none' : 'auto',
            touchAction: isDragging ? 'none' : 'auto',
          }" :class="[{ moving: this.isRight2Dragging() }, fingersPlayer2Right,]"></PlayerHand>
        </div>
      </div>
    </div>
  </template>
  