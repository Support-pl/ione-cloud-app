<template>
	<div class="tickets">
		<loading v-if="isLoading" />

		<template v-else>
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
import axios from 'axios';
import md5 from 'md5';
import singleTicket from "./singleTicket.vue";
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
	},
	computed: {
		user(){
			return this.$store.getters['support/getUser'];
		},
		isLoading(){
			return this.$store.getters['support/isLoading'];
		},
		tickets(){
			return this.$store.getters['support/getTickets'];
		}
	},
	mounted(){
		this.$store.dispatch("support/fetchTickets")
	},
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