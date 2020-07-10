<template>
	<div class="cloud" :class="{searchActive: search}">
		
		<div v-if="search" class="search">
			<input type="text" v-model="textToSearch" placeholder="Filter by name of status">
		</div>
		<loading v-if="isLoading" />

		<template v-else>
		<div v-if="clouds.length == 0" class="none">
			<div class="smile">:(</div>
			Тут пока ничего нет...
		</div>
		<div class="cloud__wrapper">
			<cloudItem v-for="(cloud, idx) in clouds" :key="idx" :cloud="cloud"/>
		</div>
		</template>
	</div>
</template>

<script>
import cloudItem from './cloudItem.vue';
import loading from '../../loading/loading.vue';

export default {
	name: "cloud",
	props: {
		search: Boolean
	},
	components: {
		cloudItem,
		loading
	},
	data(){
		return {
			textToSearch: '',
			isLoading: true,
			clouds: [{
				id: '123123',
				title: 'user_10350_vmuser_10350_vmuser_10350_vm',
				status: 'SUSPEND',
				host: 'vcenter',
				ip: '186.66.68.222'
			},{
				id: '1241243123',
				title: 'user_10350_vm',
				status: 'SUSPEND',
				host: 'vcenter',
				ip: '186.66.68.222'
			},{
				id: '123123423',
				title: 'user_10350_vm',
				status: 'RUNNING',
				host: 'vcenter',
				ip: '186.66.68.222'
			},{
				id: '121239723',
				title: 'user_10350_vm',
				status: 'POWEROFF',
				host: 'vcenter',
				ip: '186.66.68.222'
			}
			]
			// clouds: []
		}
	},
	created(){
		setInterval(()=>{
			this.isLoading = false;
		}, 700)
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


@media screen and (min-width: 768px){
	.cloud__wrapper {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		grid-template-rows: max-content;
		grid-gap: 20px;
	}
}

</style>