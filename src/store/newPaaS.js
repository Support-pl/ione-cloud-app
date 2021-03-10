import md5 from 'md5';
import axios from '../axios';
export default {
	namespaced: true,

	state: {
		products: [],
		productsLoading: false,

		addons: [],
		addonsLoading: false,
	},
	mutations: {
		setProducts(state, value){
			state.products = value;
		},
		setProductsLoading(state, value){
			state.productsLoading = value;
		},
		setAddons(state, value){
			state.addons = value;
		},
		setAddonsLoading(state, value){
			state.addonsLoading = value;
		},
	},
	actions: {
		fetchProductsSilent({commit}){
			const url = `getProducts.php`;
			
			axios.get(url)
				.then(resp => {
					commit("setProducts", resp.data.response)
				})
		},
		fetchProducts({commit, dispatch}){
			commit('setProductsLoading', true);
			dispatch('fetchProductsSilent');
			commit('setProductsLoading', false);
		},
		fetchProductsAuto({state, dispatch}){
			if(state.products.length > 0){
				dispatch('fetchProductsSilent')
			} else {
				dispatch('fetchProducts')
			}
		},
		
		fetchAddonsSilent({commit}){
			const url = `getAddons.php`;
			
			axios.get(url)
				.then(resp => {
					commit("setAddons", resp.data.response)
				})
		},
		fetchAddons({commit, dispatch}){
			commit('setAddonsLoading', true);
			dispatch('fetchAddonsSilent');
			commit('setAddonsLoading', false);
		},
		fetchAddonsAuto({state, dispatch}){
			if(store.addons.length > 0){
				dispatch('fetchAddonsSilent')
			} else {
				dispatch('fetchAddons')
			}
		},
	},
	getters: {
		getProducts(state){
			return state.products;
		},
		getAddons(state){
			return state.addons;
		},

		isProductsLoading(state){
			return state.productsLoading;
		},
		isAddonsLoading(state){
			return state.addonsLoading;
		},
	}
}