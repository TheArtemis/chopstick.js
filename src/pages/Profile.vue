<script>
import Navbar from '@/components/Navbar/Navbar.vue'

export default {
    name: 'Profile',
    components: {
        Navbar,
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <div class="wrapper">
        <Navbar />
        <div class="contenitor">
            <div class="contentsx">
                <div class="profile">
                    <label id="Profile">Profile</label>
                    <div class="img">
                        <input type="file" class="my_file">
                    </div>
                    <label id="Username">Username</label>
                </div>
                <div class="bio">
                    <label id="User">Username</label>
                    <textarea class="areabio"></textarea>
                    <label for="areabio" class="labelbio">Bio</label>
                </div>
            </div>
            <div class="contentdx">
                <div class="stats">
                    <label id="Stats">Stats</label>
                    <div class="top-wrapper">
                        <div class="top-container">
                            <i class="fa-regular fa-thumbs-up"></i>
                            <span class="wins" data-val="400">000</span>
                            <span class="wins-text">Wins</span>
                        </div>
                        <div class="top-container">
                            <i class="fa-regular fa-thumbs-down"></i>
                            <span class="wins" data-val="400">000</span>
                            <span class="wins-text">Losses</span>
                        </div>
                        <div class="top-container">
                            <i class="fa-regular fa-hand-peace"></i>
                            <span class="wins" data-val="400">000</span>
                            <span class="wins-text">Ties</span>
                        </div>
                    </div>
                </div>
                <div class="recent">
                    <label id="Recent">Recent Games</label>
                </div>
            </div>
        </div>    
    </div>
</template>