import api from '../api';

export default {
	namespaced: true,

	state: {
		loading: false,
		tickets: [],
		onlyClosedTickets: false,
		addTicketState: false,
		filter: ['all']
	},
	mutations: {
		updateTickets(state, value){
			state.tickets = value;
		},
		updateFilter(state, value){
			state.filter = value;
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
		silentFetch({commit}){
			return new Promise((resolve, reject) => {
				api.sendAsUser('tickets')
				.then(res => {
					const tickets = res.tickets.ticket;
					commit('updateTickets', tickets);
					commit('makeLoadingIs', false);
					resolve(tickets)
				})
				.catch(err => reject(err));
			});
		},
		fetch({dispatch, commit}){
			commit('makeLoadingIs', true);
			return dispatch('silentFetch');
		},
		autoFetch({state, dispatch}){
			if(state.tickets.length > 0){
				return dispatch('silentFetch');
			} else {
				return dispatch('fetch');
			}
		}
		
		// fetchTickets(ctx) {
		// 	if (ctx.getters.isLoading) return;
		// 	ctx.commit('makeLoadingIs', true);
		// 	const user = ctx.rootGetters.getUser;

		// 	const close_your_eyes = md5('tickets' + user.id + user.secret);
		// 	const url = `/tickets.php?userid=${user.id}&secret=${close_your_eyes}`;
		// 	// console.log(url)

		// 	axios.get(url)
		// 		.then(resp => {
		// 			// console.log("vuex action: ", resp);
		// 			if (resp.data.numreturned == 0) {
		// 				ctx.commit("updateTickets", [])
		// 			} else {
		// 				ctx.commit("updateTickets", resp.data.tickets.ticket)
		// 			}
		// 			ctx.commit('makeLoadingIs', false)
		// 		})
		// },
		// fetchTicketsThatClosed(ctx){
		// 	if(ctx.getters.isLoading) return;
		// 	const curState = ctx.getters.isOnlyClosedTickets;
		// 	ctx.commit("makeOnlyClosedTicketsIs", !curState);
		// 	ctx.dispatch("fetchTickets");
		// }
	},
	getters: {
		getAllTickets(state){
			return state.tickets;
		},
		getTickets(state){
			if (state.filter[0] == 'all' || state.filter.length == 0) {
				return state.tickets;
			} else {
				return state.tickets.filter(ticket => state.filter.includes(ticket.status))
			}
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