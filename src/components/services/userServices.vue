<template>
	<div class="user-services">
		<div class="container">
			<component v-for="prod in serviceProducts" :key="prod.id" :is="componentName"></component>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'user-services',
	components: {
		ssl: () => import('./ssl/index')
	},
	computed: {
		componentName(){
			return this.$route.meta.componentName;
		},
		serviceProducts(){
			const prods = this.$store.getters['products/getProducts'];
			return prods.filter( element => element.groupname == this.$route.meta.productsGroupName);
		},
		...mapGetters('products', ['getProductsLoading'])
	},
	mounted(){
		this.$store.dispatch('products/autoFetch');
	}
}
</script>

<style>
.user-services{
	padding-top: 20px;
}
</style>