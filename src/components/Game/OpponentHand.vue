<script>
export default {
    name: 'OpponentHand',
    props: {
        side: String,

    },
    data() {
        return {
            isAttacking: false,
            targetPosX: 0,
            targetPosY: 0,
        };
    },
    methods: {
        AttackAnimation(targetHand, targetPosition) {
            const sourceHand = this.$el;
            const sourcePosition = sourceHand.getBoundingClientRect();
            this.targetPosX = targetPosition.left - sourcePosition.left;
            this.targetPosY = targetPosition.top - sourcePosition.top - targetPosition.height / 2;
            console.log("Attack animation" + targetHand + " " + targetPosition);
            this.isAttacking = true; // Start the animation
            setTimeout(() => {
                this.isAttacking = false; // Stop the animation after a certain duration
            }, 1000);
        },
        /* updateAttackStyle() {
            this.$nextTick(() => { }); // Force Vue to update the style
        } */
    },
    computed: {
        attackStyle() {
            console.log("Attack style" + this.targetPosX + " " + this.targetPosY);
            return {
                '--target-pos-x': `${this.targetPosX}px`,
                '--target-pos-y': `${this.targetPosY}px`,
            };
        }
    },
    /* watch: {
        targetPosX() {
            this.updateAttackStyle();
        },
        targetPosY() {
            this.updateAttackStyle();
        },
    } */

};
</script>

<template>
    <div :key="isAttacking"
        :class="[{ 'left-attack': this.isAttacking && this.side == 'left' }, { 'right-attack': this.isAttacking && this.side == 'right' }, `hand opponent ${this.side}`]"
        :style="attackStyle">
    </div>
</template>

<style scoped>
/* Add component-specific styles here */

.left-attack {
    /* position: absolute; */
    animation-name: leftAttackPlayer;
    animation-duration: 1s;
    z-index: 9999;
    /* border: 2px solid red; */
}

@keyframes leftAttackPlayer {
    0% {
        transform: translate(0px, 0px) rotate(180deg) scale(-1, 1);
        /* top: 0px;
        left: 0px; */

    }

    50% {
        transform: translateX(var(--target-pos-x)) translateY(var(--target-pos-y)) rotate(180deg) scale(-1, 1);
        /* Use the desired target position */
        /* top: var(--target-pos-y);
        left: var(--target-pos-x); */
    }

    100% {
        transform: translate(0px, 0px) rotate(180deg) scale(-1, 1);
        /* top: 0px;
        left: 0px; */
    }
}

.right-attack {
    animation-name: rightAttackPlayer;
    animation-duration: 1s;
    z-index: 999;
    /* border: 2px solid red; */
}

@keyframes rightAttackPlayer {
    0% {
        transform: translate(0px, 0px) rotate(180deg);

        /* top: 0px;
        left: 0px; */

    }

    50% {
        transform: translateX(var(--target-pos-x)) translateY(var(--target-pos-y)) rotate(180deg);

        /* Use the desired target position */
        /* top: var(--target-pos-y);
        left: var(--target-pos-x); */
    }

    100% {
        transform: translate(0px, 0px) rotate(180deg);

        /* top: 0px;
        left: 0px; */
    }
}
</style>