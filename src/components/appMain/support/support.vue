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
	</div>
</template>

<script>
const axios = require('axios');

import singleTicket from "./singleTicket.vue"
import loading from '../../loading/loading.vue';
import empty from '../../empty/empty.vue';

export default {
	name: 'support',
	components: {
		singleTicket,
		loading,
		empty
	},
	props: {
		user: Object
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
	mounted(){
		axios.get(`https://devwhmcs.support.by/app_cloud_mobile/tickets.php?id=${this.user.id}`)
		.then(resp => {
			console.log(resp);
			if(resp.data.numreturned == 0) {
				this.tickets = []
			} else {
				this.tickets = resp.data.tickets.ticket;
			}
			this.isLoading = false;
		})
	}
}
</script>

<style>
	.tickets{
		padding: 20px 10px 0;
		overflow: auto;
		height: 100%;
	}
</style>

// todo: сделать чаты правее от всего