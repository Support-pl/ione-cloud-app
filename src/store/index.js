import Vue from 'vue'
import vuex from 'vuex'
import userModule from './user'

Vue.use(vuex)

export default new vuex.Store({
	modules: {
		userModule
	}
})