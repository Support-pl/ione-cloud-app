<template>
	<div class="cloud">
		<div v-if="clouds.length == 0" class="none">
			<div class="smile">:(</div>
			Тут пока ничего нет...
		</div>
		<cloudItem v-for="cloud in clouds" :key="cloud" :cloud="cloud"/>
	</div>
</template>

<script>
import cloudItem from './cloudItem.vue';

export default {
	name: "cloud",
	components: {
		cloudItem
	},
	data(){
		return {
			clouds: [{
				title: 'user_10350_vm',
				status: 'SUSPEND',
				host: 'vcenter',
				ip: '186.66.68.222',
				color: '#f9f038'
			},{
				title: 'user_10350_vm',
				status: 'SUSPEND',
				host: 'vcenter',
				ip: '186.66.68.222',
				color: '#f08a06'
			},{
				title: 'user_10350_vm',
				status: 'RUNNING',
				host: 'vcenter',
				ip: '186.66.68.222',
				color: '#49b649'
			},{
				title: 'user_10350_vm',
				status: 'POWEROFF',
				host: 'vcenter',
				ip: '186.66.68.222',
				color: '#919191'
			}
			]
		}
	}
}
</script>

<style>
.cloud{
	height: 100%;
	overflow: auto;
}
.none{
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 32px;
}
.smile{
	transform: rotate(90deg);
	width: 100px;
	height: 100px;
	font-size: 64px;
}
</style>