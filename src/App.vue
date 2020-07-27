<template>
	<div id="app">
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
	created(){
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

/* .slide-enter-active, .slide-leave-active {
  transition: left .5s;
  left: 0;
  position: relative;
}
.slide-enter, .slide-leave-to {
  left: 100%;
} */

</style>
