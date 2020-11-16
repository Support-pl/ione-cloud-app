<template>
	<div class="application">
		<a-layout>
			<a-layout-header :style="{'background-color': $config.colors.main, color: $config.colors.bright_font, padding: 0}">
				<appHeader/>
			</a-layout-header>
			<a-layout-content :style="{'background-color': $config.colors.bright_bg, 'position': 'relative'}">
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
	computed: {
		active: {
			get(){
				let ret = this.activeName == '' ? this.$router.currentRoute.name : this.activeName;
				ret = ret == "cloudHome" ? 'cloud' : ret;
				return ret;
			},
			set(newVal){
				this.activeName = newVal; 
			}
		}
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

	.frame{
		position: absolute;
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}
</style>