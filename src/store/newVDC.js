import md5 from 'md5';
import axios from 'axios';
export default {
	namespaced: true,

	state: {
		templates: [],
		loading: false
	},
	mutations: {
		makeLoadingIs(state, value) {
			state.loading = value;
		},
		updateTemplates(state, value){
			state.templates = value;
		}
	},
	actions: {
		fetchTemplates(ctx) {
			ctx.commit('makeLoadingIs', true);
			const user = ctx.rootGetters.getUser;

			const close_your_eyes = md5('getTemplates' + user.id + user.secret);
			const url = `https://my.support.by/app_cloud_mobile/getTemplates.php?id=${user.id}&secret=${close_your_eyes}`;
			// console.log(url)

			axios.get(url)
				.then(resp => {
					ctx.commit("updateTemplates", resp.data.response)
					ctx.commit('makeLoadingIs', false)
				})
		}
	},
	getters: {
		getTemplates(state){
			return state.templates.sort((a,b) => {
				let nameA = a.name.toLowerCase();
				let nameB = b.name.toLowerCase();
				if (nameA < nameB)
					return -1
				if (nameA > nameB)
					return 1
				return 0
			});
		}
	}
}