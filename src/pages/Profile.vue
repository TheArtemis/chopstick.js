<script>
    import OptionsMenu from '@/components/OptionsMenu/OptionsMenu.vue'

    export default {
        name: 'Profile',
        components: {
            OptionsMenu,
        }
    }
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <div class="wrapper">
      <OptionsMenu/>
        <div class="contenitor">
            <div class="profile-sx">
                <label>Profile</label>
                <div class="profile-img">
                </div>
                <div class="profile-bio">
                    <label>Username</label>
                    <div class="bio">
                        <label>Biography</label>
                    </div>
                </div>
            </div>
        <div class="profile-dx">
            <label>Stats</label>
		<div class="stats">
              <div class="top-wrapper">
                <div class ="top-container">
                    <i class="fa-regular fa-thumbs-up"></i>
                     <span class="wins" data-val="400">000</span>
                     <span class="wins-text">Wins</span>
                </div>
                <div class ="top-container">
                    <i class="fa-regular fa-thumbs-down"></i>
                     <span class="wins" data-val="400">000</span>
                     <span class="wins-text">Losses</span>
                </div>
                <div class ="top-container">
                    <i class="fa-regular fa-hand-peace"></i>
                     <span class="wins" data-val="400">000</span>
                     <span class="wins-text">Ties</span>
                </div>
              </div>
              </div>
              <div class="recent">
                <label>Recent Games</label>
              </div>
        </div>
        </div>
    </div>
</template>