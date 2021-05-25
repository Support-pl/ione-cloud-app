import Vue from 'vue'
import VueRouter from 'vue-router'
import Cloud from '../components/appMain/cloud/cloud.vue'
import appMain from '../components/appMain/appMain.vue'
import Login from '../components/login/login.vue'

Vue.use(VueRouter)

  const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/',
		component: appMain,
		children: [
			{
				path: '/',
				name: 'root',
				meta: {
					layoutTile: 'services',
				},
				component: () => import('../routes/services.vue')
			},
			{
				path: 'cloud',
				name: 'cloud',
				component: Cloud
			},
			{
				path: 'services',
				name: 'services',
				component: () => import('../routes/services.vue')
			},
			{
				path: 'products',
				name: 'products',
				meta: {
					layoutTile: 'services',
				},
				component: () => import('../routes/products.vue')
			},
			{
				path: 'support',
				name: 'support',
				component: () => import('../components/appMain/support/support.vue')
			},
			{
				path: 'invoice',
				name: 'invoice',
				component: () => import('../components/appMain/invoice/invoice.vue')
			},
			{
				path: 'settings',
				name: 'settings',
				component: () => import('../components/appMain/settings/settings.vue')
			},
			{
				path: 'cloud/newPaaS',
				name: 'newPaaS',
				meta: {
					layoutTile: 'cloud',
				},
				component: () => import('../components/appMain/newPaaS.vue')
			},
			{
				path: 'cloud/newVDC',
				name: 'newVDC',
				meta: {
					layoutTile: 'cloud',
				},
				component: () => import('../components/appMain/newVDC.vue')
			}
		]
	},
	{
		path: '/cloud-*',
		component: () => import('../components/appMain/cloud/cloudRouter.vue'),
		children: [
			{
				path: 'vnc',
				name: 'VNC',
				component: () => import('../components/appMain/cloud/vnc.vue')
			},
			{
				path: '*',
				redirect: to => {
					return `/cloud-${to.params.pathMatch}`
				}
			},
			{
				path: '',
				name: 'openCloud',
				component: () => import('../components/appMain/cloud/openCloud.vue')
			},
		]
	},
	{
		path: '/ticket-*',
		name: 'ticket',
		component: () => import('../components/appMain/support/ticketchat.vue')
	},
	{
		path: '/invoice-*',
		name: 'invoiceFS',
		component: () => import('../components/appMain/invoice/openInvoice.vue')
	}
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})


export default router
