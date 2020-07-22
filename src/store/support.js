import md5 from 'md5';
import axios from 'axios';
export default {
	namespaced: true,

	state: {
		loading: true,
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
		}
	},
	actions: {
		fetchTickets(ctx){
			ctx.commit('makeLoadingIs', true);
			const closed = ctx.getters.isOnlyClosedTickets;
			const user = ctx.rootGetters.getUser;

			const close_your_eyes = md5('tickets' + user.id + user.secret);
			const url = `https://devwhmcs.support.by/app_cloud_mobile/tickets.php?id=${user.id}&secret=${close_your_eyes}${closed?"&closed=true":''}`;
			console.log(url)

			axios.get(url)
				.then(resp => {
					console.log("vuex action: ", resp);
					if (resp.data.numreturned == 0) {
						ctx.commit("updateTickets", [])
					} else {
						ctx.commit("updateTickets", resp.data.tickets.ticket)
					}
					ctx.commit('makeLoadingIs', false)
				})
		},
		fetchTicketsThatClosed(ctx){
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
		}
	}
}