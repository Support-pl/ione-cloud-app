import md5 from 'md5';
import axios from 'axios';


const clouds = [{
	id: '123123',
	title: 'user_10350_vmuser_10350_vmuser_10350_vm',
	status: 'SUSPEND',
	host: 'vcenter',
	ip: '186.66.68.222'
}, {
	id: '1241243123',
	title: 'user_10350_vm',
	status: 'SUSPEND',
	host: 'vcenter',
	ip: '186.66.68.222'
}, {
	id: '123123423',
	title: 'user_10350_vm',
	status: 'RUNNING',
	host: 'vcenter',
	ip: '186.66.68.222'
}, {
	id: '121239723',
	title: 'user_10350_vm',
	status: 'POWEROFF',
	host: 'vcenter',
	ip: '186.66.68.222'
}];


export default {
	namespaced: true,

	state: {
		loading: false,
		isSearch: false,
		clouds: [],
	},
	mutations: {
		updateClouds(state, value) {
			state.clouds = value;
		},
		makeLoadingIs(state, value) {
			state.loading = value;
		},
		inverseSearch(state) {
			state.isSearch = !state.isSearch;
		}
	},
	actions: {
		fetchClouds(ctx) {
			if (ctx.getters.isLoading) return;
			ctx.commit('makeLoadingIs', true);
			const user = ctx.rootGetters.getUser;

			const close_your_eyes = md5('orders' + user.id + user.secret);

			// const url = `https://devwhmcs.support.by/app_cloud_mobile/orders.php?id=${user.id}`;
			const url = `https://devwhmcs.support.by/app_cloud_mobile/orders.php?id=${user.id}&secret=${close_your_eyes}`;
			console.log(url)

			axios.get(url)
				.then(resp => {
					console.log("vuex got clouds: ", resp);
					ctx.commit("updateClouds", resp.data.data)
					ctx.commit('makeLoadingIs', false)
				})
		},
		// fetchClouds(ctx) {
		// 	if (ctx.getters.isLoading) return;
		// 	ctx.commit('makeLoadingIs', true);
		// 	setTimeout(() => {
		// 		ctx.commit('updateClouds', clouds);
		// 		ctx.commit('makeLoadingIs', false);
		// 	}, 700);
	},
	getters: {
		getClouds(state) {
			return state.clouds;
		},
		isLoading(state) {
			return state.loading;
		},
		isSearch(state){
			return state.isSearch;
		},
		getCloudById: state => id => {
			return state.clouds.find(el => el.ID = id)
		}
	}
}