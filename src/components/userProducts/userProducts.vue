<template>
	<div class="products_wrapper">
		<div class="products__header">
			<div class="products__title">
				Ваши услуги
				<transition name="fade-in">
					<span v-if="!productsLoading" class="products__count">
						всего: {{products.length || '0'}}
					</span>
				</transition>
			</div>
			
			<div v-if="min" class="products__all">
				<router-link :to="{name: 'products'}">
					все
				</router-link>
			</div>
			<div v-else class="products__control">
				<a-popover placement="bottomRight">
					<template slot="content">
						<p>coming soon</p>
					</template>
					<template slot="title">
						<span>Filter</span>
					</template>
					<a-icon class="products__control-item" type="filter" />
				</a-popover>
				<a-popover placement="bottomRight">
					<template slot="content">
						<p>coming soon</p>
					</template>
					<template slot="title">
						<span>Sort</span>
					</template>
					<a-icon class="products__control-item" type="sort-ascending" />
				</a-popover>
			</div>

		</div>
		<div class="products__wrapper" :class="{ 'products__wrapper--loading': productsLoading }">
			<template v-if="!productsLoading">
				<product
					v-for="product in productsPrepared"
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

export default {
	name: 'products-block',
	components: {
		product,
		loading
	},
	props: {
		min: {
			type: Boolean,
			default: true
		}
	},
	data(){
		return {
		}
	},
	mounted(){
		this.$store.dispatch('products/autoFetchProducts');
	},
	computed: {
		productsPrepared(){
			if(this.min) return this.products.slice(0, 3);
			return this.products
		},
		products(){
			return this.$store.getters['products/getProducts'];
		},
		productsLoading(){
			return this.$store.getters['products/getProductsLoading'];
		},
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
.products_wrapper{
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

.products__control-item{
	font-size: 1.4rem;
	transition: color .2s ease;
}

.products__control-item:not(:last-child){
	margin-right: 10px;
}

.products__control-item:hover{
	color: var(--main);
}
</style>