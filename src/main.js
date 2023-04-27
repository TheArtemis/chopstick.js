import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import '@/assets/main.css'
import '@/assets/game.css'
import '@/assets/game-menu.css'
import '@/assets/navbar.css'




/* We pass into createApp a component App, imported from ./App.vue */

createApp(App).use(router).mount('#app')

/* The .mount() method should always be called after
 all app configurations and asset registrations are done. */
