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
    turn: 'player1',
    isDragging: false,
    startX: 0,
    startY: 0,
    currentPiece: {
      id: null,
      posX: 0,
      posY: 0,
      score: 0,
      el: null,
    },
    handsPlayer1: {
      left: {
        id: 'hand-player1-left',
        posX: 0,
        posY: 0,
        score: this.player1Left,
        disabled: false
      },
      right: {
        id: 'hand-player1-right',
        posX: 0,
        posY: 0,
        score: this.player1Right,
        disabled: false
      },
    },
    handsPlayer2: {
      left: {
        id: 'hand-player2-left',
        posX: 0,
        posY: 0,
        score: this.player2Left,
        disabled: false
      },
      right: {
        id: 'hand-player2-right',
        posX: 0,
        posY: 0,
        score: this.player2Right,
        disabled: false
      },
    },
    targetHand: null,
    isPlayerTurn: true,
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
  const hand = allHands.find(hand => hand.id === id);
  if (hand) {
    this.currentPiece = { ...hand };
    if (this.turn === 'player1') {
      this.handsPlayer2.left.disabled = true;
      this.handsPlayer2.right.disabled = true;
    } else if (this.turn === 'player2') {
      this.handsPlayer1.left.disabled = true;
      this.handsPlayer1.right.disabled = true;
    }
  } else {
    this.currentPiece = null;
  }
},

startDrag(event, touch) {
  event.preventDefault();

  if (this.isDragging) {
    return;
  }

  var ev = event;
  if (touch) {
    ev = event.touches[0];
  }

  if (!this.boardActive) {
    return;
  }

  const currentHandPlayer = this.turn === 'player1' ? this.handsPlayer1 : this.handsPlayer2;

  this.currentPiece = this.findCurrentPiece(event);
  if (!this.currentPiece) {
    return; /* If it's not a valid piece, stop the drag */
  }

  if (this.currentPiece.score === 0 || !currentHandPlayer[this.currentPiece.id]) {
    this.isDragging = false;
    return; /* If the hand is empty or doesn't belong to the current player, stop the drag */
  }

  // Reset the currentPiece position
  this.currentPiece.posX = 0;
  this.currentPiece.posY = 0;

  this.isDragging = true;

  this.disableNavbar();

  this.startX = ev.clientX;
  this.startY = ev.clientY;

  console.log(this.currentPiece, this.startX, this.startY);
},




doDrag(event, touch) {
  if (!this.isDragging || !this.currentPiece) {
    return;
  }

  const ev = touch ? event.touches[0] : event;
  const xDelta = ev.clientX - this.startX;
  const yDelta = ev.clientY - this.startY;
  const newX = this.currentPiece.posX + xDelta;
  const newY = this.currentPiece.posY + yDelta;

  // Update the currentPiece hand's position
  this.currentPiece.posX = newX;
  this.currentPiece.posY = newY;

  // Update the startX and startY for the next drag event
  this.startX = ev.clientX;
  this.startY = ev.clientY;
},

switchPlayer() {
  this.turn = this.turn === 'player1' ? 'player2' : 'player1';
  const newTurnValue = this.turn;
  this.$emit('turn-changed', newTurnValue);
},

moveHand(event, hand) {
  if (this.isDragging) {
    return;
  }

  const ev = event.touches ? event.touches[0] : event;
  const rect = ev.target.getBoundingClientRect();

  this.currentPiece = hand;
  this.startX = ev.clientX;
  this.startY = ev.clientY;
  hand.posX = ev.clientX - rect.left - rect.width / 2;
  hand.posY = ev.clientY - rect.top - rect.height / 2;

  // Check if the current hand is targeting an opponent's hand
  const opponentHands = this.turn === 'player1' ? this.handsPlayer2 : this.handsPlayer1;
  if (opponentHands.left && opponentHands.left.id === hand.id) {
    this.targetHand = opponentHands.left;
  } else if (opponentHands.right && opponentHands.right.id === hand.id) {
    this.targetHand = opponentHands.right;
  } else {
    this.targetHand = null;
  }

  this.isDragging = true;
},


