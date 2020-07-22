<template>
	<div class="tickets">
		<loading v-if="isLoading" />

		<template v-else>
		<!-- <div v-if="tickets.length == 0" class="none">
			<div class="smile">:(</div>
			Тут пока ничего нет...
		</div> -->
		<empty v-if="tickets.length == 0"/>
		<div class="ticket__wrapper">
			<singleTicket v-for='(ticket, index) in tickets' :key='index' :ticket='ticket'/>
		</div>
		</template>

		<transition name="ticket__add">
			<addTicketField v-if="addTicket" :changeAddTicketStatus="changeAddTicketStatus" :user="user" :update="update"/>
		</transition>
	</div>
</template>

<script>
const axios = require('axios');
const md5 = require('md5');

import singleTicket from "./singleTicket.vue"
import loading from '../../loading/loading.vue';
import empty from '../../empty/empty.vue';
import addTicketField from './addTicket.vue';

export default {
	name: 'support',
	components: {
		singleTicket,
		loading,
		empty,
		addTicketField
	},
	props: {
		changeAddTicketStatus: Function,
		addTicket: Boolean,
		showClosed: Boolean,
		stopSupportReload: Function,
		supportReload: Boolean
	},
	data(){
		return {
			isLoading: true,
			tickets: [
				// {
				// 	id: 123123,
				// 	title: 'test1',
				// 	message: 'test1 for test',
				// 	status: 'unreaded',
				// 	time: '2020-03-19 18:00:18'
				// },{
				// 	id: 412424,
				// 	title: 'test2',
				// 	message: 'test2 for test',
				// 	status: 'unreaded',
				// 	time: '2020-03-19 02:25:50'
				// },
			]
		}
	},
	computed: {
		user(){
			return this.$store.getters.getUser;
		}
	},
	methods: {
		update(closed = false){
			this.isLoading = true;

			const close_your_eyes = md5('tickets'+this.user.id+this.user.secret);
			const url = `https://devwhmcs.support.by/app_cloud_mobile/tickets.php?id=${this.user.id}&secret=${close_your_eyes}${closed?"&closed=true":''}`;
			console.log(url)

			axios.get(url)
			.then(resp => {
				console.log("update: ",resp);
				if(resp.data.numreturned == 0) {
					this.tickets = []
				} else {
					this.tickets = resp.data.tickets.ticket;
				}
				this.isLoading = false;
			})
		}
	},
	mounted(){
		this.update();
	},
	watch: {
		showClosed(){
			this.update(this.showClosed)
		},

		supportReload(){
			this.update();
			this.stopSupportReload();
		}
	}
}
</script>

<style>
	.tickets{
		overflow: hidden;
		height: 100%;
		position: relative;
	}


	.ticket__wrapper{
		height: 100%;
		overflow: auto;
		padding: 20px 10px 0;
	}

	.ticket__add-enter-active.addTicket__wrapper,
	.ticket__add-leave-active.addTicket__wrapper {
		transition:
			opacity .2s ease;
		/* transform: translateY(150px); */
	}
	.ticket__add-enter-active .addTicket,
	.ticket__add-leave-active .addTicket {
		transition:
			opacity .2s ease,
			transform .3s ease;
		/* transform: translateY(150px); */
	}
	.ticket__add-enter-active,
	.ticket__add-leave-active {
		transition:
			all .4s ease,
		/* transform: translateY(150px); */
	}

	.ticket__add-enter.addTicket__wrapper,
	.ticket__add-leave-to.addTicket__wrapper {
		opacity: 0;
	}
	.ticket__add-enter .addTicket,
	.ticket__add-leave-to .addTicket {
		opacity: 0;
		transform: translateX(-50%) translateY(100%) !important;
	}
</style>

// todo (not sure): сделать чаты правее от всего