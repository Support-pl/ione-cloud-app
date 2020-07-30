import md5 from 'md5';
import axios from 'axios';



export default {
	namespaced: true,

	state: {
		loading: false,
		singleLoading: true,
		isSearch: false,
		clouds: [],
		updating: false,
		opennedCloud: {}
	},
	mutations: {
		updateClouds(state, value) {
			state.clouds = value;
		},
		makeLoadingIs(state, value) {
			state.loading = value;
		},
		inverseSearch(state) {
			state.isSearch = !state.isSearch;
		},
		makeUpdatingIs(state, value) {
			state.updating = value
		},
		updateOpenedCloud(state, value){
			state.opennedCloud = value;
		},
		makeSingleLoadingIs(state, value) {
			state.singleLoading = value
		},
	},
	actions: {
		fetchClouds(ctx) {
			if (ctx.getters.isLoading) return;
			if (ctx.getters.getClouds.length != 0) ctx.commit('makeUpdatingIs', true)
			ctx.commit('makeLoadingIs', true);
			const user = ctx.rootGetters.getUser;

			const close_your_eyes = md5('orders' + user.id + user.secret);

			// const url = `https://devwhmcs.support.by/app_cloud_mobile/orders.php?id=${user.id}`;
			const url = `https://devwhmcs.support.by/app_cloud_mobile/orders.php?id=${user.id}&secret=${close_your_eyes}`;
			console.log(url)

			axios.get(url)
				.then(resp => {
					console.log("vuex got clouds: ", resp);
					ctx.commit("updateClouds", resp.data.data)
					ctx.commit('makeUpdatingIs', false)
					ctx.commit('makeLoadingIs', false)
				})
		},
		fetchSingleCloud(ctx, vmid){
			// if (ctx.getters.isLoading) return;
			if (ctx.getters.getClouds.length != 0) ctx.commit('makeUpdatingIs', true)
			ctx.commit('makeSingleLoadingIs', true);
			const user = ctx.rootGetters.getUser;

			const close_your_eyes = md5('singleCloud' + user.id + user.secret);

			const url = `https://devwhmcs.support.by/app_cloud_mobile/getVmHash.php?id=${vmid}&clientid=${user.id}&secret=${close_your_eyes}`;
			console.log(url)

			axios.get(url)
				.then(resp => {
					console.log("RETURN OPENNED CLOUD: ", resp);
					ctx.commit("updateOpenedCloud", resp.data.data)
					ctx.commit('makeUpdatingIs', false)
					ctx.commit('makeSingleLoadingIs', false)
				})
				.catch(err => console.error(err))

		},
		silentUpdate(ctx, vmid) {
			ctx.commit('makeUpdatingIs', true)
			const user = ctx.rootGetters.getUser;
			const close_your_eyes = md5('singleCloud' + user.id + user.secret);
			const url = `https://devwhmcs.support.by/app_cloud_mobile/getVmHash.php?id=${vmid}&clientid=${user.id}&secret=${close_your_eyes}`;
			console.log(url)

			axios.get(url)
				.then(resp => {
					console.log("silent update: ", resp);
					ctx.commit("updateOpenedCloud", resp.data.data)
					if(resp.data.data.STATE == 3 && resp.data.data.LCM_STATE != 3) {
						setTimeout(() => {
							ctx.dispatch("silentUpdate", vmid)
						}, 5000); //укажите здесь как часто надо обновлять страницу
					} else ctx.commit('makeUpdatingIs', false)
				})
				.catch(err => console.error(err))
		}
		// fetchClouds(ctx) {
		// 	if (ctx.getters.isLoading) return;
		// 	ctx.commit('makeLoadingIs', true);
		// 	setTimeout(() => {
		// 		ctx.commit('updateClouds', clouds);
		// 		ctx.commit('makeLoadingIs', false);
		// 	}, 700);
	},
	getters: {
		getClouds(state) {
			return state.clouds;
		},
		isLoading(state) {
			return state.loading;
		},
		isSearch(state){
			return state.isSearch;
		},
		getCloudHostById: state => id => {
			return state.clouds.find(el => el.ID == id).HOST
		},
		isUpdating(state){
			return state.updating;
		},
		getOpenedCloud(state){
			return state.opennedCloud;
		},
		getCloudState(state){
			if(state.opennedCloud.STATE != 3){
				return states[state.opennedCloud.STATE];
			} else {
				return lcm_states[state.opennedCloud.LCM_STATE]
			}
		},
		getStateColor: state => vmstate => {
			let color = '';
			switch (vmstate.toLowerCase()) {
				case 'running':
					color = '#0fd058';
					break;
				case 'poweroff':
					color = '#919191';
					break;
				case 'suspend':
					color = '#f9f038';
					break;
				default:
					color = '#f9f038';
					break;
			}
			return color;
		},
		permissions(state){
			const cloud = state.opennedCloud;
			const updating = state.updating;
			const isLoaded = Object.keys(cloud).length !== 0

			const commonParams = [isLoaded, !updating, cloud.PERMISSIONS.OWNER_U];

			const params = {
				reboot: [...commonParams, cloud.STATE == 3, cloud.LCM_STATE == 3],
				shutdown: [...commonParams, cloud.STATE == 3, cloud.LCM_STATE == 3],
				start: [...commonParams, cloud.STATE !== 3],
				stop: [...commonParams, cloud.STATE == 3, cloud.LCM_STATE == 3],
			}

			return {
				reboot: !params.reboot.every( el => el ),
				shutdown: !params.shutdown.every( el => el ),
				start: !params.start.every( el => el ),
				stop: !params.stop.every( el => el ),
			}
		},
		singleLoading(state){
			// const ans = Object.keys(state.opennedCloud).length == 0
			// console.log(ans)
			return state.singleLoading;
		}
	}
}


