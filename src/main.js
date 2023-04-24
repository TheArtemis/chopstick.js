import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'


/* We pass into createApp a component App, imported from ./App.vue */

createApp(App).mount('#app')

/* The .mount() method should always be called after
 all app configurations and asset registrations are done. */
