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
		user: Object
	},
	data(){
		return {
			isLoading: true,
			invoices: [
				// {
				// 	id: '123',
				// 	cost: '30',
				// 	currency: 'USD',
				// 	status: 'Unpaid',
				// 	invoiceDate: '07/01/2020',
				// 	dueDate: '17/01/2020',
				// 	service: 'CRM+ (Cloud)'
				// },{
				// 	id: '124',
				// 	cost: '50',
				// 	currency: 'USD',
				// 	status: 'Unpaid',
				// 	invoiceDate: '07/01/2020',
				// 	dueDate: '17/01/2020',
				// 	service: 'CRM+ (Cloud)'
				// },{
				// 	id: '125',
				// 	cost: '50',
				// 	currency: 'USD',
				// 	status: 'Paid',
				// 	invoiceDate: '07/01/2020',
				// 	dueDate: '17/01/2020',
				// 	service: 'CRM+ (Cloud)'
				// }
			]
		}
	},
	mounted(){
		axios.get(`https://devwhmcs.support.by/app_cloud_mobile/invoices.php?id=${this.user.id}`)
		.then(res => {
			this.isLoading = false;
			// console.log(res);
			this.invoices = res.data.invoices.invoice;
		})
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