const states = [
	"INIT", "PENDING", "HOLD", "ACTIVE", "STOPPED", "SUSPENDED", "DONE", "","POWEROFF", "UNDEPLOYED", "CLONING", "CLONONG_FAILURE"
]

const lcm_states = [
	"LCM_INIT","PROLOG","BOOT","RUNNING","MIGRATE","SAVE_STOP","SAVE_SUSPEND","SAVE_MIGRATE","PROLOG_MIGRATE","PROLOG_RESUME","EPILOG_STOP","EPILOG","SHUTDOWN","CLEANUP_RESUBMIT","UNKNOWN","HOTPLUG","SHUTDOWN_POWEROFF","BOOT_UNKNOWN","BOOT_POWEROFF","BOOT_SUSPENDED","BOOT_STOPPED","CLEANUP_DELETE","HOTPLUG_SNAPSHOT","HOTPLUG_NIC","HOTPLUG_SAVEAS","HOTPLUG_SAVEAS_POWEROFF","HOTPLUG_SAVEAS_SUSPENDED","SHUTDOWN_UNDEPLOY","EPILOG_UNDEPLOY","PROLOG_UNDEPLOY","BOOT_UNDEPLOY","HOTPLUG_PROLOG_POWEROFF","HOTPLUG_EPILOG_POWEROFF","BOOT_MIGRATE","BOOT_FAILURE","BOOT_MIGRATE_FAILURE","PROLOG_MIGRATE_FAILURE","PROLOG_FAILURE","EPILOG_FAILURE","EPILOG_STOP_FAILURE","EPILOG_UNDEPLOY_FAILURE","PROLOG_MIGRATE_POWEROFF","PROLOG_MIGRATE_POWEROFF_FAILURE","PROLOG_MIGRATE_SUSPEND","PROLOG_MIGRATE_SUSPEND_FAILURE","BOOT_UNDEPLOY_FAILURE","BOOT_STOPPED_FAILURE","PROLOG_RESUME_FAILURE","PROLOG_UNDEPLOY_FAILURE","DISK_SNAPSHOT_POWEROFF","DISK_SNAPSHOT_REVERT_POWEROFF","DISK_SNAPSHOT_DELETE_POWEROFF","DISK_SNAPSHOT_SUSPENDED","DISK_SNAPSHOT_REVERT_SUSPENDED","DISK_SNAPSHOT_DELETE_SUSPENDED","DISK_SNAPSHOT","DISK_SNAPSHOT_DELETE","PROLOG_MIGRATE_UNKNOWN","PROLOG_MIGRATE_UNKNOWN_FAILURE","DISK_RESIZE","DISK_RESIZE_POWEROFF","DISK_RESIZE_UNDEPLOYED"
];