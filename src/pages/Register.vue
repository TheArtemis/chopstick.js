<script>
import axios from 'axios';
import ErrorBox from '@/components/ErrorBox.vue';

const API_URL = 'http://localhost:3000';
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default {
  name: 'Register',
  components: {
    ErrorBox
  },
  data() {
    return {
      username: '',
      password: '',
      mail: '',
      error: null,
      showError: false,
    }
  },
  created() {
    const colors = localStorage.getItem('colors');
    if (colors === 'true') {
      document.documentElement.setAttribute('data-colors', 'light');
    } else {
      document.documentElement.removeAttribute('data-colors');
    }
  },
  methods: {
    async submitRegister() {
      // Make an HTTP request to your server to register the user
      // with the entered username and password

      try {
        console.log('Registering user...');

        /* const test = await axiosInstance.get('/test')
        .then((response) => {
          console.log(response);
        }) */

        const response = await axiosInstance.post('/register', {
          username: this.username,
          password: this.password,
          mail: this.mail,
        });

        // Handle the response from the server here
        console.log(response.data);
        console.log(this.username);
        console.log(this.password);
        console.log(this.mail);

      } catch (error) {
        this.error = error.response.data;
        console.log(error);
        this.showError = true;
      } finally {
        this.username = '';
        this.mail = '';
        this.password = '';
      }



    }
  }
}
</script>

<template>
  <div class="rBox">
    <ErrorBox :error="this.error" :showError="this.showError"
      @close-error="() => { this.showError = false, this.error = null }" />
    <div class="registerBox">
      <h2>Register</h2>
      <form @submit.prevent="submitRegister">
        <div class="reBox">
          <input required="" type="text" placeholder="Username">
        </div>
        <div class="reBox">
          <input required="" type="mail" placeholder="E-mail">
        </div>
        <div class="reBox">
          <input required="" type="passsword" placeholder="Password">
        </div>
        <div class="register-footer">
          <button class="register-submit-button" type="submit">Register</button>
          <a class="register-login-link"><router-link :to="{ path: '/login' }">Already have an account?
              Login</router-link></a>
        </div>
      </form>
    </div>
  </div>
</template>

