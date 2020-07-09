<template>
	<div class="application">
		<a-layout>
			<a-layout-header :style="{'background-color': '#427cf7', color: '#fff', padding: 0}">
				<appHeader :user="user" :active="active" :change="searchChangeFunc"/>
			</a-layout-header>
			<a-layout-content :style="{'background-color': '#f7f7f7'}">
				<!-- <cloud v-if="active == 0"></cloud>
				<support v-if="active == 1"></support>
				<invoice v-if="active == 2"></invoice>
				<settings v-if="active == 3"></settings> -->
				<router-view :search="search"></router-view>
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
	props: {
		user: Object,
	},
	data(){
		return {
			activeName: '',
			search: false
		}
	},
	methods: {
		changeActive(newStatus, title){
			if(this.activeName == title) return;
			this.$router.push({ name: title})
		},
		searchChangeFunc(){
			this.search = !this.search;
		}
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
	},
	watch: {
		$route(to, from){
			this.activeName = to.name == 'cloudHome' ? 'cloud' : to.name;
		}
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
</style>