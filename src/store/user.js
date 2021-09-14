export default {
	state: {
		user: null,
		logged: false,
		userData: null
	},
	mutations: {
		setUser(state, value){
			state.user = value
			state.logged = true
			setCookie('CloudUser', JSON.stringify(value), {
				'max-age': '2592000'
			})
		},
		setBalance(state, {value, getters}){
			state.user.balance = value
			setCookie('CloudUser', JSON.stringify(getters.getUser), {
				'max-age': '2592000'
			}) // странная штука, вероятно потом надо будет переделать, но пока побудет так 08.10.2020
		},
		setCurrency(state, {value, getters}){
			state.user.currency_code = value
			setCookie('CloudUser', JSON.stringify(getters.getUser), {
				'max-age': '2592000'
			}) // странная штука, вероятно потом надо будет переделать, но пока побудет так 08.10.2020
		},
		logout(state){
			state.user = null
			state.logged = false
			deleteCookie('CloudUser')
		},
		setUserData(state, data){
			state.userData = data
		}
	},
	actions: {
		onLoadUser(ctx, value){
			ctx.commit("setUser", value)
		},
		setCookie(ctx, object) {
			setCookie(object.name, object.value, object.options)
		},
		deleteCookie(ctx, name) {
			deleteCookie(name)
		},
		updateBalance(ctx, value){
			const getters = ctx.getters;
			ctx.commit("setBalance", {value, getters})
		},
		updateCurrency(ctx, value){
			const getters = ctx.getters;
			ctx.commit("setCurrency", {value, getters})
		}
	},
	getters: {
		getUserBalance(state){
			return state.user.balance
		},
		getUser(state){
			return state.user
		},
		isLogged(state){
			return state.logged
		},
		getCookie: state => name => {
			return getCookie(name);
		},
		getUserData(state){
			return state.userData;
		}
	}
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}
function deleteCookie(name) {
	setCookie(name, "", {
		'max-age': -1
	})
}