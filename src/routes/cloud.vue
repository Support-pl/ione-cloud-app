<template>
	<div class="cloud">
		<loading v-if="isLoading" />
		<template v-else>
			<div class="container">
				<div class="create-vm__wrapper">
					<div class="create-vm__header">
						<div class="create-vm__title">
						{{$t('order server') | capitalize}}
						</div>
					</div>

					<a-row :gutter="[15,15]">
						<a-col :md="12" :xs="24" v-for="type in ['IaaS', 'PaaS']" :key="type">
							<a-button
								class="create-vm__btn"
								size="large"
								shape="round"
								icon="plus"
								type="primary"
								@click="createVM(type)"
								block
							>
								{{$t(type+'.createButton') | capitalize}}
							</a-button>
							<div class="create-vm__description cloud__info info">
								<p class="info__content">
									{{$t(type+'.description')}}
								</p>
							</div>
						</a-col>
					</a-row>

				</div>
				<div class="cloud__wrapper">
					<cloudItem v-for="(cloud, idx) in getClouds" :key="idx" :cloud="cloud"/>
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
	methods: {
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
		...mapGetters('cloud', ['isLoading']),
		getClouds(){
			const clouds = this.$store.getters['cloud/getClouds'];
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
	font-size: 1rem;
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
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		grid-auto-rows: min-content;
		grid-gap: 20px;
	}
}

</style>