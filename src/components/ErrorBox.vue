<template>
    <transition name="slide">
        <div v-if="this.error" class="chopstick-error-box" :class="{ 'error-show': this.showError }">
            <p class="">{{ error }}</p>
            <button class="close-box-error-icon"
                @click="closeErrorBox"><!-- <span id="close-icon-s">&#10006;</span> --></button>
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
.chopstick-error-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 35%;
    left: 34%;

    height: 100px;
    width: 220px;
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

.close-box-error-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    background-image: var(--x-symbol-red-path);
    background-size: cover;
    background-position: center;
    background-color: transparent;
    height: 12px;
    width: 12px;
    border: none;
    cursor: pointer;
    color: #bb6767 !important;
    z-index: 999;
}

#close-icon-s {
    background-image: none !important;
    color: red;
}

@media screen and (max-width: 768px) {
    .chopstick-error-box {
        top: 35%;
        left: 31%;
    }
}
</style>