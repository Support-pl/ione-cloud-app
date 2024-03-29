<template>
	<div class="service-page">
		<div class="container">
			<div class="service-page-card">
				<template v-if="service">

					<div class="service-page__header">
						<div class="service-page__title">
							{{service.name}}
						</div>
						<div v-if="service.domain" class="service-page__domain">
							<a :href="service.domain">{{service.domain}}</a>
						</div>
					</div>

					<div class="service-page__info">
						<div class="service-page__info-title">{{$t('status') | capitalize}}:
							<a-tag :color="getTagColor">
								{{$t(service.status)}}
							</a-tag>
						</div>
					</div>

					<div class="service-page__info">
						<div class="service-page__info-title">{{$t('invoice status') | capitalize}}:
							<a-tag :color="getInvoiceStatusColor">
								{{$t('invoice_' + service.ORDER_INFO.invoicestatus)}}
							</a-tag>
							<router-link :to="{name: 'invoiceFS', params: {pathMatch: service.ORDER_INFO.invoiceid}}">
								<a-button size="small" type="primary">
									{{$t('open')}}
								</a-button>
							</router-link>
						</div>
					</div>

					<a-row :gutter='[10, 10]'>
						<a-col :md="12" :xs="12" :sm="12" v-for="elem in info" :key="elem.key">
							<div class="service-page__info">
								<div class="service-page__info-title">{{$t('userService.' + elem.title) | capitalize}}:</div>

								<div v-if="elem.type == 'money'" class="service-page__info-value">{{service[elem.key]}} {{user.currency_code}}</div>
								<div v-else-if="elem.type == 'date' && service[elem.key] == '0000-00-00'" class="service__info-value">-</div>
								<div v-else-if="elem.type == 'date'" class="service-page__info-value">{{new Intl.DateTimeFormat().format(new Date(service[elem.key]))}}</div>
								<div v-else-if="elem.type == 'text'" class="service-page__info-value">{{$t(service[elem.key].toLowerCase()) | capitalize}}</div>
								<div v-else class="service-page__info-value">{{service[elem.key]}}</div>
							</div>
						</a-col>
					</a-row>

					<component :is="getModuleButtons" :service="service" />

				</template>

				<loading v-else/>
			</div>
		</div>
	</div>
</template>

<script>
import loading from '@/components/loading/loading.vue'
import api from '@/api.js'
import config from '@/appconfig.js'

const info = [
	// {
	// 	title: 'first payment',
	// 	key: 'firstpaymentamount',
	// 	type: 'money',
	// },
	{
		title: 'billing cycle',
		key: 'billingcycle',
		type: 'text',
	},
	{
		title: 'renewal amount',
		key: 'recurringamount',
		type: 'money',
	},
	{
		title: 'registration date',
		key: 'regdate',
		type: 'date'
	},
	{
		title: 'next payment date',
		key: 'nextduedate',
		type: 'date'
	},
]

export default {
	name: "user-service-view",
	components: {
		loading
	},
	data(){
		return {
			service: null,
			info,
		}
	},
	created(){
		api.sendAsUser('services.getInfo', {
			serviceid: this.$route.params.pathMatch
		})
		.then(res => {
			this.service = res;
			// console.log(res);
		})
		.catch(err => {
			console.error(err);
		})
	},
	computed: {
		getTagColor(){
			switch (this.service.status) {
				case "Active":
					return 'green'
					break;
				case "Pending":
					return 'orange'
					break;
				case "Cancelled":
					return 'red'
					break;
			
				default:
					break;
			}
			return '';
		},
		getInvoiceStatusColor(){
			switch (this.service.ORDER_INFO.invoicestatus) {
				case "Paind":
					return 'green'
					break;
				case "Unpaid":
					return 'red'
					break;
			
				default:
					break;
			}
			return '';
		},
		user(){
			return this.$store.getters.getUser;
		},
		getModuleButtons(){
			let serviceType = config.getServiceType(this.service.groupname)
			if(serviceType == undefined) return;
			serviceType = serviceType.toLowerCase();
			return () => import(`@/components/services/${serviceType}/draw`);
		}
	}
}
</script>

<style>

.service-page{
	padding-top: 20px;
}

@media screen and (max-width: 768px) {
	.service-page{
		padding-left: 10px;
		padding-right: 10px;
	}
}

.d-flex{
	display: flex;
}

.service-page-card{
	background: #fff;
	border-radius: 10px;
	padding: 10px 15px 15px;
}

.service-page__header{
	margin-bottom: 10px;
}

.service-page__title{
	font-size: 1.6rem;
}

.service-page__domain{
	font-size: 1rem;
}

.service-page__info:not(:last-of-type){
	margin-bottom: 5px;
}

.service-page__info-title{
	font-weight: bold;
}

.service-page__info-value{
	font-size: 1.1rem;
}
</style>