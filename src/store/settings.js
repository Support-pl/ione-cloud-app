import api from '../api';
export default {
	namespaced: true,

	state: {
		settings: {}
	},
	mutations: {
		setSettings(state, data){
			state.settings = data;
		},
		updateSettings(state, data){
			state.settings = Object.assign(state.settings, data);
		}
	},
	actions: {
		fetchSettings(ctx){
			const filters = ['cost', 'disktypes', 'sizes'];
			const params = {
				filter: filters.join(',')
			}
			return new Promise( (resolve, reject) => {
				api.getWithParams("getSettings", params)
				.then( resp => {
					ctx.commit('setSettings', resp);
					resolve(resp);
				})
				.catch( err => {
					console.error(err);
					reject(err);
				})
			} )
		}
	},
	getters: {
		getSettings(state){
			return state.settings;
		}
	}
}