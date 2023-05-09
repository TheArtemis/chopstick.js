<template>
	<div>
		<div class="container">
			<!-- <p v-if="error" class="error" :class="{ 'error-show': showError }">{{ error }}</p> -->
			<ErrorBox :error="this.error" :showError="this.showError"
				@close-error="() => { this.showError = false, this.error = null }" />
			<div class="box">
				<h2>Login</h2>
				<form @submit.prevent="submitLogin">
					<div class="inputBox">
						<input required="" type="text" placeholder="Username" v-model="username">
					</div>
					<div class="inputBox">
						<input required="" type="password" placeholder="Password" v-model="password">
					</div>
					<div class="boxbottom">
						<button type="submit" name="sign-in">Sign In</button>
						<router-link :to="{ path: '/register' }">Don't have an account? Register here</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import ErrorBox from '@/components/ErrorBox.vue';

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
				this.error = error.response.data;
				this.showError = true;
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


