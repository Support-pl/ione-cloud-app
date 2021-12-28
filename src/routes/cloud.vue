<template>
	<div class="cloud">
		<maintanance-mode v-if="isMaintananceMode"></maintanance-mode>
		<template v-else>
			<div class="container ha">
				<create-vm />
			</div>
			<loading :ha="true" v-if="isLoading" />
			<template v-else>
				<div class="container ha">
					<div class="cloud__wrapper">
						<cloudItem v-for="(cloud, idx) in getClouds" :key="idx" :cloud="cloud"/>
					</div>
				</div>
			</template>
		</template>
	</div>
</template>

<script>
import cloudItem from '@/components/appMain/cloud/cloudItem.vue';
import loading from '@/components/loading/loading.vue';
import empty from '@/components/empty/empty.vue';
import createvm from '@/components/createVM.vue';
import maintanance from '@/components/maintanance.vue';
import { mapGetters } from 'vuex';



export default {
	name: "cloud",
	components: {
		cloudItem,
		loading,
		empty,
		maintanance,
		'create-vm': createvm
	},
	created(){
		if(this.isLogged){
			this.$store.dispatch('cloud/autoFetchClouds');
		}
	},
	computed: {
		...mapGetters('cloud', ['isLoading']),
		...mapGetters('app', ['isMaintananceMode']),
		getClouds(){
			const clouds = this.$store.getters['cloud/getClouds'];
			return clouds;
		},
		isLogged(){
			return this.$store.getters.isLogged;
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