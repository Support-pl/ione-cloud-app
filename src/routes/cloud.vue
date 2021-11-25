<template>
	<div class="cloud">
		
		<!-- <div v-if="isSearch" class="search">
			<div class="cloud_search-wrapper">
				<input type="text" v-model="textToSearch" placeholder="Filter by name or status">
				<div class="cloud_search-clear" @click="SearchClear">
					<a-icon type="close" />
				</div>
			</div>
		</div> -->
		<loading v-if="isLoading" />

		<template v-else>
			<div class="container">

				<div class="create-vm__wrapper">

					<div class="create-vm__header">
						<div class="create-vm__title">
						{{$t('create server') | capitalize}}
						</div>
					</div>

						<div class="create-vm__type">
							<div class="cloud__new-btn" @click="createVM('PaaS')">
								<span style="font-size: 1.1rem">
									{{$t('PaaS.createButton') | capitalize}}
								</span>
							</div>

							<div class="create-vm__description cloud__info info">
								<p class="info__content">
									{{$t('PaaS.description')}}
								</p>
							</div>
						</div>

						<div class="create-vm__type">
							<div class="cloud__new-btn" @click="createVM('IaaS')">
								<span style="font-size: 1.1rem">
									{{$t('IaaS.createButton') | capitalize}}
								</span>
							</div>

							<div class="create-vm__description cloud__info info">
								<p class="info__content">
									{{$t('IaaS.description')}}
								</p>
							</div>
						</div>
				</div>

				<!-- <empty v-if="getClouds.length == 0"/>	 -->
				<!-- <div v-else class="cloud__wrapper"> -->
				<div class="cloud__wrapper">
					<cloudItem v-for="(cloud, idx) in getClouds" :key="idx" :cloud="cloud"/>
					<div v-if="$route.query.type != undefined && $route.query.type.length > 0" class="cloud__new-btn" @click="createVM()">
						<span style="font-size: 1.2rem">
							{{$t('create server') | capitalize}}
						</span>
					</div>
				</div>


				<div v-if="$route.query.type != undefined && $route.query.type.length > 0" class="cloud__info info">
					<div class="info__header-container">
						<h2 class="info__header">
							<a-icon type="notification" />
							<span class="info__header-text">
								{{$t('info') | capitalize}}
							</span>
						</h2>
					</div>
					<div class="info__content">
						{{$t($route.query.type + '.order_info')}}
					</div>
				</div>
			</div>

		</template>
	</div>
</template>

<script>
import cloudItem from '../components/appMain/cloud/cloudItem.vue';
import loading from '../components/loading/loading.vue';
import empty from '../components/empty/empty.vue';
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
		createVM(type){
			let newRouteName;
			type = type || this.$route.query.type;
			if(type == 'IaaS'){
				newRouteName = 'newVDC'
			}
			if(type == 'PaaS'){
				newRouteName = 'newPaaS'
			}
			this.$store.dispatch("app/setTabByName", newRouteName);
		},
	},
	created(){
		this.$store.dispatch('cloud/autoFetchClouds');
	},
	computed: {
		...mapGetters('cloud', ['isLoading', 'isSearch']),
		getClouds(){
			const clouds = this.$store.getters['cloud/getClouds'](this.textToSearch);
			if(this.$route.query.type == 'IaaS'){
				return clouds.filter(el => +el.VDC);
			}
			if(this.$route.query.type == 'PaaS'){
				return clouds.filter(el => !+el.VDC);
			}

			return clouds;
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

.cloud__new-btn{
	position: relative;
	box-shadow: 4px 5px 10px rgba(0, 0, 0, .02);
	border-radius: 15px;
	min-height: 60px;
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

.cloud__info{
	max-width: 800px;
	margin-top: 30px;
	/* background: red; */
	padding: 10px 0 10px 10px;
	border-left: 5px solid var(--main);
}

.info__header{
	padding-left: 20px;
	font-size: 1.4rem;
}

.info__header-text{
	margin-left: 10px;
}

.info__content{
	font-size: 1.1rem;
}

.create-vm__wrapper{
	background: #fff;
	border-radius: 10px;
	padding: 10px 10px 15px 10px;
	margin-bottom: 10px;
}

.create-vm__title{
	font-size: 18px;
}
.create-vm__header{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
	margin-bottom: 15px;
}

.create-vm__type:not(:last-child){
	margin-bottom: 20px;
}

.create-vm__description{
	margin-left: 14px;
	margin-top: 5px;
	padding-right: 12px;
}

.create-vm__description p{
	margin-bottom: 7px;
}

@media screen and (min-width: 768px){
	.cloud__wrapper {
		/* height: 100%; */
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		grid-auto-rows: min-content;
		grid-gap: 20px;
	}
}

</style>