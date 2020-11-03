<template>
	<div class="cloud" :class="{searchActive: isSearch}">
		
		<div v-if="isSearch" class="search">
			<div class="cloud_search-wrapper">
				<input type="text" v-model="textToSearch" placeholder="Filter by name or status">
				<div class="cloud_search-clear" @click="SearchClear">
					<a-icon type="close" />
				</div>
			</div>
		</div>
		<loading v-if="isLoading" />

		<template v-else>
		
		<!-- <empty v-if="getClouds.length == 0"/> -->

		<div class="cloud__wrapper">
			<cloudItem v-for="(cloud, idx) in getClouds" :key="idx" :cloud="cloud"/>
			<div class="cloud__new-btn" @click="createVDC()">
				<!-- <a-icon type="plus"></a-icon> -->
				<span style="font-size: 1.2rem">
					{{$t('Create VM')}}
				</span>
			</div>
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
	methods: {
		SearchClear(){
			this.textToSearch = '';
		},
		createVDC(){
			this.$store.dispatch("app/setTabByName", "newVDC");
			// this.$router.push('/cloud/new');
		},
	},
	created(){
		this.$store.dispatch('cloud/fetchClouds');
	},
	computed: {
		...mapGetters('cloud', ['isLoading', 'isSearch']),
		getClouds(){
			return this.$store.getters['cloud/getClouds'](this.textToSearch);
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
	padding-top: 50px;
}

.search{
	background: var(--main);
	padding: 4px;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	right: 0;
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

.cloud__new-btn{
	position: relative;
	box-shadow: 5px 8px 10px rgba(0, 0, 0, .05);
	border-radius: 15px;
	min-height: 70px;
	/* background-color: #fff; */
	border: 2px solid rgba(0, 0, 0, .1);
	color:rgba(0, 0, 0, .7);
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: transform .2s ease, box-shadow .2s ease;
}

.cloud__new-btn:hover{
	transform: translateY(2px);
	box-shadow:
		2px 2px 5px rgba(0, 0, 0, .00),
		inset 2px 4px 5px rgba(0, 0, 0, .05);
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