stopDrag() {
  if (!this.isDragging || !this.currentPiece) {
    this.isDragging = false;
    return;
  }

  const sourceHand = this.currentPiece.id;
  const targetHand = this.targetHand ? this.targetHand.id : null;

  const currentHandPlayer = this.turn === 'player1' ? this.handsPlayer1 : this.handsPlayer2;
  const opponentHandPlayer = this.turn === 'player1' ? this.handsPlayer2 : this.handsPlayer1;

  if (currentHandPlayer && opponentHandPlayer) {
    if (targetHand && (opponentHandPlayer.left?.id === targetHand || opponentHandPlayer.right?.id === targetHand)) {
      if (!currentHandPlayer[sourceHand]) {
        return;
      }

      const sourceScore = currentHandPlayer[sourceHand].score;
      const targetScore = opponentHandPlayer[targetHand].score;

      if (sourceScore <= targetScore) {
        this.targetHand.score = targetScore - sourceScore;
      } else {
        this.targetHand.score = 0;
      }
      this.currentPiece.score = sourceScore - targetScore;

      currentHandPlayer[sourceHand].score = this.currentPiece.score;
      opponentHandPlayer[targetHand].score = this.targetHand.score;

      if (opponentHandPlayer.left.score === 0 && opponentHandPlayer.right.score === 0) {
        this.$emit('close-game-over', this.turn);
      }
    }

    if (this.targetHand != null) {
        if ((this.currentHandPlayer == this.handsPlayer1 && (this.targetHand.id == 'hand-player2-left' || this.targetHand.id == 'hand-player2-right')) || (this.currentHandPlayer == this.handsPlayer2 && (this.targetHand.id == 'hand-player1-left' || this.targetHand.id == 'hand-player1-right')) )
          this.$emit('player-attack', { target: this.targetHand.id, source: this.currentPiece.id });
          if (this.currentHandPlayer == this.handsPlayer1 && (this.targetHand.id == 'hand-player1-left' || this.targetHand.id == 'hand-player1-right') || (this.currentHandPlayer == this.handsPlayer2 && (this.targetHand.id == 'hand-player2-left' || this.targetHand.id == 'hand-player2-right')) )
          this.$emit('player-split', { target: this.targetHand.id, source: this.currentPiece.id });
      }

    // Reset the currentPiece position if there is no target hand
    if (!this.targetHand) {
      this.currentPiece.posX = 0;
      this.currentPiece.posY = 0;
    }
  }

  // Reset the currentPiece and targetHand after completing the drag
  this.currentPiece = null;
  this.targetHand = null;
  this.isDragging = false;

  // Switch turn after completing the drag
  this.turn = this.turn === 'player1' ? 'player2' : 'player1';
  console.log("now is " + this.turn + " turn");
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
  mounted() {
  window.addEventListener('resize', () => {
    // Code to be executed when the window is resized
    console.log('Window resized!');
    const handRect1_left = this.$refs[this.player1.left.id].$el.getBoundingClientRect();
    const handRect1_right = this.$refs[this.player1.right.id].$el.getBoundingClientRect();
    const handRect2_left = this.$refs[this.player2.left.id].$el.getBoundingClientRect();
    const handRect2_right = this.$refs[this.player2.right.id].$el.getBoundingClientRect();
    console.log(handRect1_left);
    console.log(handRect1_right);
    console.log(handRect2_left);
    console.log(handRect2_right);
  });
  }
}

</script>

