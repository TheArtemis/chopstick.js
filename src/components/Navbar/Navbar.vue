<script>
export default {
    name: 'Navbar',
    created() {
        const colors = localStorage.getItem('colors');
        if (colors === 'true') {
            document.documentElement.setAttribute('data-colors', 'light');
        } else {
            document.documentElement.removeAttribute('data-colors');
        }
    },
    props: {
        navbarActive: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isLogged: false
        }
    },

    beforeMount() {
        if (localStorage.getItem('chopsticks_authToken') == null)
            this.isLogged = false;
        else
            this.isLogged = true;
    }

}
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap">
    <nav class="chopsticks-navbar" :class="{ disabled: !this.navbarActive }">
        <ul class="navbar-nav">
            <li class="logo">
                <a href="/" class="nav-link">
                    <span class="link-text">Chopsticks</span>
                    <div class="logo-img"></div>
                </a>
            </li>
            <li class="nav-item">
                <a href="/profile" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                    <span class="link-text">Profile</span>
                </a>
            </li>


            <li class="nav-item">
                <a href="/stats" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
                    </svg>
                    <span class="link-text">Stats</span>
                </a>
            </li>

            <li class="nav-item">
                <a href="#popup-box" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                    </svg>
                    <span class="link-text">How to play</span>
                </a>
            </li>

            <li class="nav-item">
                <a href="#popup-box2" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path
                            d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" />
                    </svg>
                    <span class="link-text">About us</span>
                </a>
            </li>

            <li v-if="!this.isLogged" class="nav-item" id="login-item">
                <a href="/login" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                    </svg>
                    <span class="link-text">Login</span>
                </a>
            </li>

            <li class="nav-item" :class="{ 'nav-item-last': this.isLogged }">
                <a href="/settings" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                    </svg>
                    <span class="link-text">Settings</span>
                </a>
            </li>
        </ul>
    </nav>
    <div id="popup-box" class="modal">
        <div class="content">
            <h1 style="color: var(--color-primary);">
                Rules of Chopsticks
            </h1>
            <b style="color: var(--text-primary)">
                <p>Chopsticks is a turn-based game where you can attack or transfer. Every player
                    begins the game with one finger per hand.</p>
                <p>A hand is considered live if it has at least one finger.</p>
                <p>To attack, a player uses one of their live hands to strike one of the opponent's live ones. The number of
                    fingers on the struck hand will increase based on the number of the attacking hand.</p>
                <p> If the total is 5,
                    the hand is considered dead, if it's higher the excess will be the new number. To divide, if a player
                    has a dead hand, they can divide the fingers between their hands by transferring them from one hand to
                    the other. Players are required to attack at least once during the game. First player to have both of
                    their hands killed loses.</p>

            </b>
            <a href="#" class="box-close">
                <div class="close-popup"></div>
            </a>
        </div>
    </div>
    <div id="popup-box2" class="modal">
        <div class="content">
            <h1 style="color: var(--color-primary);">
                About us
            </h1>
            <b style="color: var(--text-primary)">
                <p>Hi, we are Lorenzo Deflorian, Maria Chiara Ierovante and Enrico Ianni Ficorilli.</p>
                <p>We are Informatics and Automation Engineering students at Sapienza, University of Rome.</p>
                <p>This game was created for a university project in "Languages and Technologies for the Web".</p>
                <p>If you would like to take a look at our code please visit our GitHub:
                    <a href="https://github.com/TheArtemis/chopstick.js" style="color: var(--color-primary)" target="_blank">https://github.com/TheArtemis/chopstick.js</a></p>
                <p>Have fun and watch out for Handy, he looks friendly but he will be a tough opponent!</p>

            </b>
            <a href="#" class="box-close">
                <div class="close-popup"></div>
            </a>
        </div>
    </div>
</template>