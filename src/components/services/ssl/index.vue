<template>
	<div class="service-ssl">
		<div class="container">
			<div class="order__wrapper">
				<h2>SSL calculator</h2>

				<div class="inputs">
					<div class="types">
						<a-select v-model="options.provider" style="width: 300px">
							<a-select-option v-for="provider of Object.keys(products)" :value="provider" :key="provider">{{provider}}</a-select-option>
						</a-select>
					</div>
					<div class="types">
						<a-select v-model="options.tarif" style="width: 300px">
							<a-select-option v-for="kind of products[options.provider]" :value="kind.tarif" :key="kind.tarif">{{kind.tarif}}</a-select-option>
						</a-select>
					</div>
					<div class="types">
						<a-input v-model="options.domain"></a-input>
					</div>
				</div>
				{{options.tarif}}

				<div class="result" v-if="Object.keys(products).length > 0">
					Итого: {{getProducts.pricing.annually}} {{getProducts.pricing.suffix}}
				</div>

				<div class="order">
					<a-button
						type="primary"
						@click="orderClickHandler"
						:loading="sendloading"
					>
						{{$t('order')}}
					</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api.js";

export default {
	name: 'ssl-component',
	data(){
		return {
			products: [],
			fetchLoading: false,
			sendloading: false,
			options: {
				provider: '',
				tarif: '',
				domain: ''
			}
		}
	},
	methods: {
		fetch(){
			this.fetchLoading = true;
			api.getWithParams('getSSL', {})
			.then(res => {
				this.products = res;
				this.options.provider = Object.keys(res)[0];
				this.options.tarif = res[this.options.provider][0].tarif;
			})
			.catch(err => console.error(err))
			.finally(() => {
				this.fetchLoading = false;
			})
		},
		orderClickHandler(){
			this.sendloading = true;
			api.sendAsUser('createOrderSSL', {
				domain: this.options.domain,
				billingcycle: 'annually',
				pid: this.getProducts.pid
			})
			.then(result => {
				this.$router.push(`/invoice-${result.invoiceid}`);
			})
			.catch(err => console.error(err))
			.finally(()=>{
				this.sendloading = false;
			})
		}
	},
	computed: {
		productName(){
			return 'test'
		},
		getProducts(){
			if(Object.keys(this.products).length == 0) return "NAN"
			return this.products[this.options.provider].find(el => el.tarif == this.options.tarif)
		}
	},
	created(){
		console.log(this.data);
		this.fetch();
	}
}
</script>

<style>

.service-ssl{
	padding-top: 15px;
}

.order__wrapper{
	background: #fff;
	border-radius: 10px;
	padding: 10px 10px 10px 10px;
}

</style>