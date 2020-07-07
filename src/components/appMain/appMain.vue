<template>
	<div class="application">
		<a-layout>
			<a-layout-header :style="{'background-color': '#427cf7', color: '#fff', padding: 0}">
				<appHeader :user="user" :active="active"/>
			</a-layout-header>
			<a-layout-content :style="{'background-color': '#f7f7f7'}">
				<cloud v-if="active == 0"></cloud>
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

export default {
	name:"appMain",
	components: {
		appFooter,
		appHeader,
		cloud
	},
	props: {
		user: Object,
	},
	data(){
		return {
			active: 0
		}
	},
	methods: {
		changeActive(newStatus){
			this.active = newStatus;
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
</style>