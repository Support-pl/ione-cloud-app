import api from '../api.js'
export default {
	namespaced: true,

	state: {
		products: [],
		productsLoading: false,
	},
	mutations: {
		setProducts(state, data){
			state.products = data;
		},
		setProductsLoading(state, data){
			state.productsLoading = data;
		}
	},
	actions: {
		fetchProducts({commit, dispatch}){
			commit('setProductsLoading', true);
			return dispatch('silentFetchProducts');
		},
		silentFetchProducts({commit}){
			return new Promise((resolve, reject) => {
				api.sendAsUser('get.user.products')
				.then(res => {
					commit('setProducts', res.products);
					commit('setProductsLoading', false);
					resolve(res.products);
				})
				.catch(error => reject(error))
			})
		},
		autoFetchProducts({dispatch, state}){
			if(state.products.length > 0){
				return dispatch('silentFetchProducts');
			} else {
				return dispatch('fetchProducts');
			}
		}
	},
	getters: {
		getProducts(state){
			return state.products;
		},
		getProductsLoading(state){
			return state.productsLoading;
		}
	}
}