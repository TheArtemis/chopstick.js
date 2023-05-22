<script>
import Navbar from '@/components/Navbar/Navbar.vue'
import recentGames from '@/components/RecentGames/recentGames.vue'
import axiosInstance from '@/services/axiosIstance.js';

export default {

  name: 'Profile',
  components: {
    Navbar, recentGames
  },
  async created() {
    const colors = localStorage.getItem('colors');
    if (colors === 'true') {
      document.documentElement.setAttribute('data-colors', 'light');
    } else {
      document.documentElement.removeAttribute('data-colors');
    }

    if (localStorage.getItem('chopsticks_authToken')) {
      this.guest = false;
    }

    if (this.guest == false) {
      try {
        const token = localStorage.getItem('chopsticks_authToken');
        console.log('Getting user info...');
        const response = await axiosInstance.get('/users', {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(response.data);
        localStorage.setItem('chopsticks_userInfo', JSON.stringify(response.data));
        console.log(localStorage.getItem('chopsticks_userInfo'));
      } catch (error) {
        console.log(error);
      }
      this.selectedImage = JSON.parse(localStorage.getItem('chopsticks_userInfo')).picture;

      this.username = JSON.parse(localStorage.getItem('chopsticks_userInfo')).username;

      const bio = JSON.parse(localStorage.getItem('chopsticks_userInfo')).bio;
      if (bio != null)
        this.bio = bio;

      try {
        const token = localStorage.getItem('chopsticks_authToken');
        const response = await axiosInstance.get('/games', {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data);
        const data = [].concat(...Object.values(response.data));
        this.recentGamesList = data.map(item => {
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
          });
          return { ...item, date: formattedDate };
        });
      } catch (error) {
        console.log(error);
      }
    }
    else {
      this.selectedImage = 'src/assets/imgs/img3.png';
      this.username = 'Guest';
      this.bio = 'Guest';
    }
  },
  data() {
    return {
      showModal: false,
      images: [
        '/src/assets/imgs/img0.png',
        '/src/assets/imgs/img1.png',
        '/src/assets/imgs/img2.png',
        '/src/assets/imgs/img3.png',
        '/src/assets/imgs/img4.png',
      ],
      selectedImage: null,
      recentGamesList: [],
      guest: true,
      username: '',
      bio: '',
      wins: 0,
      losses: 0,
      totalLosses: 0,
      totalWins: 0,
      displayBioButton: false,
    };
  },
  watch: {
    recentGamesList: {
      handler() {
        this.updateWinLossCounts();
      },
      deep: true,
    },
  },

  methods: {
    showButton() {
      this.displayBioButton = true;
    },
    updateWinLossCounts() {
      this.recentGamesList.forEach((game) => {
        if (game.winner == this.username) {
          this.wins++;
        } else {
          this.losses++;
        }
        this.totalWins = this.wins;
        this.totalLosses = this.losses;
      });
    },
    openModal() {
      console.log('ciao');
      this.showModal = true;
    },
    async hideModal() {
      this.showModal = false;
      if (this.selectImage == null)
        return;
      try {
        const token = localStorage.getItem('chopsticks_authToken');
        console.log(this.selectedImage)

        const response = await axiosInstance.post('/update-picture', {
          picture: this.selectedImage
        }, {
          headers: {
            Authorization: token,
          }
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    selectImage(image) {
      this.selectedImage = image;
      /* this.hideModal(); */

    },
    async submitBio() {
      this.displayBioButton = false;
      console.log("ds")
      if (this.guest == false) {
        try {
          console.log("ciaoe")
          const token = localStorage.getItem('chopsticks_authToken');
          console.log(token);
          const response = await axiosInstance.post('/update-bio', {
            bio: this.bio
          }, {
            headers: {
              Authorization: token,
            }
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
};
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <div class="wrapper">
    <Navbar />
    <div class="contenitor">
      <div class="contentsx">
        <div class="profile">
          <label id="Profile">Profile</label>
          <div class="click-area" @click="openModal" :style="{ backgroundImage: `url(${selectedImage})`, }">
            <img class="my_file" src="" alt="" />
            <!-- <input id="file-upload" type="file" ref="fileInput" style="display:none" @change="onFileChange" /> -->
          </div>
          <div v-if="showModal" class="profile-modal">
            <ul>
              <li v-for="(image, index) in images" :key="index" @click="selectImage(image)">
                <img :src="image" alt="" />
              </li>
              <!-- <li id="text" @click="$refs.fileInput.click()">Upload from file</li> -->
            </ul>
            <div class="img-close">
              <div class="close" @click="hideModal"></div>
            </div>
          </div>
          <label id="Username">{{ this.username }}</label>
        </div>
        <!--<div class="bio">
          <label id="User">Username</label>
          <label for="areabio" class="labelbio">Biography</label>
          <textarea class="areabio"></textarea>
        </div>-->
        <div class="bio-form">
          <label id="User">{{ this.username }}</label>
          <form @submit.prevent="submitBio">
            <textarea @click="showButton" @select="showButton" class="textarea" name="bio"
              :placeholder="bio ? bio : 'Write something about yourself...'" v-model="bio" textarea></textarea>
            <button class="button" type="submit" v-if="displayBioButton">Save</button>
          </form>
        </div>
      </div>
      <div class="contentdx">
        <div class="stats">
          <label id="Stats">Stats</label>
          <div class="top-wrapper">
            <div class="top-container">
              <i class="fa-regular fa-thumbs-up"></i>
              <span class="wins" v-bind:data-val="totalWins">{{ totalWins }}</span>
              <span class="wins-text">Wins</span>
            </div>
            <div class="top-container">
              <i class="fa-regular fa-thumbs-down"></i>
              <span class="losses" v-bind:data-val="totalLosses">{{ totalLosses }}</span>
              <span class="wins-text">Losses</span>
            </div>
          </div>
        </div>
        <label id="Recent">Recent Games</label>
        <div class="recent">
          <recentGames :recentGamesList="this.recentGamesList"></recentGames>
        </div>
      </div>
    </div>
  </div>
</template>