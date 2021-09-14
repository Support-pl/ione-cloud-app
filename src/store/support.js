import api from '@/api'

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
	},
	getters: {
		getAllTickets(state){
			return state.tickets;
		},
		getTickets(state){
			const order = [
				'open',
				'closed'
			];
			console.log(state.tickets);
			const tickets = state.tickets.sort((a,b) => {
				return order.indexOf(a.status.toLowerCase()) - order.indexOf(b.status.toLowerCase());
			})
			if (state.filter[0] == 'all' || state.filter.length == 0) {
				return tickets;
			} else {
				return tickets.filter(ticket => state.filter.includes(ticket.status))
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