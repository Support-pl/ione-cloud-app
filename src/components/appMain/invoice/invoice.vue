<template>
	<div class="invoices">
		<singleInvoice v-for='(invoice, index) in invoices' :key='index' :invoice='invoice'/>
	</div>
</template>

<script>
import singleInvoice from "./singleInvoice.vue"

export default {
	name: 'invoices',
	components: {
		singleInvoice
	},
	data(){
		return {
			invoices: [
				{
					id: '123',
					cost: '30',
					currency: 'USD',
					status: 'Unpaid',
					invoiceDate: '07/01/2020',
					dueDate: '17/01/2020',
					comment: 'CRM+ (Cloud)'
				},{
					id: '123',
					cost: '50',
					currency: 'USD',
					status: 'Unpaid',
					invoiceDate: '07/01/2020',
					dueDate: '17/01/2020',
					comment: 'CRM+ (Cloud)'
				},{
					id: '123',
					cost: '50',
					currency: 'USD',
					status: 'Paid',
					invoiceDate: '07/01/2020',
					dueDate: '17/01/2020',
					comment: 'CRM+ (Cloud)'
				}
			]
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