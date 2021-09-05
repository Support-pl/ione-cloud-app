<template>
	<div class="service">
		<div class="container">
			<div class="service-card">
				<template v-if="service">

					<div class="service__header">
						<div class="service__title">
							{{service.name}}
						</div>
						<div v-if="service.domain" class="service__domain">
							<a :href="service.domain">{{service.domain}}</a>
						</div>
					</div>

					<div class="service__info">
						<div class="service__info-title">{{$t('status') | capitalize}}:</div>
						<div class="service__info-value">
							<a-tag :color="getTagColor">
								{{service.status}}
							</a-tag>
						</div>
					</div>

					<div class="service__info">
						<div class="service__info-title">Registration date:</div>
						<div class="service__info-value">{{new Intl.DateTimeFormat().format(new Date(service.regdate))}}</div>
					</div>

					<a-row :gutter='[10, 10]'>
						<a-col :md="12" :xs="24" :sm="12" v-for="elem in info" :key="elem.key">
							<div class="service__info">
								<div class="service__info-title">{{elem.title | capitalize}}:</div>
								<div v-if="elem.type == 'money'" class="service__info-value">{{service[elem.key]}} {{user.currency_code}}</div>
								<div v-else-if="elem.type == 'date' && service[elem.key] == '0000-00-00'" class="service__info-value">-</div>
								<div v-else-if="elem.type == 'date'" class="service__info-value">{{new Intl.DateTimeFormat().format(new Date(service[elem.key]))}}</div>
								<div v-else-if="elem.type == 'text'" class="service__info-value">{{$t(service[elem.key])}}</div>
								<div v-else class="service__info-value">{{service[elem.key]}}</div>
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
	{
		title: 'first payment',
		key: 'firstpaymentamount',
		type: 'money',
	},
	{
		title: 'renewal amount',
		key: 'recurringamount',
		type: 'money',
	},
	{
		title: 'billing cycle',
		key: 'billingcycle',
		type: 'text',
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
			console.log(res);
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

.service{
	padding-top: 20px;
}

@media screen and (max-width: 768px) {
	.service{
		padding-left: 10px;
		padding-right: 10px;
	}
}

.service-card{
	background: #fff;
	border-radius: 10px;
	padding: 10px 15px 15px;
}

.service__header{
	margin-bottom: 10px;
}

.service__title{
	font-size: 1.6rem;
}

.service__domain{
	font-size: 1rem;
}

.service__info:not(:last-of-type){
	margin-bottom: 5px;
}

.service__info-title{
	font-weight: bold;
}

.service__info-value{
	font-size: 1.1rem;
}
</style>