<template>
	<div class="publicNetwork">
		<a-table :row-selection="rowSelection" row-key="AR_ID" :pagination="NICpublic.length > 10 ? '' : false" :loading="NICloading" :columns="NICsColumns" :data-source="NICpublic">
			<div slot="buttons" slot-scope="value, row">
				<span v-if="value.NIC_ID != 0" class="modal_table_action_btn" title="Relase" @click="ReleaseNIC(row)">
					<a-icon type="close" />
				</span>
			</div>
			<div slot="ip" slot-scope="value, row">
				{{value}}
				<template v-if="!Array.isArray(row.LEASES)">
				<span class="link--clickable" v-if="row.LEASES.LEASE['VM'] != $route.params.pathMatch" @click="GoToVM(row.LEASES.LEASE['VM'])">
					<!-- {{`(used at that vm)`}} -->
					{{`(used at VM: ${getVMName(row.LEASES.LEASE['VM'])})`}}
				</span>
				<span v-else>
					<!-- {{`(used at VM#${row.LEASES.LEASE['VM']})`}} -->
					{{`(used at that vm)`}}
				</span>
				</template>
			</div>
		</a-table>
		<a-button style="margin-top: 15px" v-if="!NICloading" @click="ReserveNIC">Reserve public NIC</a-button>
	</div>
</template>

<script>
import md5 from 'md5'
import { mapGetters } from 'vuex'

const NICsColumns = [
	{
    title: 'ID',
		dataIndex: 'AR_ID',
		key: "AR_ID",
		width: 50,
		align: 'center'
	},
	{
		title: 'IP',
    dataIndex: 'IP',
		key: 'IP',
		scopedSlots: { customRender: 'ip' },
  },
	{
		title: 'Actions',
		key: 'actions',
		scopedSlots: { customRender: 'buttons' },
		width: 100,
	},
];

export default {
	name: 'publicNetworks',
	data(){
		return {
			NICsColumns,
		}
	},
	created(){
		this.sync();
	},
	methods: {
		URLparameter(obj, outer = ''){
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
		},
		sync(){
			this.$store.dispatch('network/fetchNICs');
		},
		ReleaseNIC(AR){
			const user = this.user;
			const vmid = this.SingleCloud.ID;

			const close_your_eyes = md5('NICRelease' + user.id + user.secret);
			const auth = {
				userid: user.id,
				vmid,
				secret: close_your_eyes,
			};
			// console.log(AR);
			const actionParams = {
				AR_ID: AR.AR_ID
			}
			const params = Object.assign(auth, actionParams);
			const url = `/NICRelease.php?${this.URLparameter(params)}`;
			// this.NICloading = true;
			this.$store.commit('network/updateValue', 'loading', true)
			this.$axios.get(url)
			.then( resp => {
				// console.log()
			})
			.catch( err => {
				console.error(err)
			})
			.finally( () => {
				this.sync();
			})
		},
		ReserveNIC(){
			const user = this.user;
			const vmid = this.SingleCloud.ID;

			const close_your_eyes = md5('NICReserve' + user.id + user.secret);
			const auth = {
				userid: user.id,
				vmid,
				secret: close_your_eyes,
			};
			const actionParams = {
			}
			const params = Object.assign(auth, actionParams);
			const url = `/NICReserve.php?${this.URLparameter(params)}`;
			// this.NICloading = true;
			this.$store.commit('network/updateValue', 'loading', true)
			this.$axios.get(url)
			.then( resp => {
				// console.log()
			})
			.catch( err => {
				console.error(err)
			})
			.finally( () => {
				this.sync();
			})
		},
		GoToVM(vmid){
			this.$router.push("/cloud-"+vmid);
		},
		getVMName(id){
			return this.getClouds.find(el => el.ID == id)?.NAME ?? id;
		}
	},
	computed: {
		...mapGetters('cloud', {
			SingleCloud: 'getOpenedCloud',
			getClouds: 'getClouds',
		}),
		...mapGetters('network', {
			NICpublic: 'getNICpublic',
			NICloading: 'getNICloading'
		}),
		...mapGetters({user: 'getUser'}),
		rowSelection(){
			return {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
					this.$emit('onselect', {selectedRowKeys, selectedRows});
        },
        getCheckboxProps: record => ({
          props: {
            disabled: !Array.isArray(record.LEASES), // Column configuration not to be checked
            // name: record.name,
          },
        }),

			}
		}
	}
}
</script>

<style>
.link--clickable{
	color: #1890ff;
	cursor: pointer;
}
</style>