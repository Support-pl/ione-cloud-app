import Vue from 'vue'
import VueRouter from 'vue-router'
import appMain from '../components/appMain/appMain.vue'
import Login from '../components/login/login.vue'
import config from '../appconfig'

Vue.use(VueRouter)


const servicesArray = config.services;
const services = [
]
for(let service in servicesArray){
	const temp = {
		path: service,
		name: `service-${service}`,
		meta: {
			footerTitle: 'services',
			isNeedBackButton: true,
			headerTitle: service,
			componentName: service,
			productsGroupName: servicesArray[service].groupname
		},
		component: () => import(`../components/services/${service.toLowerCase()}/index.vue`),
	}
	if(config.services[service].additionalRoutes){
		for(let additionalRoute of config.services[service].additionalRoutes){
			const route = {
				path: additionalRoute.path,
				name: additionalRoute.name,
				meta: additionalRoute.meta,
				component: () => import(`../components/services/${service.toLowerCase()}/${additionalRoute.componentName}.vue`)
			}
			services.push(route);
		}
	}
	services.push(temp);
}

const routes = [
	{
		path: '/login',
		name: 'login',
		meta: {
			mustBeLoggined: false,
			mustBeUnloggined: true,
		},
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
					layoutTitle: 'services',
					mustBeLoggined: true,
				},
				component: () => import('../routes/services.vue')
			},
			{
				path: 'cloud',
				name: 'cloud',
				meta: {
					mustBeLoggined: true,
				},
				component: () => import('../routes/cloud.vue')
			},
			{
				path: 'services',
				name: 'services',
				meta: {
					mustBeLoggined: true,
				},
				component: () => import('../routes/services.vue'),
			},
			...services,
			{
				path: 'products',
				name: 'products',
				meta: {
					mustBeLoggined: true,
					layoutTitle: 'services',
					isNeedBackButton: true,
				},
				component: () => import('../routes/products.vue')
			},
			{
				path: 'support',
				name: 'support',
				meta: {
					mustBeLoggined: true,
				},
				component: () => import('../routes/support.vue')
			},
			{
				path: 'invoice',
				name: 'invoice',
				meta: {
					mustBeLoggined: true,
				},
				component: () => import('../routes/invoice.vue')
			},
			{
				path: 'settings',
				name: 'settings',
				meta: {
					mustBeLoggined: true,
				},
				component: () => import('../routes/settings.vue')
			},
			{
				path: 'cloud/newPaaS',
				name: 'newPaaS',
				meta: {
					mustBeLoggined: true,
					footerTitle: 'cloud'
				},
				component: () => import('../components/appMain/newPaaS.vue')
			},
			{
				path: 'cloud/newVDC',
				name: 'newVDC',
				meta: {
					mustBeLoggined: true,
					footerTitle: 'cloud'
				},
				component: () => import('../components/appMain/newVDC.vue')
			}
		]
	},
	{
		path: '/cloud-*',
		component: () => import('../components/appMain/cloud/cloudRouter.vue'),
		meta: {
			mustBeLoggined: true,
		},
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
		meta: {
			mustBeLoggined: true,
		},
		component: () => import('../components/appMain/support/ticketchat.vue')
	},
	{
		path: '/invoice-*',
		name: 'invoiceFS',
		meta: {
			mustBeLoggined: true,
		},
		component: () => import('../components/appMain/invoice/openInvoice.vue')
	}
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})


export default router
