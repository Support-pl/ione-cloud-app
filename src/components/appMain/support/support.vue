<template>
	<div class="tickets">
		<singleTicket v-for='(ticket, index) in tickets' :key='index' :ticket='ticket'/>
	</div>
</template>

<script>
import singleTicket from "./singleTicket.vue"

export default {
	name: 'support',
	components: {
		singleTicket
	},
	data(){
		return {
			tickets: [
				{
					id: 123123,
					title: 'test1',
					message: 'test1 for test',
					status: 'unreaded',
					time: '2020-03-19 18:00:18'
				},{
					id: 412424,
					title: 'test2',
					message: 'test2 for test',
					status: 'unreaded',
					time: '2020-03-19 02:25:50'
				},
			]
		}
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