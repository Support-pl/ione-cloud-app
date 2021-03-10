import Vue from 'vue'
import vuex from 'vuex'
import app from './app'
import user from './user'
import cloud from './cloud'
import support from './support'
import invoices from './invoices'
import newVDC from './newVDC'
import newPaaS from './newPaaS'
import network from './network'

Vue.use(vuex)

export default new vuex.Store({
	modules: {
		app,
		user,
		cloud,
		support,
		invoices,
		newVDC,
		newPaaS,
		network
	}
})