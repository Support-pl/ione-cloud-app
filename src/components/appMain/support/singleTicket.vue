<template>
	<div class="ticket" @click="ticketClick(ticket.id)">
		<div class="ticket__status"></div>
		<div class="ticket__content">
			<div class="ticket__upper">
				<div class="ticket__title">{{ticket.title}}</div>
				<div class="ticket__time">{{ticket.time}}</div>
			</div>
			<div class="ticket__lower">{{ticket.message}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ticket",
	props: {
		ticket: Object,
	},
	methods: {
		ticketClick(id){
			this.$router.push('ticket-' + id);
		}
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
		line-height: 0.8;
	}
	.ticket__status{
		width: 10px;
		height: 10px;
		position: absolute;
		background-color: #f84237;
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