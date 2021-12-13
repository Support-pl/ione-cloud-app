import axios from './axios';
import store from './store/index.js'
import md5 from 'md5'

export default {
	sendVMaction(method, params){
		const vmid = {
			vmid: store.getters['cloud/getOpenedCloud'].ID
		};
		const query = Object.assign(params, vmid);

		return this.sendAsUser(method, query);
	},
	sendAsUser(method, params = {}, customSecet){
		const user = store.getters['getUser'];
		const secretKey = customSecet || method;
		const secret = md5(secretKey + user.id + user.secret);
		const auth = {
			userid: user.id,
			secret
		};

		const query = Object.assign(params, auth);
		return this.getWithParams(method, query);
	},
	getWithParams(method, params){
		let rawUrl = `/${method}.php`;
		let url = '';
		if(params != undefined){
			url = rawUrl + `?${URLparameter(params)}`;
		} else {
			url = rawUrl;
		}
		return this.getRaw(url);
	},
	getRaw(url){
		return new Promise((resolve, reject) => {
			axios.get(url)
			.then( res => resolve(res.data))
			.catch( err => {
				reject(err);
				console.error(err)
			})
		})
	},

	auth(email, password){
		return new Promise((resolve, reject) => {
			axios.get(`/login.php?email=${email}&password=${password}`)
			.then(resolve)
			.catch(reject)
		})
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
			str += this.URLparameter(obj[key], outer+key);
		} else {
			str += outer + key + "=" + encodeURIComponent(obj[key]);
		}
	}
	return str;
}