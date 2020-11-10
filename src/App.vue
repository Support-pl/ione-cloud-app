<template>
	<div id="app" :style="cssVars">
		<transition name="slide">
			<router-view :style="{'position': 'absolute', 'width': '100%', 'height': '100%'}"></router-view>
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
		const user = this.$store.getters.getCookie('CloudUser');
		if(user !== undefined) {
			this.$store.commit("setUser", JSON.parse(user));
		};

		this.$router.beforeEach((to, from, next) => {
			if (to.name !== 'login' && !this.$store.getters.isLogged) next({ name: 'login' })
			else next()
		})

		const lang = localStorage.getItem("lang");
		if(lang != undefined)
			this.$i18n.locale = lang;
		else {
			this.$i18n.locale = 'ru'
		}
		
	},
	mounted(){
		if (this.$router.currentRoute.name != 'login' && !this.$store.getters.isLogged) {
			this.$router.replace("login");
		}
		// console.log(this.$config);
	},
	computed: {
    cssVars() {
      return Object.fromEntries(Object.entries(this.$config.colors).map( ([key, val]) => ([`--${key}`, val])));
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

.slide-enter-active, .slide-leave-active {
  /* transition: transform .5s; */
  transition: opacity .5s ease;
}
.slide-enter, .slide-leave-to {
  /* transform: translateX(100%); */
  opacity: 0;
}
/* .slide-leave-to {
  transform: translateX(-100%);
} */

</style>
