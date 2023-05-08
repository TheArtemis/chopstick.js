<script>
import axios from 'axios';

const API_URL = 'http://localhost:3000';
const axiosInstance = axios.create({
  baseURL: API_URL,  
});

export default {
  data() {
    return {
      username: '',
      password: '',
      mail: '',
    }
  },
  methods: {
    async submitRegister() {
      // Make an HTTP request to your server to register the user
      // with the entered username and password

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

    }
  }
}
</script>

<template>  
<div class="rBox">
  <div class="registerBox">
    <h2>Register</h2>
    <form @submit.prevent="submitRegister">
      <div class="reBox">
        <input type="text" v-model="username">
        <label>Username</label>
      </div>
      <div class="reBox">
        <input type="mail" v-model="mail">
        <label>Email</label>
      </div>
      <div class="reBox">
        <input type="password" v-model="password">
        <label>Password</label>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</div>
</template>

