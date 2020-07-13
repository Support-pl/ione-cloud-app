<template>
	<div id="app">
		<!-- <transition name="login-fade">
			<login v-if="!isLoggined" :getUser="getUser" />
		</transition>
		<template v-if="isLoggined"> -->
			<!-- <appMain :user='user' /> -->
		<!-- </template> -->
		<transition name="slide">
			<router-view :user="user" :getUser="getUser" :logoutFunc='logout'></router-view>
		</transition>
	</div>
</template>

<script>
const axios = require('axios');

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
			// user: {
			// 	name: "test name",
			// 	balance: 241.24
			// },
			// isLoggined: true 
			user: null,
			isLoggined: false
		};
	},
	methods: {
		getUser(_user){
			this.user = _user;
			console.log(_user);
			// WARNING: there is one danger moment to security
			axios.get(`https://devwhmcs.support.by/app_cloud_mobile/clientDetails.php?clientid=${_user.id}`)
			.then(resp => {
				console.log("login. stage 2:");
				console.log("\t", resp);
				this.user.firstname = resp.data.firstname;
				this.user.lastname = resp.data.lastname;
				this.user.balance = resp.data.credit;
				this.user.currency_code = resp.data.currency_code;
				console.log("\t", this.user);
				console.log("\t", "loggined");
				this.isLoggined = true;
				this.$router.push("cloud")
			})

		},
		logout(){
			this.user = null;
			this.isLoggined = false;
			this.$router.push('/login')
		}
	},
	watch: {
		// $route(to, from){
		// 	if(to.name != 'login' && this.isLoggined == false) this.$router.push("login") 
		// }
	},
	mounted(){
		this.$router.beforeEach((to, from, next) => {
			if (to.name !== 'login' && this.isLoggined == false) next({ name: 'login' })
			else next()
		})
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

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: left .5s;
  left: 0;
  position: relative;
}
.slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  left: 100%;
}

</style>
