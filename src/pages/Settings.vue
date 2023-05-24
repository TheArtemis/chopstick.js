<script>
import Navbar from '@/components/Navbar/Navbar.vue'
import axiosInstance from '@/services/axiosIstance.js';

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
      console.log('logging out');
      localStorage.removeItem('chopsticks_authToken');
      localStorage.removeItem('chopsticks_userInfo');
      window.location.href = '/login'
    },
    async submitChange() {
      console.log('changing user info');
      try {
        const token = localStorage.getItem('chopsticks_authToken');
        const response = await axiosInstance.post('/update-user', {
          username: this.username,
          email: this.email,
        }, {
          headers: {
            Authorization: `${token}`,
          },
        });
        /* console.log(response.data); */
        localStorage.removeItem('chopsticks_authToken');
        localStorage.removeItem('chopsticks_userInfo');
        window.location.href = '/login'
        /* console.log('user info changed'); */
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    /* console.log('Settings page created'); */
    if (localStorage.getItem('chopsticks_authToken')) {
      this.guest = false;
    }
    console.log(this.guest);

    if (this.guest == false) {
      try {
        const token = localStorage.getItem('chopsticks_authToken');
        console.log('Getting user info...');
        const response = await axiosInstance.get('/users', {
          headers: {
            Authorization: `${token}`,
          },
        });
        /* console.log(response.data); */
        localStorage.setItem('chopsticks_userInfo', JSON.stringify(response.data));
        /* console.log(localStorage.getItem('chopsticks_userInfo'));
        console.log(JSON.parse(localStorage.getItem('chopsticks_userInfo')).username); */
        this.username = JSON.parse(localStorage.getItem('chopsticks_userInfo')).username;
        /* console.log(JSON.parse(localStorage.getItem('chopsticks_userInfo')).email); */
        this.email = JSON.parse(localStorage.getItem('chopsticks_userInfo')).email;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <div class="contenitor">
      <form class="settings" @submit.prevent="submitChange">
        <label id="Settings">Settings</label>
        <!--<input required="" type="text" placeholder="Your Name">-->
        <div class="topsett">
          <div class="topsettname">
            <label>E-mail:</label>
            <label>Username:</label>
            <!-- <label>Password:</label> -->
          </div>
          <div class="topsettcont">
            <input required="" type="mail" :placeholder="this.email" v-model="email">
            <input required="" type="text" :placeholder="this.username" v-model="username">
            <!--  <input required="" type="password" :placeholder="this.password" v-model="password"> -->
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
            <button class="settings-button" type="submit">Save</button>
          </div>
        </div>
      </form><!--  -->
    </div>
  </div>
</template>