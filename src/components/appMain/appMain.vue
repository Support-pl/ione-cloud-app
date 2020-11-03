<template>
	<div class="application">
		<a-layout>
			<a-layout-header :style="{'background-color': $config.colors.main, color: $config.colors.bright_font, padding: 0}">
				<appHeader/>
			</a-layout-header>
			<a-layout-content :style="{'background-color': $config.colors.bright_bg, 'position': 'relative'}">
				<!-- <cloud v-if="active == 0"></cloud>
				<support v-if="active == 1"></support>
				<invoice v-if="active == 2"></invoice>
				<settings v-if="active == 3"></settings> -->
				<transition name="nomain__slider">
					<router-view class="frame"></router-view>
				</transition>
			</a-layout-content>
			<a-layout-footer :style="{padding: 0}">
				<appFooter :active="active" :changeFunc="changeActive" />
			</a-layout-footer>
    	</a-layout>
	</div>
</template>

<script>
import appFooter from './appFooter.vue';
import appHeader from './appHeader.vue';
import cloud from './cloud/cloud.vue';
import support from './support/support.vue';
import invoice from './invoice/invoice.vue';
import settings from './settings/settings.vue';

export default {
	name:"appMain",
	components: {
		appFooter,
		appHeader,
		cloud,
		support,
		invoice,
		settings
	},
	data(){
		return {
			activeName: '',
			unwatch: null,
		}
	},
	methods: {
		changeActive(newStatus, title){
			// if(this.activeName == title) return;
			// this.$router.push({ name: title})
		},
	},
	computed: {
		active: {
			get(){
				let ret = this.activeName == '' ? this.$router.currentRoute.name : this.activeName;
				ret = ret == "cloudHome" ? 'cloud' : ret;
				// console.log('~~~', ret, this.activeName, this.$router.currentRoute.name)
				return ret;
			},
			set(newVal){
				this.activeName = newVal; 
			}
		}
	},
	mounted(){
		// if(this.user == null){
		// 	this.$router.push('/login');
		// }
		// console.log(this.user)
		// this.$store.subscribe((mutation, state) => {
		// 	if(mutation.type == 'app/setActiveTabName' || mutation.type == 'app/setActiveTabNum'){
		// 		console.log(mutation.type)
		// 		console.log(mutation.payload)
		// 	}
		// })
		// this.unwatch = this.$store.watch(
		// 	(state, getters) => getters['app/getActiveTab'],
		// 	(newVal, oldVal) => {
		// 		console.log(newVal, oldVal)
		// 		this.$router.push({ name: newVal.title})
		// 	}
		// )
	},
	created(){
		this.$router.onReady(() => {
			this.$store.dispatch('app/setTabByNameNoRoute', this.$router.currentRoute.name)
		});
		this.$router.beforeEach((to, from, next) => {
			this.activeName = to.name == 'cloudHome' ? 'cloud' : to.name;
			this.$store.dispatch('app/setTabByNameNoRoute', to.name)
			next();
		})
	}
}
</script>

<style>
	.application{
		height: 100%;
		overflow: hidden;
	}

	.ant-layout{
		height: 100%;
	}

	.container {
		max-width: 768px;
		margin: 0 auto;
	}

	/* .main__slider-enter-active, .main__slider-leave-active {
		left: 0%;
		transition: left .1s;
	}

	.main__slider-enter, .main__slider-leave-to {
		opacity: 0;
		left: 100%
	} */

	.frame{
		position: absolute;
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}
</style>