export default {
	state: {
		user: null,
		logged: false
	},
	mutations: {
		setUser(state, value){
			state.user = value
			state.logged = true
			setCookie('CloudUser', JSON.stringify(value), {
				'max-age': '2592000'
			})
		},
		logout(state){
			state.user = null
			state.logged = false
			deleteCookie('CloudUser')
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