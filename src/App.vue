<template>
	<div id="app">
		<transition name="login-fade">
			<login v-if="!isLoggined" :getUser="getUser" />
		</transition>
		<template v-if="isLoggined">
			<appMain :user='user' />
		</template>
	</div>
</template>

<script>
import login from './components/login/login.vue';
import appMain from './components/appMain/appMain.vue';

export default {
	name: "app",
	components: {
		login,
		appMain
	},
	data() {
		return {
			user: {
				name: "test name",
				balance: 241.24
			},
			isLoggined: true
			// user: null,
			// isLoggined: false
		};
	},
	methods: {
		getUser(_user){
			this.user = _user; 
			// this.user = {
			// 	name: "Test Name",
			// 	balance: 250
			// }
			this.isLoggined = true;
			console.log("loggined")
			console.log(this.user)
		}
	},
	mounted() {
	}
};
</script>

<style>

html{
	box-sizing: border-box;
}

*, *::before, *::after{
	box-sizing: inherit;
}

html, body{
	padding: 0;
	margin: 0;
	height: 100%;
}

#app{
	height: 100%;
}

.login-fade-enter-active, .login-fade-leave-active {
  transition: opacity .5s;
}
.login-fade-enter, .login-fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

</style>
