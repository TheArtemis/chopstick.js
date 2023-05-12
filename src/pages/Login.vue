<script>
import axios from 'axios';
import ErrorBox from '@/components/ErrorBox.vue';
import 'bootstrap/dist/css/bootstrap.css'

const API_URL = 'http://localhost:3000';
const axiosInstance = axios.create({
	baseURL: API_URL,
});

export default {
	name: 'Login',
	components: {
		ErrorBox,
	},
	data() {
		return {
			username: '',
			password: '',
			error: null,
			showError: false,
		};
	},
	methods: {
		async submitLogin() {
			try {
				console.log('Logging in user...');
				console.log(this.username);
				console.log(this.password);

				const response = await axiosInstance.post('/login', {
					username: this.username,
					password: this.password,
				});

				const token = response.data.token;
				localStorage.setItem('chopsticks_authToken', token);
				console.log(localStorage.getItem('chopsticks_authToken'));

				this.getSessionData();

			} catch (error) {
				console.log(error)
				if (error.code == 'ERR_NETWORK') {
					this.error = 'Server is not responding';
					this.showError = true;
				}
				else {
					this.error = error.response.data;
					this.showError = true;
				}
			} finally {
				this.username = '';
				this.password = '';
			}
		},
		getSessionData() {
			const token = localStorage.getItem('chopsticks_authToken');
			if (token) {
				this.getUserInfo(token);
				this.$router.push('/');
			}
		},
		async getUserInfo(token) {
			try {
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
		}
	},
};
</script>

<template>
	<section class="vh-100 gradient-custom">
		<div class="container py-1 h-100 ">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-12 col-md-8 col-lg-8 col-xl-6">

					<div class="card bg-dark text" style="color: #f1cc53; border-radius: 1rem;">
						<div class="card-body p-5 text-center" style="background-color: #272522; position: relative;">
							<ErrorBox :error="this.error" :showError="this.showError"
								@close-error="() => { this.showError = false, this.error = null }" />
							<form class="mb-md-5 mt-md-4 pb-5" @submit.prevent="submitLogin">

								<h2 class="fw-bold mb-2 text-uppercase" style="color: #f1cc53;">Login</h2>
								<p class="text-50 mb-5" style="color: #f1cc53;">Please enter your login and password!</p>

								<div class="form-outline form mb-4" style="color: #f1cc53;">
									<input type="email" id="typeEmailX" class="form-control form-control-lg"
										style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;" v-model="username" />
									<label class="form-label" for="typetextX" style="color: #f1cc53;">Username</label>
								</div>

								<div class="form-outline form mb-4" style="color: #f1cc53;">
									<input type="password" id="typePasswordX" class="form-control form-control-lg"
										style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;" v-model="password" />
									<label class="form-label" for="typePasswordX" style="color: #f1cc53;">Password</label>
								</div>

								<button class="btn btn-outline btn-lg px-5" type="submit"
									style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;">Login</button>
							</form>
							<div>
								<p class="mb-0" style="color: #f1cc53;">Don't have an account? <a href="/register"
										class="text-50 fw-bold " style="color: #f1cc53;">Sign Up</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

  