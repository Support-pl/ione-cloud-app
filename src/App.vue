<template>
	<div id="app" :style="false && cssVars">
		<transition name="slide">
			<router-view :style="{'position': 'absolute', 'width': '100%', 'height': '100%'}"></router-view>
		</transition>
		<update-notification />
	</div>
</template>

<script>
import login from './routes/login.vue';
import appMain from './components/appMain/appMain.vue';
import updateNotification from './components/updateNotification/index.vue';
import config from './appconfig.js';

export default {
	name: "app",
	components: {
		login,
		appMain,
		updateNotification
	},
	created(){
		const user = this.$store.getters.getCookie('CloudUser');
		if(user !== undefined) {
			this.$store.commit("setUser", JSON.parse(user));
			this.$store.dispatch('cloud/fetchClouds');
		}

		this.$router.beforeEach((to, from, next) => {
			const isLogged = this.$store.getters.isLogged;
			const mustBeLoggined = to.matched.some(el => !!el.meta?.mustBeLoggined);
			if(mustBeLoggined && !isLogged){
				// this.$router.replace("login");
				next({ name: 'login' })
			}
			// if((to.meta?.mustBeLoggined === undefined || to.meta?.mustBeLoggined) && !this.$store.getters.isLogged) next({ name: 'login' })
			// else if((to.meta?.mustBeUnloggined === undefined || to.meta?.mustBeUnloggined) && this.$store.getters.isLogged) next({ name: 'root' })
			// if (to.name !== 'login' && !this.$store.getters.isLogged) next({ name: 'login' })
			else if (to.name == 'login' && this.$store.getters.isLogged) next({ name: 'root' })
			else next()
		})

		const lang = localStorage.getItem("lang");
		if(lang != undefined && config.languages.includes(lang)) {
			this.$i18n.locale = lang;
		} else {
			this.$i18n.locale = this.$i18n.fallbackLocale;
		}

		// this.$store.dispatch('fetchDomainInfo')
	},
	mounted(){
		this.$router.onReady(route => {
			const rt = this.$router.currentRoute;
			const isLogged = this.$store.getters.isLogged;
			const mustBeLoggined = rt.matched.some(el => !!el.meta?.mustBeLoggined);
			if(mustBeLoggined && !isLogged){
				this.$router.replace("login");
			}
		})
		// if (this.$router.currentRoute.name != 'login' && !this.$store.getters.isLogged) {
		// 	this.$router.replace("login");
		// }
		document.title = 'Cloud'
		const bodyCSS = Object.entries(this.cssVars).map(([k, v]) => `${k}:${v}`).join(';')
		document.body.setAttribute('style', bodyCSS)
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

<style lang="less">
	@import '~ant-design-vue/dist/antd.less';
	@import './variables.less';
</style>