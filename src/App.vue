<template>
	<div id="app">
		<!-- <transition name="login-fade">
			<login v-if="!isLoggined" :getUser="getUser" />
		</transition>
		<template v-if="isLoggined"> -->
			<!-- <appMain :user='user' /> -->
		<!-- </template> -->
		<transition name="slide">
			<router-view></router-view>
		</transition>
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
		};
	},
	methods: {
		// getUser(_user){
		// 	this.user = _user;
		// 	console.log(_user);
			
		// 	const close_your_eyes = md5('clientDetails'+this.user.id+this.user.secret);
		// 	const url = `https://devwhmcs.support.by/app_cloud_mobile/clientDetails.php?clientid=${_user.id}&secret=${close_your_eyes}`;
		// 	console.log(url)
		// 	axios.get(url)
		// 	.then(resp => {
		// 		console.log("login. stage 2:");
		// 		console.log("\t", resp);
		// 		this.user.firstname = resp.data.firstname;
		// 		this.user.lastname = resp.data.lastname;
		// 		this.user.balance = resp.data.credit;
		// 		this.user.currency_code = resp.data.currency_code;
		// 		console.log("\t", this.user);
		// 		console.log("\t", "loggined");
		// 		this.isLoggined = true;
		// 		this.setCookie('CloudUser', JSON.stringify(this.user), {
		// 			'max-age': '2592000'
		// 		});
		// 		this.$router.push("cloud")
		// 	})

		// },
		logout(){
			this.user = null;
			this.isLoggined = false;
			this.deleteCookie("CloudUser");
			this.$router.push('/login');
		},
	},
	watch: {
		// $route(to, from){
		// 	if(to.name != 'login' && this.isLoggined == false) this.$router.push("login") 
		// }
	},
	created(){
		// this.user = JSON.parse(this.getCookie("CloudUser"));
		const user = JSON.parse(this.$store.getters.getCookie('CloudUser'));
		if(user !== undefined) {
			this.$store.commit("setUser", user)
		};

		this.$router.beforeEach((to, from, next) => {
			if (to.name !== 'login' && !this.$store.getters.isLogged) next({ name: 'login' })
			else next()
		})
	},
	mounted(){
		if (this.$router.currentRoute.name != 'login' && !this.$store.getters.isLogged) {
			this.$router.replace("login");
		}
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


/*

TODO:
	-разобраться vuex

	-перейти на TypeScript

*/