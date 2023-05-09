<script>
import Navbar from '@/components/Navbar/Navbar.vue'

export default {
  name: 'Profile',
  components: {
    Navbar,
  },
  created() {
    const colors = localStorage.getItem('colors');
    if (colors === 'true') {
      document.documentElement.setAttribute('data-colors', 'light');
    } else {
      document.documentElement.removeAttribute('data-colors');
    }
  },
  data() {
    return {
      showModal: false,
      images: [
        'src/assets/imgs/img0.png',
        'src/assets/imgs/img1.png',
        'src/assets/imgs/img2.png',
        'src/assets/imgs/img3.png',
        'src/assets/imgs/img4.png',
      ],
      selectedImage: null,
      recentGamesList: [],
    };
  },

  methods: {
    openModal() {
      console.log('ciao');
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    selectImage(image) {
      this.selectedImage = image;
      this.hideModal();
    },
  },

  beforeMount() {
    /* QUERY AL DATABASE PER AVERE LE PARTITE RECENTI */
    /* RESTITUISCE UN INSIEME DI OGGETTI */
    /* OGNI OGGETTO VERRA AGGIUNTO A this.recentGameList */

    this.recentGamesList.push({
      player1: 'Miles',
      rating1: 1200,
      player2: 'Peter',
      rating2: 1200,
      winner: 'Miles',
      date: '2021-10-10',
    })

    this.recentGamesList.push({
      player1: 'Steven',
      rating1: 1200,
      player2: 'Miles',
      rating2: 1200,
      winner: 'Steven',
      date: '2021-11-10',
    })
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
          <div class="click-area" @click="openModal" :style="{ backgroundImage: `url(${selectedImage})` }">
            <img class="my_file" :src="selectedImage" alt="" />
            <div v-if="showModal" class="profile-modal">
              <ul>
                <li v-for="(image, index) in images" :key="index" @click="selectImage(image)">
                  <img :src="image" alt="" />
                </li>
              </ul>
            </div>
          </div>
          <label id="Username">Username</label>
        </div>
        <div class="bio">
          <label id="User">Username</label>
          <label for="areabio" class="labelbio">Biography</label>
          <textarea class="areabio"></textarea>
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


          </div>
        </div>
        <div class="recent">
          <label id="Recent">Recent Games</label>
          <div class="game">
            <i class="fa-regular fa-thumbs-down"></i>
            <p>opponent 1</p>
            <p>12:00</p>
          </div>
          <div class="game">
            <i class="fa-regular fa-thumbs-up"></i>
            <p>opponent 2</p>
            <p>12:05</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>