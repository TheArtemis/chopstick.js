<template>
    <transition name="slide">
        <div v-if="this.error" class="errorBox" :class="{ 'error-show': this.showError }">
            {{ error }}
            <button class="close-box-error" @click="closeErrorBox">&#10006;</button>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ErrorBox',
    props: {
        error: String,
        showError: Boolean
    },
    methods: {
        closeErrorBox() {
            this.$emit('close-error');
        }
    },
};
</script>

<style>
.errorBox {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 200px;
    background-color: var(--bg-secondary);
    color: rgb(187, 103, 103);

    border: 2px solid rgb(187, 103, 103);
    border-radius: 1em;

    opacity: 0;
    transform: translateY(-100px);
    z-index: 999;
}

.error-show {
    opacity: 1;
    transform: translateY(0%);
}

.slide-enter-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from {
    opacity: 0;
    transform: translateY(-100%);
}

.slide-enter-to {
    opacity: 1;
    transform: translateY(0%);
}

.close-box-error {
    position: absolute;
    right: 5px;
    top: 5px;
    background: none;
    border: none;
    cursor: pointer;
    color: rgb(187, 103, 103);
    z-index: 999;
}

@media screen and (max-width: 768px) {
    .errorBox {
        margin-top: 30px
    }
}
</style>