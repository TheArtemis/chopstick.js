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
			theme: 'dark',
		};
	},
	created() {
		const colors = localStorage.getItem('colors');
		if (colors === 'true')
			this.theme = 'light';
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
				window.location.href = '/'
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
						<div class="card-body p-5 text-center"
							style="background-color: #272522; position: relative; border-radius: 1rem;">
							<ErrorBox :error="this.error" :showError="this.showError"
								@close-error="() => { this.showError = false, this.error = null }" />
							<form class="mb-md-5 mt-md-4 pb-5" @submit.prevent="submitLogin">

								<h2 class="fw-bold mb-2 text-uppercase" style="color: #f1cc53;">Login</h2>
								<p class="text-50 mb-5" style="color: #f1cc53;">Please enter your username and password!</p>

								<div class="form-outline form mb-4" style="color: #f1cc53;">
									<input type="username" id="typeEmailX" class="form-control form-control-lg"
										style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;"
										v-model="username" />
									<label class="form-label" for="typetextX" style="color: #f1cc53;">Username</label>
								</div>

								<div class="form-outline form mb-4" style="color: #f1cc53;">
									<input type="password" id="typePasswordX" class="form-control form-control-lg"
										style="color: #f1cc53; border-color: #f1cc53; background-color: #272522;"
										v-model="password" />
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
						<li style="position: absolute; top: 25px; right: 50px; cursor: pointer; color:transparent;">
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
</template>

  