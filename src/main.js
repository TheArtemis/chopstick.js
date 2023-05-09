import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import '@/assets/main.css'
import '@/assets/game.css'
import '@/assets/game-menu.css'
import '@/assets/navbar.css'
import '@/assets/login.css'
import '@/assets/profile.css'
import '@/assets/stats.css'
import '@/assets/register.css'
import '@/assets/settings.css'
import '@/assets/recentGames.css'

/* We pass into createApp a component App, imported from ./App.vue */

createApp(App).use(router).mount('#app')

/* The .mount() method should always be called after
 all app configurations and asset registrations are done. */
