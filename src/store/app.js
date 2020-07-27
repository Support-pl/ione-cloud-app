import router from '../router/index.js'; 
/*
ROUTER WORKS THERE!
*/
export default {
	namespaced: true,

	state: {
		activeTabName: '',
		activeTabNum: -1,
		buttons: [
			{
				icon: 'database',
				title: 'cloud',
				theme: 'filled'
			}, {
				icon: 'message',
				title: 'support',
				theme: 'outlined'
			}, {
				icon: 'credit-card',
				title: 'invoice',
				theme: 'outlined'
			}, {
				icon: 'setting',
				title: 'settings',
				theme: 'filled'
			},
		]
	},
	mutations: {
		setActiveTabName(state, value){
			state.activeTabName = value;
		},
		setActiveTabNum(state, value) {
			state.activeTabNum = value;
		}
	},
	actions: {
		setTabByName(ctx, value){
			if (value == 'cloudHome') value = 'cloud'
			ctx.commit('setActiveTabName', value)
			ctx.commit('setActiveTabNum', ctx.getters.getButtons.findIndex(el => el.title == value))
			if (router.currentRoute.name != ctx.getters.getActiveTab.title)
				router.push(ctx.getters.getActiveTab.title)
		},
		setTabByNum(ctx, value) {
			ctx.commit('setActiveTabNum', value)
			ctx.commit('setActiveTabName', ctx.getters.getButtons[value].title)
			if (router.currentRoute.name != ctx.getters.getActiveTab.title)
				router.push(ctx.getters.getActiveTab.title)
		}
	},
	getters: {
		getButtons(state){
			return state.buttons;
		},
		getActiveTab(state){
			return {
				title: state.activeTabName,
				index: state.activeTabNum
			}
		}
	}
}