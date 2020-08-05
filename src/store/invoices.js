import md5 from 'md5';
import axios from 'axios';
export default {
	namespaced: true,

	state: {
		loading: false,
		invoices: [],
	},
	mutations: {
		updateInvoices(state, value) {
			state.invoices = value;
		},
		makeLoadingIs(state, value) {
			state.loading = value;
		},
	},
	actions: {
		fetchInvoices(ctx) {
			if (ctx.getters.isLoading) return;
			ctx.commit('makeLoadingIs', true);
			const user = ctx.rootGetters.getUser;

			const close_your_eyes = md5('invoices' + user.id + user.secret);
			const url = `https://my.support.by/app_cloud_mobile/invoices.php?id=${user.id}&secret=${close_your_eyes}`;
			console.log(url)

			axios.get(url)
				.then(resp => {
					console.log("vuex action invoices responsive: ", resp);
					ctx.commit("updateInvoices", resp.data.invoices.invoice)
					ctx.commit('makeLoadingIs', false)
				})
		},
	},
	getters: {
		getInvoices(state) {
			return state.invoices;
		},
		isLoading(state) {
			return state.loading;
		},
	}
}