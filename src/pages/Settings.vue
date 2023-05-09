<script>
import Navbar from '@/components/Navbar/Navbar.vue'

export default {
  name: 'Settings',
  components: {
    Navbar,
  },
  data() {
    return {
      clicked: false
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
            <input required="" type="mail" placeholder="Your E-mail">
            <input required="" type="text" placeholder="Your Username">
            <input required="" type="text" placeholder="Your Password">
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
            <button class="settings-button">Log Out</button>
            <button class="settings-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>