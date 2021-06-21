<template>
	<div class="products_wrapper">
		<div class="products__header">
				<div class="products__title">
					Ваши услуги
					<transition name="header-transition" mode="out-in">
					<span class="header__animated" :key="$route.query.type || 'emptyQuery'">
						<span v-if="isNeedFilterStringInHeader">
							по фильтру: <b>{{$route.query.type.replace(/,/g, ', ')}}</b>
						</span>
						<transition name="fade-in">
							<span v-if="!productsLoading" class="products__count">
								всего: {{productsCount}}
							</span>
						</transition>
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
						<p v-for="(type, key) in $config.services" :key="key">
							<a-checkbox
								:checked="!!~checkedTypes.indexOf(key)"
								@click="filterElementClickHandler(key)"
							>
								{{key}}
							</a-checkbox>
						</p>
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
					@click.native="productClickHandler(product)"
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
		this.$store.dispatch('products/autoFetch');
	},
	computed: {
		productsPrepared(){
			if(this.min) return this.products.slice(0, 3);
			else if(this.$route.query.type) {
				const types = this.checkedTypes;
				const result = this.products.filter( element => { //фильтруем по значениям из гет запроса
					return types.some( type => {
						const groupname = this.$config.services[type].groupname;
						if(typeof groupname == 'string') return groupname.toLowerCase() == element.groupname.toLowerCase();
						else return groupname.some( group => group.toLowerCase() == element.groupname.toLowerCase());
					})
				})
				return result;
			}
			return this.products
		},
		products(){
			return this.$store.getters['products/getProducts'];
		},
		productsLoading(){
			return this.$store.getters['products/getProductsLoading'];
		},
		checkedTypes(){
			return this.$route.query?.type?.split(',').filter(el => el.length > 0) || [];
		},
		productsCount(){
			if(this.min){
				return this.products.length
			} else if(this.$route.name == 'products') {
				return this.productsPrepared.length;
			} else {
				return 0
			}
		},
		isNeedFilterStringInHeader(){
			return this.$route.name == 'products' && this.$route.query.type
		}
	},
	methods: {
		productClickHandler(product){
			if(product.groupname === 'IaaS'){
				this.$router.push({name: 'cloud', query: {type: 'IaaS'}})
			}
			if(product.status === "Cancelled"){
				const key = 'That product cancelled.';
				this.$message.warning(key);
			}
			if(product.status === "Pending"){
				const key = 'That product is pending. Check your invoices.';
				this.$message.warning(key);
			}
			if(product.status === "Active"){
				const vms = this.$store.getters['cloud/getClouds']();
				const id = vms.find( vm => vm.id_service == product.id).ID;
				this.$router.push(`cloud-${id}`);
			}
		},
		filterElementClickHandler(key){
			const types = new Set(this.checkedTypes);
			if(types.has(key)){
				types.delete(key);
			} else {
				types.add(key);
			}
			const newTypes = Array.from(types).join(',');
			this.$router.replace({query: {type: newTypes}});
		}
	}
}
</script>

<style>
.header__animated{
	display: inline-block;
}

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


.header-transition-enter-active,
.header-transition-leave-active {
  transition: all .15s ease;
}

.header-transition-enter{
  transform: translateY(-0.5em);
  opacity: 0;
}

.header-transition-leave-to{
  transform: translateY(0.5em);
  opacity: 0;
}
</style>