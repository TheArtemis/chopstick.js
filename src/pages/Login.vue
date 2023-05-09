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
						<input required="" type="text" placeholder="Username">
					</div>
					<div class="inputBox">
						<input required="" type="text" placeholder="Password">
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
				localStorage.setItem('sessionToken', token);
				console.log(localStorage.getItem('sessionToken'));
			} catch (error) {
				this.error = error.response.data;
				console.log(error)
				this.showError = true;
			} finally {
				this.username = '';
				this.password = '';
			}
		},
	},
};
</script>


