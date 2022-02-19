<template>
	<div class="cloud">
		<loading :ha="true" v-if="isLoading" />
		<template v-else>
			<div class="container ha">
				<div class="cloud__wrapper">
					<cloudItem v-for="(cloud, idx) in getClouds" :key="idx" :cloud="cloud"/>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import cloudItem from '@/components/appMain/cloud/cloudItem.vue';
import loading from '@/components/loading/loading.vue';
import { mapGetters } from 'vuex';



export default {
	name: "cloud",
	components: {
		cloudItem,
		loading
	},
	created(){
		this.$store.dispatch('vms/fetch');
	},
	computed: {
		...mapGetters('app', ['isMaintananceMode']),
		getClouds(){
			const clouds = this.$store.getters['vms/instances'];
			return clouds;
		},
		// instances(){
		// 	if(this.isLoading) return []
		// 	const instances = [];
		// 	this.getClouds.forEach(service => {
		// 		Object.keys(service.instancesGroups).forEach(groupName => {
		// 			service.instancesGroups[groupName].instances.forEach(instance => {
		// 				instance.status = service.status
		// 				instances.push(instance)
		// 			})
		// 		})
		// 	})
		// 	return instances
		// },
		isLoading(){
			// console.log(this.getClouds);
			// if(this.getClouds.length == 0) return false
			// else return true
			const loading = this.$store.getters['vms/isLoading'];
			return loading;
			// return false
			// return true
		},
		isLogged(){
			return this.$store.getters['auth/isLoggedIn'];
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

.cloud_search-wrapper{
	width: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}

.search input{
	outline: none;
	border: none;
	width: 100%;
	border-radius: 50px;
	padding: 5px 10px;
}

.cloud_search-clear{
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	cursor: pointer;
}

.ha{
	height: auto;
	min-height: auto;
}

@media screen and (min-width: 768px){
	.cloud__wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		grid-auto-rows: min-content;
		grid-gap: 20px;
	}
}

</style>