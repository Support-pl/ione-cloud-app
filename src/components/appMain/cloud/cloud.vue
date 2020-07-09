<template>
	<div class="cloud" :class="{searchActive: search}">
		<div v-if="clouds.length == 0" class="none">
			<div class="smile">:(</div>
			Тут пока ничего нет...
		</div>
		<div v-if="search" class="search">
			<input type="text" v-model="textToSearch" placeholder="Filter by name of status">
		</div>
		<cloudItem v-for="(cloud, idx) in clouds" :key="idx" :cloud="cloud"/>
	</div>
</template>

<script>
import cloudItem from './cloudItem.vue';

export default {
	name: "cloud",
	props: {
		search: Boolean
	},
	components: {
		cloudItem
	},
	data(){
		return {
			textToSearch: '',
			clouds: [{
				id: '123123',
				title: 'user_10350_vm',
				status: 'SUSPEND',
				host: 'vcenter',
				ip: '186.66.68.222',
				color: '#f9f038'
			},{
				id: '1241243123',
				title: 'user_10350_vm',
				status: 'SUSPEND',
				host: 'vcenter',
				ip: '186.66.68.222',
				color: '#f08a06'
			},{
				id: '123123423',
				title: 'user_10350_vm',
				status: 'RUNNING',
				host: 'vcenter',
				ip: '186.66.68.222',
				color: '#49b649'
			},{
				id: '121239723',
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
	position: relative;
	padding: 20px 10px 0;
}

.searchActive{
	padding-top: 40px;
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

.search{
	background: #427cf7;
	padding: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}

.search input{
	outline: none;
	border: none;
	width: 90%;
	border-radius: 50px;
	padding: 5px 10px;
}


</style>