<template>
    <div id="game-board" class="game-board" :class="{ inactive: !this.boardActive }" @mousedown="startDrag($event, false)"
    @mousemove="doDrag($event, false)" @mouseup="stopDrag" @touchstart="startDrag($event, true)"
    @touchmove="doDrag($event, true)" @touchend="stopDrag">

      <LocalGameOver :isHidden="this.isGameOverHidden ? 'hidden' : ''" :player1="this.player1" :player2="this.player2"
        :winner="this.winner" @close-game-over="this.closeGameOver" />
  
      <div class="game-players">
        <div class="game-player">
          <PlayerHand :id="this.handsPlayer1.left.id" :ref="this.handsPlayer1.left.id" side="left" 
          :posX="handsPlayer1.left.posX" :posY="handsPlayer1.left.posY" :style="{
            transform: `translate(${handsPlayer1.left.posX}px, ${handsPlayer1.left.posY}px) scale(-1, 1)`,
            pointerEvents: isDragging ? 'none' : 'auto',
            touchAction: isDragging ? 'none' : 'auto',
          }" :class="[{ moving: this.isLeft1Dragging() }, fingersPlayer1Left]" 
          @mousedown.capture="moveHand($event, handsPlayer1.left)"
          @touchstart.capture="moveHand($event, handsPlayer1.left)"
          @mousemove.capture="doDrag($event, false)"
          @touchmove.capture="doDrag($event, true)"
          :disabled="handsPlayer1.left.disabled"></PlayerHand>
  
          <PlayerHand :id="this.handsPlayer1.right.id" :ref="this.handsPlayer1.right.id" side="right" 
          :posX="handsPlayer1.right.posX" :posY="handsPlayer1.right.posY " :style="{
            transform: `translate(${handsPlayer1.right.posX}px, ${handsPlayer1.right.posY}px)`,
            pointerEvents: isDragging ? 'none' : 'auto',
            touchAction: isDragging ? 'none' : 'auto',
          }" :class="[{ moving: this.isRight1Dragging() }, fingersPlayer1Right,]"
          @mousedown.capture="moveHand($event, handsPlayer1.right)"
          @touchstart.capture="moveHand($event, handsPlayer1.right)"
          @mousemove.capture="doDrag($event, false)"
          @touchmove.capture="doDrag($event, true)"
          :disabled="handsPlayer1.right.disabled"></PlayerHand>
        </div>
  
        <div class="game-player">
          <PlayerHand :id="this.handsPlayer2.left.id" :ref="this.handsPlayer2.left.id" side="left" 
          :posX="handsPlayer2.left.posX" :posY="handsPlayer2.left.posY" :style="{
            transform: `translate(${handsPlayer2.left.posX}px, ${handsPlayer2.left.posY}px)`,
            pointerEvents: isDragging ? 'none' : 'auto',
            touchAction: isDragging ? 'none' : 'auto',
          }" :class="[{ moving: this.isLeft2Dragging() }, fingersPlayer2Left]"
          @mousedown.capture="moveHand($event, handsPlayer2.left)"
          @touchstart.capture="moveHand($event, handsPlayer2.left)"
          @mousemove.capture="doDrag($event, false)"
          @touchmove.capture="doDrag($event, true)"
          :disabled="handsPlayer2.left.disabled"></PlayerHand>
  
          <PlayerHand :id="this.handsPlayer2.right.id" :ref="this.handsPlayer2.right.id" side="right" 
          :posX="handsPlayer2.right.posX" :posY="handsPlayer2.right.posY" :style="{
            transform: `translate(${handsPlayer2.right.posX}px, ${handsPlayer2.right.posY}px)`,
            pointerEvents: isDragging ? 'none' : 'auto',
            touchAction: isDragging ? 'none' : 'auto',
          }" :class="[{ moving: this.isRight2Dragging() }, fingersPlayer2Right,]"
          @mousedown.capture="moveHand($event, handsPlayer2.right)"
          @touchstart.capture="moveHand($event, handsPlayer2.right)"
          @mousemove.capture="doDrag($event, false)"
          @touchmove.capture="doDrag($event, true)"
          :disabled="handsPlayer2.right.disabled"></PlayerHand>
        </div>
      </div>
    </div>
  </template>
  