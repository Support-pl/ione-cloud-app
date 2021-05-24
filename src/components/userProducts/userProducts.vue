<template>
	<div class="products">
		<div class="products__header">
			<div class="products__title">
				Ваши услуги
				<transition name="fade-in">
					<span v-if="loaded" class="products__count">
						всего: {{products.length || '0'}}
					</span>
				</transition>
			</div>
			<div class="products__all">
				все
			</div>
		</div>
		<div class="products__wrapper" :class="{ 'products__wrapper--loading': !loaded }">
			<template v-if="loaded">
				<product
					v-for="product in productsCuted"
					@click.native="testFunc(product)"
					:key="product.id"
					:title="product.name"
					:date="new Date(product.regdate)"
					:cost="product.firstpaymentamount"
					:domain="product.domain"
					:wholeProduct="product"
				/>
			</template>
			<loading v-else/>
		</div>
	</div>
</template>

<script>
import product from './product.vue'
import loading from '../loading/loading.vue'
import api from '../../api.js'

export default {
	name: 'products-block',
	components: {
		product,
		loading
	},
	data(){
		return {
			products: [
				{
					title: 'SVDS',
					date: '20.11.2021',
					cost: 1.25
				},
				{
					title: 'SVDS L SSD',
					domain: '192.168.0.15',
					date: '20.11.2021',
					cost: 1.25
				},
				{
					title: 'SVDS L SSD',
					domain: '192.168.0.15',
					date: '20.11.2021',
					cost: 1.25
				},
				{
					title: 'SVDS L SSD',
					domain: '192.168.0.15',
					date: '20.11.2021',
					cost: 1.25
				},
			],
			loaded: false,
		}
	},
	mounted(){
		api.sendAsUser('get.user.products')
		.then(res => {
			this.products = res.products;
			this.loaded = true;
		})
		.catch(error => console.error(error))
	},
	computed: {
		productsCuted(){
			return this.products.slice(0, 3);
		}
	},
	methods: {
		testFunc(product){
			console.log(product);
			if(product.groupname === 'IaaS'){
				this.$router.push({name: 'cloud', query: {type: 'IaaS'}})
			}
			if(product.status === "Cancelled"){
				const key = 'That product cancelled';
				this.$message.warning(key);
			}
			if(product.status === "Active"){
				const vms = this.$store.getters['cloud/getClouds']();
				const id = vms.find( vm => vm.id_service == product.id).ID;
				this.$router.push(`cloud-${id}`);
			}
		}
	}
}
</script>

<style>
.products{
	background: #fff;
	border-radius: 10px;
	padding: 10px 10px 15px 10px;
}

.products__header{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
	margin-bottom: 15px;
}

.products__wrapper--loading{
	min-height: 170px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.products__title{
	font-size: 18px
}

.products__count{
	color: #aeaeae
}

.products__all{
	text-transform: uppercase;
	color: var(--main);
	cursor: pointer;
}

.products__all:hover{
	text-decoration: underline;
}

/* animations */

.fade-in-enter-active, .fade-in-leave-active {
  transition: opacity .5s ease;
}
.fade-in-enter, .fade-in-leave-to {
  opacity: 0;
}
</style>