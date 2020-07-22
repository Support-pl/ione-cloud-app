<template>
	<div class="invoices">
		<loading v-if="isLoading" />

		<template v-else>
			<empty v-if="invoices.length == 0"/>
			<div class="invoices__wrapper">
				<singleInvoice v-for='(invoice, index) in invoices' :key='index' :invoice='invoice'/>
			</div>
		</template>
	</div>
</template>

<script>
const axios = require('axios');
const md5 = require('md5');

import singleInvoice from "./singleInvoice.vue";
import loading from '../../loading/loading.vue';
import empty from '../../empty/empty.vue';

export default {
	name: 'invoices',
	components: {
		singleInvoice,
		loading,
		empty
	},
	props: {
		user: Object,
		stopInvoiceReload: Function,
		invoiceReload: Boolean
	},
	data(){
		return {
			isLoading: true,
			invoices: []
		}
	},
	methods: {
		loadInvoices(){

			const close_your_eyes = md5('invoices'+this.user.id+this.user.secret);
			const url = `https://devwhmcs.support.by/app_cloud_mobile/invoices.php?id=${this.user.id}&secret=${close_your_eyes}`;
			console.log(url)

			this.isLoading = true;
			axios.get(url)
			.then(res => {
				console.log(res);
				this.invoices = res.data.invoices.invoice;
				this.isLoading = false;
			});
		}
	},
	mounted(){
		this.loadInvoices();
	},
	watch: {
		invoiceReload(){
			console.log("wath working");
			this.loadInvoices();
			this.stopInvoiceReload();
		}
	}
}
</script>

<style>
	.invoices{
		padding: 20px 10px 0;
		overflow: auto;
		height: 100%;
	}
</style>