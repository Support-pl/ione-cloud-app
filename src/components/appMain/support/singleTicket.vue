<template>
	<div class="ticket" @click="ticketClick(ticket.id)">
		<div class="ticket__status" :style="{'background-color': statusColor}"></div>
		<div class="ticket__content">
			<div class="ticket__upper">
				<div class="ticket__title">#{{ticket.tid}} - {{ticket.subject}}</div>
				<div class="ticket__status-text">{{ticket.status}}</div>
			</div>
			<div class="ticket__lower">
				<div class="ticket__message">{{beauty(ticket.lastmessage.message)}}</div>
				<div class="ticket__time">{{ticket.lastreply}}</div>
			</div>
		</div>
	</div>
</template>

<script>
const axios = require('axios');

export default {
	name: "ticket",
	data(){
		return {
			// lastMessage: ''
		}
	},
	props: {
		ticket: Object,
	},
	methods: {
		ticketClick(id){
			this.$router.push('ticket-' + id);
		},
		beauty(message){
			// return message
			message = message.replace(/-{2,}.*/gi, '');
			message = message.replace(/IP Address.*/gi, '');
			return message;
		}
	},
	computed: {
		statusColor(){
			let color = '';
			switch (this.ticket.status.toLowerCase()) {
				case 'open':
					color = '#58f938';
					break;
				case 'customer-reply':
					color = '#f9f038';
					break;
				case 'closed':
					color = '#f9383b';
					break;
				default:
					color = '#f9f038';
					break;
			}
			return color;
		},
	},
	mounted(){
	}
}
</script>

<style>
	.ticket{
		position: relative;
		padding: 15px 20px 15px 40px;
		box-shadow: 5px 8px 10px rgba(0, 0, 0, .05);
		border-radius: 15px;
		background-color: #fff;
		cursor: pointer;
	}
	.ticket:hover{
		background-color: rgba(255,255,255,.55);
	}
	.ticket:not(:last-child){
		margin-bottom: 20px;
	}
	.ticket__upper{
		display: flex;
		justify-content: space-between;
	}
	.ticket__lower{
		display: flex;
		justify-content: space-between;
	}
	.ticket__status{
		width: 10px;
		height: 10px;
		position: absolute;
		border-radius: 50%;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
	}
	.ticket__title{
		font-weight: bold;
	}
	.ticket__time{
		font-size: .8rem;
		color:rgba(0, 0, 0, .3);
		font-weight: 600;
	}
</style>
