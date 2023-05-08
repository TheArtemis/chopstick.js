<script>
import Navbar from '@/components/Navbar/Navbar.vue'

export default {
  name: 'Settings',
  components: {
    Navbar,
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
            <input required="" type="text" placeholder="Your E-mail">
            <input required="" type="text" placeholder="Your Username">
            <input required="" type="text" placeholder="Your Password">
          </div>
        </div>
        <div class="bottomset">
          <div class="theme">
            <label class="switch">
              <input class="chk" type="checkbox">
              <span class="slider"></span>
            </label>
            <label id="Click">Click to change theme</label>
          </div>
          <div class="butt">
            <button class="settings-button">Exit from your profile</button>
            <button class="settings-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>