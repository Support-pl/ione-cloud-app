<template>
	<div class="product">
		<div class="product__icon">
			icon
		</div>

		<div class="product__text">
			<div class="product__column">
				<div class="product__title">{{title}}</div>
				<div v-if="domain !== null" class="product__domain">{{domain}}</div>
			</div>
			<div class="product__column">
				<div class="product__date">{{localDate}}</div>
				<div class="product__cost">
					{{user.currency_code === '$' || user.currency_code.toUpperCase() === 'USD'
						? `$${cost}`
						: `${cost}${user.currency_code}`
					}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'product',
	props: {
		title: {
      type: String,
      required: true
		},
		date: {
      type: [String, Date],
      required: true
		},
		cost: {
      type: [String, Number],
      required: true
		},
		domain: {
			type: String,
			default: null
		}
	},
	computed: {
		user(){
			return this.$store.getters['getUser'];
		},
		localDate(){
			return new Intl.DateTimeFormat().format(this.date);
		}
	}
}
</script>

<style>
.product{
	display: flex;
	height: 50px;
	cursor: pointer;
	border-radius: 10px;
	padding: 0 5px 0 0;
	transition: background-color .2s ease;
}

.product:not(:last-child){
	margin-bottom: 10px;
}

.product:hover{
	background: #f9f9f9;
}

.product__icon{
	margin-right: 10px;
	height: 50px;
	width: 50px;
	background-color: #c4c4c4;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
}

.product__text{
	display: flex;
	flex: 0 1 100%;
	justify-content: space-between;
	padding: 5px 0 5px;
}

.product__column{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.product__title{
	margin: auto 0;
}

.product__date{
	font-size: 12px;
	color: #808080;
}

.product__date,
.product__cost{
	text-align: right;
}
</style>