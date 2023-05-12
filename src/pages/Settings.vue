<script>
import Navbar from '@/components/Navbar/Navbar.vue'

export default {
  name: 'Settings',
  components: {
    Navbar,
  },
  data() {
    return {
      clicked: false,
      guest: true,
      email: '',
      username: '',
      password: '12345',
    };
  },
  mounted() {
    if (localStorage.getItem('colors') === 'true') {
      this.clicked = true;
    }
  },
  methods: {
    themeSwitch() {
      if (this.clicked) {
        document.documentElement.setAttribute('data-colors', 'light');
        localStorage.setItem('colors', 'true');
      } else {
        document.documentElement.removeAttribute('data-colors');
        localStorage.setItem('colors', 'false');
      }
    },
    logOut() {
      localStorage.removeItem('chopsticks_authToken');
      localStorage.removeItem('chopsticks_userInfo');
      window.location.href = '/login'
    }
  },
  created() {
    if (localStorage.getItem('chopsticks_authToken')) {
      this.guest = false;
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <div class="contenitor">
      <div class="settings">
        <label id="Settings">Settings</label>
        <!--<input required="" type="text" placeholder="Your Name">-->
        <div class="topsett">
          <div class="topsettname">
            <label>E-mail:</label>
            <label>Username:</label>
            <label>Password:</label>
          </div>
          <div class="topsettcont">
            <input required="" type="mail" :placeholder="this.email" v-model="mail">
            <input required="" type="text" :placeholder="this.username" >
            <input required="" type="password" :placeholder="this.password" v-model="password">
          </div>
        </div>
        <div class="bottomset">
          <div class="theme">
            <label class="switch">
              <input class="chk" type="checkbox" v-model="clicked" @change="themeSwitch">
              <span class="slider"></span>
            </label>
            <label id="Click">Click to change theme</label>
          </div>
          <div class="butt">
            <button class="settings-button" @click="this.logOut">Log Out</button>
            <button class="settings-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>