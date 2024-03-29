<template>
	<div class="product">
		<div class="product__icon-wrapper">
			<a-badge dot :count="wholeProduct.invoicestatus == 'Unpaid' ? 1 : 0" :offset='[-10, 2]'>
				<div class="product__icon" :style="{'background-color': `var(--${iconColor})`}">
					<a-icon
						v-if="$config.getServiceType(wholeProduct.groupname)"
						:type="$config.services[$config.getServiceType(wholeProduct.groupname)].icon"
					/>
					<a-icon
						v-else
						type="shopping-cart"
					/>
				</div>
			</a-badge>
		</div>

		<div class="product__text">
			<div class="product__column product__column--main-info">
				<div class="product__title">
					{{title}}
				</div>
				
				<div v-if="domain !== null" class="product__domain">{{domain}}</div>
			</div>
			<component :service="wholeProduct" :is="getModuleProductBtn"></component>
			<div class="product__column product__column--secondary-info">
				<div class="product__date">{{localDate}}</div>
				<div class="product__cost">
					{{user.currency_code === '$' || user.currency_code.toUpperCase() === 'USD'
						? `$${cost}`
						: `${cost | numsepar} ${user.currency_code}`
					}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import config from '@/appconfig.js'

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
		status: {
      type: [String],
      required: true
		},
		domain: {
			type: String,
			default: null
		},
		wholeProduct: Object
	},
	computed: {
		user(){
			return this.$store.getters['getUser'];
		},
		localDate(){
			return new Intl.DateTimeFormat().format(this.date);
		},
		iconColor(){
			const status = this.status.toLowerCase();
			let colorVariableName = '';
			switch (status) {
				case 'active':
					colorVariableName = 'success';
					break;
				case 'suspended':
					colorVariableName = 'warn';
					break;
				case 'cancelled':
					colorVariableName = 'gray';
					break;
			
				default:
					colorVariableName = 'gray'
					break;
			}
			return colorVariableName;
		},
		getModuleProductBtn(){
			let serviceType = config.getServiceType(this.wholeProduct.groupname)
			if(serviceType == undefined) return;
			serviceType = serviceType.toLowerCase();
			return () => import(`@/components/services/${serviceType}/lilbtn`);
		}
	},
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
	font-size: 1.5rem;
	margin-right: 10px;
	height: 50px;
	width: 50px;
	background-color: #c4c4c4;
	border-radius: 10px;
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
	color: #fff;
}

.product__text{
	display: flex;
	flex: 0 1 100%;
	justify-content: space-between;
	padding: 5px 0 5px;
	min-width: 0;
}

.product__column{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-width: 0;
}

.product__column--main-info{
	flex-grow: 1;
	padding-right: 8px;
}

.product__column--secondary-info{
	flex-shrink: 0;
}

.product__title{
	margin: auto 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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