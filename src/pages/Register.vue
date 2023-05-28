<script>
import axiosInstance from '@/services/axiosIstance.js';
import ErrorBox from '@/components/ErrorBox.vue';
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'Register',
  components: {
    ErrorBox
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
      username: '',
      password: '',
      confirmPassword: '',
      mail: '',
      error: null,
      showError: false,
    }
  },
  methods: {
    async submitRegister() {

      if (this.password !== this.confirmPassword) {
        this.error = "Passwords don't match";
        this.showError = true;
        return;
      }

      try {
        console.log('Registering user...');

        const response = await axiosInstance.post('/register', {
          username: this.username,
          password: this.password,
          mail: this.mail,
        });


        /* console.log(response.data);
        console.log(this.username);
        console.log(this.password);
        console.log(this.mail); */

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
  <section class="vh-100 gradient-custom">
    <div class="container py-1 h-100 ">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-8 col-xl-6">

          <div class="card bg-dark text" style="color: var(--color-primary); border-radius: 1rem;">
            <div class="card-body p-5 text-center"
              style="background-color: var(--bg-secondary); position: relative; border-radius: 1rem;  margin-top: -2px">
              <ErrorBox :error="this.error" :showError="this.showError"
                @close-error="() => { this.showError = false, this.error = null }" />
              <form class="mb-md-5 mt-md-4 pb-5" @submit.prevent="submitRegister">

                <h2 class="fw-bold mb-2 text-uppercase" style="color: var(--color-primary);">Register</h2>
                <p class="text-50 mb-3" style="color: var(--color-primary);"> </p>

                <div class="form-outline form mb-3" style="color: var(--color-primary);  margin-top: -5px">
                  <input type="username" id="typeTextX" class="form-control form-control-lg"
                    style="color: var(--color-primary); border-color: var(--color-primary); background-color: var(--bg-secondary);"
                    v-model="username" />
                  <label class="form-label" for="typeTextX" style="color: var(--color-primary);">Username</label>
                </div>

                <div class="form-outline form mb-3" style="color: var(--color-primary);  margin-top: -15px">
                  <input type="username" id="typeEmailX" class="form-control form-control-lg"
                    style="color: var(--color-primary); border-color: var(--color-primary); background-color: var(--bg-secondary);"
                    v-model="mail" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                  <label class="form-label" for="typeEmailX" style="color: var(--color-primary);">E-mail</label>
                </div>

                <div class="form-outline form mb-3" style="color: var(--color-primary);  margin-top: -15px">
                  <input type="password" id="typePassword1" class="form-control form-control-lg"
                    style="color: var(--color-primary); border-color: var(--color-primary); background-color: var(--bg-secondary);"
                    v-model="password" />
                  <label class="form-label" for="typePassword1" style="color: var(--color-primary);">Password</label>
                </div>
                <div class="form-outline form mb-3" style="color: var(--color-primary);  margin-top: -15px">
                  <input type="password" id="typePassword2" class="form-control form-control-lg"
                    style="color: var(--color-primary); border-color: var(--color-primary); background-color: var(--bg-secondary);"
                    v-model="confirmPassword" />
                  <label class="form-label" for="typePassword2" style="color: var(--color-primary);">Confirm
                    Password</label>
                </div>

                <button class="btn btn-outline btn-lg px-5" type="submit"
                  style="color: var(--color-primary); border-color: var(--color-primary); background-color: var(--bg-secondary);">Register</button>
              </form>
              <div>
                <p class="mb-0" style="color: var(--color-primary); margin-top: -45px;">Already have an account? <a
                    href="/login" class="text-50 fw-bold " style="color: var(--color-primary);">Login</a>
                </p>
              </div>
            </div>
            <li style="position: absolute; top: 10px; right: 30px; cursor: pointer; color:transparent;">
              <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style=" fill: var(--color-primary);">
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
</template>