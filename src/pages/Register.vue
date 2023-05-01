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
  <div>
    <h2>Register</h2>
    <form @submit.prevent="submitRegister">
      <label>Username</label>
      <input type="text" v-model="username">
      <label>Email</label>
      <input type="mail" v-model="mail">
      <label>Password</label>
      <input type="password" v-model="password">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

