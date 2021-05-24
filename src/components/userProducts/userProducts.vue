<template>
	<div class="products">
		<div class="products__header">
			<div class="products__title">
				Ваши услуги
				<span class="products__count">
					всего: {{products.length || 'xxx'}}
				</span>
			</div>
			<div class="products__all">
				все
			</div>
		</div>
		<div class="products__wrapper">
			<product
				v-for="product in productsCuted"
				:key="product.title"
				:title="product.title"
				:date="product.date"
				:cost="product.cost"
				:domain="product.domain"
			/>
		</div>
	</div>
</template>

<script>
import product from './product.vue'

export default {
	name: 'products-block',
	components: {
		product,
	},
	data(){
		return {
			products: [
				{
					title: 'SVDS',
					date: '20.11.2021',
					cost: 1.25
				},
				{
					title: 'SVDS L SSD',
					domain: '192.168.0.15',
					date: '20.11.2021',
					cost: 1.25
				},
				{
					title: 'SVDS L SSD',
					domain: '192.168.0.15',
					date: '20.11.2021',
					cost: 1.25
				},
				{
					title: 'SVDS L SSD',
					domain: '192.168.0.15',
					date: '20.11.2021',
					cost: 1.25
				},
			]
		}
	},
	computed: {
		productsCuted(){
			return this.products.slice(0, 3);
		}
	}
}
</script>

<style>
.products{
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
</style>