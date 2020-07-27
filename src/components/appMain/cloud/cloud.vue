<template>
	<div class="cloud" :class="{searchActive: isSearch}">
		
		<div v-if="isSearch" class="search">
			<input type="text" v-model="textToSearch" placeholder="Filter by name of status">
		</div>
		<loading v-if="isLoading" />

		<template v-else>
		
		<empty v-if="getClouds.length == 0"/>

		<div class="cloud__wrapper">
			<cloudItem v-for="(cloud, idx) in getClouds" :key="idx" :cloud="cloud"/>
		</div>
		</template>
	</div>
</template>

<script>
import cloudItem from './cloudItem.vue';
import loading from '../../loading/loading.vue';
import empty from '../../empty/empty.vue';
import { mapGetters } from 'vuex';



export default {
	name: "cloud",
	components: {
		cloudItem,
		loading,
		empty
	},
	data(){
		return {
			textToSearch: '',
		}
	},
	created(){
		this.$store.dispatch('cloud/fetchClouds');
	},
	computed: {
		...mapGetters('cloud', ['getClouds', 'isLoading', 'isSearch'])
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
		grid-auto-rows: min-content;
		grid-gap: 20px;
	}
}

</style>