import api from "@/api.js"
import vue from "vue"

export default {
	namespaced: true,
	state: {
		services: [],
		instances: [],
		loading: false
	},
	mutations: {
		setServices(state, services){
			state.services = services;
		},
		setInstances(state, services){
			const instances = [];
			services.forEach(service => {
				Object.keys(service.instancesGroups).forEach(groupName => {
					service.instancesGroups[groupName].instances.forEach(instance => {
						instance.status = service.status
						instance.meta = {
							serviceUUID: service.uuid,
							groupName 
						}
						vue.set(instances, instances.length, instance);
					})
				})
			})
			state.instances = instances
		},
		setLoading(state, data){
			state.loading = data;
		}
	},
	actions: {
		fetch({commit}){
			commit("setLoading", true);
			return new Promise((resolve, reject) => {
				api.services.list()
				.then(response => {
					commit('setServices', response.pool)
					commit('setInstances', response.pool)
					resolve(response)
				})
				.catch(error => {
					reject(error);
				})
				.finally(()=>{
					commit("setLoading", false);
				})
			})
		}
	},
	getters: {
		all(state){
			console.log(state);
			return state.services;
		},
		isLoading: state => state.loading,
		instances: state => state.instances,
		// instances(state){
		// 	const instances = [];
		// 	if(state?.services == undefined || state.services.length > 0) return []
		// 	state.services.forEach(service => {
		// 		Object.keys(service.instancesGroups).forEach(groupName => {
		// 			service.instancesGroups[groupName].instances.forEach(instance => {
		// 				instance.status = service.status
		// 				instances.push(instance)
		// 				console.log(instances)
		// 			})
		// 		})
		// 	})
		// 	return instances;
		// }
	}
}