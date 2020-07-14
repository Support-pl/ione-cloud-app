<template>
	<div class="invoice" @click="clickOnInvoice(invoice.id)">
		<div class="invoice__header flex-between">
			<div class="invoice__id">#{{invoice.id}}</div>
			<div class="invoice__status" :style="{color: statusColor}">{{invoice.status}}</div>
		</div>
		<div class="invoice__middle flex-between">
			<div class="invoice__cost">{{invoice.subtotal}} {{invoice.currencyprefix}}</div>
			<div class="invoice__date-item invoice__invDate">
				<div class="invoice__date-title">
					Invoice Date
				</div>
				<div class="invoice__date">
					{{invoice.date}}
				</div>
			</div>
			<div class="invoice__date-item invoice__dueDate">
				<div class="invoice__date-title">
					Due Date
				</div>
				<div class="invoice__date">
					{{invoice.duedate}}
				</div>
			</div>
		</div>
		<div class="horisontal-line"></div>
		<div class="invoice__footer flex-between">
			<div class="invoice__service">{{invoice.service}}</div>
			<div class="invoice__btn"><a-icon type="right" /></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "invoice",
	props: {
		invoice: Object
	},
	computed: {
		statusColor(){
			return this.invoice.status.toLowerCase() == 'paid'? '#0fd058' : '#e82f3b';
		}
	},
	methods: {
		clickOnInvoice(id){
			this.$router.push("/invoice-" + id);
		}
	}
}
</script>

<style>
	.invoice{
		position: relative;
		padding: 8px 15px;
		box-shadow: 5px 8px 10px rgba(0, 0, 0, .05);
		border-radius: 15px;
		background-color: #fff;
		color:rgba(0, 0, 0, .7);
		cursor: pointer;
	}

	.invoice__status{
		font-weight: 600;
	}

	.invoice:not(:last-child){
		margin-bottom: 20px;
	}

	.invoice__dueDate{
		text-align: right;
	}

	.invoice__cost{
		font-size: 28px;
		color: #2590eb;
	}

	.horisontal-line{
		width: 100%;
		height: 1px;
		background-color: rgba(0,0,0,.2);
	}

	.flex-between{
		display: flex;
		justify-content: space-between;
	}

	.invoice__header,
	.invoice__middle,
	.horisontal-line{
		margin-bottom: 2px;
	}
</style>