import md5 from 'md5';
import axios from 'axios';
export default {
	namespaced: true,

	state: {
		loading: false,
		tickets: [],
		onlyClosedTickets: false,
		addTicketState: false
	},
	mutations: {
		updateTickets(state, value){
			state.tickets = value;
		},
		makeLoadingIs(state, value){
			state.loading = value;
		},
		makeOnlyClosedTicketsIs(state, value){
			state.onlyClosedTickets = value
		},
		inverseAddTicketState(state){
			state.addTicketState = !state.addTicketState;
		}
	},
	actions: {
		fetchTickets(ctx) {
			if (ctx.getters.isLoading) return;
			ctx.commit('makeLoadingIs', true);
			const closed = ctx.getters.isOnlyClosedTickets;
			const user = ctx.rootGetters.getUser;

			const close_your_eyes = md5('tickets' + user.id + user.secret);
			const url = `https://my.support.by/app_cloud_mobile/tickets.php?id=${user.id}&secret=${close_your_eyes}${closed?"&closed=true":''}`;
			// console.log(url)

			axios.get(url)
				.then(resp => {
					// console.log("vuex action: ", resp);
					if (resp.data.numreturned == 0) {
						ctx.commit("updateTickets", [])
					} else {
						ctx.commit("updateTickets", resp.data.tickets.ticket)
					}
					ctx.commit('makeLoadingIs', false)
				})
		},
		fetchTicketsThatClosed(ctx){
			if(ctx.getters.isLoading) return;
			const curState = ctx.getters.isOnlyClosedTickets;
			ctx.commit("makeOnlyClosedTicketsIs", !curState);
			ctx.dispatch("fetchTickets");
		}
	},
	getters: {
		getTickets(state){
			return state.tickets;
		},
		isLoading(state){
			return state.loading;
		},
		isOnlyClosedTickets(state){
			return state.onlyClosedTickets;
		},
		isAddTicketState(state){
			return state.addTicketState;
		}
	}
}