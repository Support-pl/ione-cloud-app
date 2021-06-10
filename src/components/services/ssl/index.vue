<template>
	<!-- <div class="service-ssl">
		<p>{{productName}}</p>
	</div> -->
	<product :title="productName" :date="data.firstpaymentamount" :cost="data.recurringamount" :domain="data.domain" :wholeProduct="data"></product>
</template>

<script>
import product from '../../userProducts/product';

export default {
	name: 'ssl-component',
	components: {
		product
	},
	props: ['data'],
	computed: {
		productName(){
			return this.data.name.replace(/[а-яА-Я]/gi, '').trim();
		}
	},
	created(){
		console.log(this.data);
	}
}
</script>

<style>
</style>