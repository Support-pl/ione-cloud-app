<template>
	<div class="application">
		<a-layout>
			<a-layout-header :style="{'background-color': '#427cf7', color: '#fff', padding: 0}">
				<appHeader
					:active="active"
					:change="searchChangeFunc"
					:addTicketStatus="changeAddTicketStatus"
					:ticketStatus="addTicket"
					:showOnlyClosed="showOnlyClosed"
					:goSupportReload="goSupportReload"
					:goInvoiceReload="goInvoiceReload"/>
			</a-layout-header>
			<a-layout-content :style="{'background-color': '#f7f7f7', 'position': 'relative'}">
				<!-- <cloud v-if="active == 0"></cloud>
				<support v-if="active == 1"></support>
				<invoice v-if="active == 2"></invoice>
				<settings v-if="active == 3"></settings> -->
				<transition name="nomain__slider">
					<router-view class="frame"
						:search="search"
						:addTicket='addTicket'
						:showClosed='showClosed'
						:changeAddTicketStatus="changeAddTicketStatus"
						:stopSupportReload="stopSupportReload"
						:supportReload="supportReload"
						:invoiceReload="invoiceReload"
						:stopInvoiceReload="stopInvoiceReload"
						></router-view>
				</transition>
			</a-layout-content>
			<a-layout-footer :style="{padding: 0}">
				<appFooter :active="active" :changeFunc="changeActive" />
			</a-layout-footer>
    	</a-layout>
	</div>
</template>

<script>
import appFooter from './appFooter.vue';
import appHeader from './appHeader.vue';
import cloud from './cloud/cloud.vue';
import support from './support/support.vue';
import invoice from './invoice/invoice.vue';
import settings from './settings/settings.vue';

export default {
	name:"appMain",
	components: {
		appFooter,
		appHeader,
		cloud,
		support,
		invoice,
		settings
	},
	data(){
		return {
			activeName: '',
			search: false,
			addTicket: false,
			showClosed: false,
			supportReload: false,
			invoiceReload: false
		}
	},
	methods: {
		changeActive(newStatus, title){
			if(this.activeName == title) return;
			this.$router.push({ name: title})
		},
		searchChangeFunc(){
			this.search = !this.search;
		},
		changeAddTicketStatus(){
			this.addTicket = !this.addTicket;
		},
		showOnlyClosed(){
			this.showClosed = !this.showClosed;
		},
		goSupportReload(){
			console.log("goSupportReload");
			this.supportReload = true
		},
		stopSupportReload(){
			console.log("stopSupportReload");
			this.supportReload = false
		},
		goInvoiceReload(){
			console.log("goInvoiceReload");
			this.invoiceReload = true
		},
		stopInvoiceReload(){
			console.log("stopInvoiceReload");
			this.invoiceReload = false
		}
	},
	computed: {
		active: {
			get(){
				let ret = this.activeName == '' ? this.$router.currentRoute.name : this.activeName;
				ret = ret == "cloudHome" ? 'cloud' : ret;
				// console.log('~~~', ret, this.activeName, this.$router.currentRoute.name)
				return ret;
			},
			set(newVal){
				this.activeName = newVal; 
			}
		}
	},
	mounted(){
		// if(this.user == null){
		// 	this.$router.push('/login');
		// }
		// console.log(this.user)
	},
	watch: {
		$route(to, from){
			this.activeName = to.name == 'cloudHome' ? 'cloud' : to.name;
		}
	}
}
</script>

<style>
	.application{
		height: 100%;
		overflow: hidden;
	}

	.ant-layout{
		height: 100%;
	}

	.container {
		max-width: 768px;
		margin: 0 auto;
	}

	/* .main__slider-enter-active, .main__slider-leave-active {
		left: 0%;
		transition: left .1s;
	}

	.main__slider-enter, .main__slider-leave-to {
		opacity: 0;
		left: 100%
	} */

	.frame{
		position: absolute;
		height: 100%;
		width: 100%;
	}
</style>