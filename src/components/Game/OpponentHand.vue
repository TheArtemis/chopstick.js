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
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 1000);
        },
    },
    computed: {
        attackStyle() {
            return {
                '--target-pos-x': `${this.targetPosX}px`,
                '--target-pos-y': `${this.targetPosY}px`,
            };
        }
    },

};
</script>

<template>
    <div :key="isAttacking"
        :class="[{ 'left-attack': this.isAttacking && this.side == 'left' }, { 'right-attack': this.isAttacking && this.side == 'right' }, `hand opponent ${this.side}`]"
        :style="attackStyle">
    </div>
</template>

<style scoped>
.left-attack {
    animation-name: leftAttackPlayer;
    animation-duration: 1s;
    z-index: 9999;
}

@keyframes leftAttackPlayer {
    0% {
        transform: translate(0px, 0px) rotate(180deg) scale(-1, 1);

    }

    50% {
        transform: translateX(var(--target-pos-x)) translateY(var(--target-pos-y)) rotate(180deg) scale(-1, 1);
    }

    100% {
        transform: translate(0px, 0px) rotate(180deg) scale(-1, 1);
    }
}

.right-attack {
    animation-name: rightAttackPlayer;
    animation-duration: 1s;
    z-index: 999;
}

@keyframes rightAttackPlayer {
    0% {
        transform: translate(0px, 0px) rotate(180deg);
    }

    50% {
        transform: translateX(var(--target-pos-x)) translateY(var(--target-pos-y)) rotate(180deg);
    }

    100% {
        transform: translate(0px, 0px) rotate(180deg);
    }
}
</style>