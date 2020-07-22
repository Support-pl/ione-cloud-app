import Vue from 'vue'
import vuex from 'vuex'
import user from './user'
import support from './support'

Vue.use(vuex)

export default new vuex.Store({
	modules: {
		user,
		support
	}
})