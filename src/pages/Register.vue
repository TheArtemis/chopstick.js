<script>
import axios from 'axios';
import ErrorBox from '@/components/ErrorBox.vue';
import 'bootstrap/dist/css/bootstrap.css'

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
      confirmPassword: '',
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

      if (this.password !== this.confirmPassword) {
        this.error = "Passwords don't match";
        this.showError = true;
        return;
      }

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

        this.$router.push('/login');

      } catch (error) {
        if (error.code == 'ERR_NETWORK') {
          this.error = 'Server is not responding';
          this.showError = true;
        }
        else {
          this.error = error.response.data;
          console.log(error);
          this.showError = true;
        }
      } finally {
        this.username = '';
        this.mail = '';
        this.password = '';
        this.confirmPassword = '';
      }



    }
  }
}
</script>

<template>
  <form @submit.prevent="submitRegister">
    <section class="vh-100 gradient-custom">
      <div class="container py-1 h-100 ">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-8 col-xl-6">

            <div class="card bg-dark text" style="color: #f1cc53; border-radius: 1rem;">
              <div class="card-body p-5 text-center"
                style="background-color: #272522; position: relative; border-radius: 1rem;  margin-top: -2px">
                <ErrorBox :error="this.error" :showError="this.showError"
                  @close-error="() => { this.showError = false, this.error = null }" />
                <form class="mb-md-5 mt-md-4 pb-5" @submit.prevent="submitLogin">

                  <h2 class="fw-bold mb-2 text-uppercase" style="color: #f1cc53;">Register</h2>
                  <p class="text-50 mb-3" style="color: #f1cc53;"> </p>

                  <div class="form-outline form mb-3" style="color: #f1cc53;  margin-top: -5px">
                    <input type="username" id="typeTextX" class="form-control form-control-lg"
                      style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;" v-model="username" />
                    <label class="form-label" for="typeTextX" style="color: #f1cc53;">Username</label>
                  </div>

                  <div class="form-outline form mb-3" style="color: #f1cc53;  margin-top: -15px">
                    <input type="username" id="typeEmailX" class="form-control form-control-lg"
                      style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;" v-model="mail" />
                    <label class="form-label" for="typeEmailX" style="color: #f1cc53;">E-mail</label>
                  </div>

                  <div class="form-outline form mb-3" style="color: #f1cc53;  margin-top: -15px">
                    <input type="password" id="typePasswordX" class="form-control form-control-lg"
                      style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;" v-model="password" />
                    <label class="form-label" for="typePasswordX" style="color: #f1cc53;">Password</label>
                  </div>
                  <div class="form-outline form mb-3" style="color: #f1cc53;  margin-top: -15px">
                    <input type="password" id="typePasswordX" class="form-control form-control-lg"
                      style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;"
                      v-model="confirmPassword" />
                    <label class="form-label" for="typePasswordX" style="color: #f1cc53;">Confirm Password</label>
                  </div>

                  <button class="btn btn-outline btn-lg px-5" type="submit"
                    style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;">Register</button>
                </form>
                <div>
                  <p class="mb-0" style="color: #f1cc53; margin-top: -45px;">Already have an account? <a href="/login"
                      class="text-50 fw-bold " style="color: #f1cc53;">Login</a>
                  </p>
                </div>
              </div>
              <li style="position: absolute; top: 10px; right: 30px; cursor: pointer; color:transparent;">
                <a href="/">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style=" fill: #f1cc53;">
                    <path
                      d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>