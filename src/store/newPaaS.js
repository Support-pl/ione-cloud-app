import md5 from 'md5';
import axios from '../axios';
export default {
	namespaced: true,

	state: {
		products: [],
		productsLoading: true,

		addons: [],
		addonsLoading: true,
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
			
			return axios.get(url)
				.then(resp => {
					commit("setProducts", resp.data)
				})
		},
		fetchProducts({commit, dispatch}){
			commit('setProductsLoading', true);
			dispatch('fetchProductsSilent')
			.then( res => {
				commit('setProductsLoading', false);
			})
		},
		fetchProductsAuto({state, dispatch}){
			if(Object.keys(state.products).length > 0){
				dispatch('fetchProductsSilent')
			} else {
				dispatch('fetchProducts')
			}
		},
		
		fetchAddonsSilent({commit}){
			const url = `getAddons.php`;
			
			return axios.get(url)
				.then(resp => {
					let data = resp.data;
					data.ssd = data.ssd.sort( (a,b) => parseInt(a.description.VALUE) - parseInt(b.description.VALUE) );
					data.hdd = data.hdd.sort( (a,b) => parseInt(a.description.VALUE) - parseInt(b.description.VALUE) );
					data.backup = data.backup.sort( (a,b) => parseInt(a.description.VALUE) - parseInt(b.description.VALUE) );
					data.os = data.os.sort( (a,b) => parseInt(a.description.VALUE) - parseInt(b.description.VALUE) );
					data.panel = data.panel.sort( (a,b) => parseInt(a.description.VALUE) - parseInt(b.description.VALUE) );
					commit("setAddons", data);
				})
		},
		fetchAddons({commit, dispatch}){
			commit('setAddonsLoading', true);
			dispatch('fetchAddonsSilent')
			.then( res => {
				commit('setAddonsLoading', false);
			})
		},
		fetchAddonsAuto({state, dispatch}){
			if(state.addons.length > 0){
				dispatch('fetchAddonsSilent')
			} else {
				dispatch('fetchAddons')
			}
		},

		sendOrder(ctx, orderData){
			return new Promise( (resolve, reject) => {
				const user = ctx.rootGetters.getUser;
				const close_your_eyes = md5('createOrder' + user.id + user.secret);
				const auth = {
					userid: user.id,
					secret: close_your_eyes,
				};
				const query = {...auth, ...orderData};
				if(orderData.addons.length > 0){
					query.addons = orderData.addons;
				}
				const url = `/createOrder.php?${URLparameter(query)}`;
				axios.get(url)
				.then( response => {
					resolve(response);
				})
				.catch( err => {
					reject(err);
				})
			} )
		}
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

function URLparameter(obj, outer = ''){
	var str = "";
	for (var key in obj) {
		if(key == "price") continue;
		if (str != "") {
				str += "&";
		}
		if(typeof obj[key] == 'object') {
			str += URLparameter(obj[key], outer+key);
		} else {
			str += outer + key + "=" + encodeURIComponent(obj[key]);
		}
	}
	return str;
}