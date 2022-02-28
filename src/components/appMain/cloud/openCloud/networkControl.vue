<template>
	<div class="network-control">
		<a-table :columns="columns" :data-source="newtworks" :pagination="false" rowKey='NIC_ID'>
			<div slot="buttons" slot-scope="value, row">
				<span v-if="value.NIC_ID != 0" class="modal_table_action_btn modal_table_action_btn__hoverable" title="Detach" @click="detachInit(row)">
					<a-icon type="close" />
				</span>
			</div>
			
			<span slot="ip" slot-scope="value">
				{{value || '--'}}
			</span>

			<div slot="expandedRowRender" slot-scope="record" style="margin: 0">
				<template v-if="record.ALIAS_IDS != undefined && record.ALIAS_IDS.length > 0 ">
					<ul>
						<li v-for="(alias, key) in SingleCloud.NIC_ALIAS" :key="key">
							Alias #{{alias.ALIAS_ID}} [NIC{{alias.NIC_ID}}]: {{alias.IP}}
							<a-icon type="close" @click="detachCaller(alias.NIC_ID)"/>
						</li>
					</ul>
				</template>
				<div v-else>There are no aliases</div>
			</div>
		</a-table>

		<a-modal
			:title="$t('NIC detach')"
			:visible="modal.detach"
			:confirm-loading='detach.loading'
			@ok="sendDetach"
			@cancel="closeModal('detach')"
		>
			<p>{{$t('This will detach the NIC immediately')}}</p>
			<p>{{$t('Do you want to proceed?')}}</p>
		</a-modal>

		<a-modal
			:title="$t('NIC attach')"
			:visible="modal.attach"
			:confirm-loading='attach.loading'
			:okText="$t('Assign to VM')"
			@ok="sendNewIP"
			@cancel="closeModal('attach')"
		>
			<a-radio-group v-model="attach.type" style="margin-bottom: 20px">
				<a-radio :value='1'>{{$t('Private')}}</a-radio>
				<a-radio :value='2'>{{$t('Public')}}</a-radio>
			</a-radio-group>
			<div v-if="attach.type == 1">

				<p style="margin-bottom: 2px">{{$t('Available intervals:')}}</p>
				<span v-for="ips in privateIPS" :key="ips.min">{{ips.min}} - {{ips.max}}<br></span>

				<p style="margin-top: 15px">{{$t('Enter new private IP:')}}</p>
				<a-input v-model="attach.newIP" @change="ipInput">
					<a-select v-model="attach.mask" slot="addonAfter" style="width: 80px">
						<a-select-option v-for="mask in possibleMasks" :key="mask" :value="mask">
							/{{mask}}
						</a-select-option>
					</a-select>
				</a-input>
				<!-- <a-row type="flex" style="margin-top: 15px">
					<a-col>
						<a-checkbox :checked="attach.showParrent" @change="toggleAlias">{{$t('Attach as alias')}}</a-checkbox>
					</a-col>
					<a-col offset="3" v-if="attach.showParrent">
						<a-select :loading='getNICloading' :value="attach.parent" @change="(val) => attach.parent = val" style="width: 100px">
							<a-select-option v-for="NIC in SingleCloud.NIC.filter( nic => nic.NETWORK == getNICs.PRIVATE.NAME)" :key="NIC.NIC_ID" :value="'NIC' + NIC.NIC_ID">NIC{{NIC.NIC_ID}}</a-select-option>
						</a-select>
					</a-col>
				</a-row> -->
			</div>
			<div v-if="attach.type == 2" >
				<p>
					Reserve IPv4 for use on any VM. Assign to this VM by selecting the radio button next to any unused IP and selecting "Assign to VM" <b>${{getSettings.PUBLIC_IP_COST}}</b> per IPv4 per month
				</p>
				<public-network @onselect="selectedRows"/>
				<!-- <a-row type="flex" style="margin-top: 15px">
					<a-col>
						<a-checkbox :checked="attach.showParrent" @change="toggleAlias">{{$t('Attach as alias')}}</a-checkbox>
					</a-col>
					<a-col offset="3" v-if="attach.showParrent">
						<a-select :loading='getNICloading' :value="attach.parent" @change="(val) => attach.parent = val" style="width: 100px">
							<a-select-option v-for="NIC in SingleCloud.NIC.filter( nic => nic.NETWORK == getNICs.PUBLIC.NAME)" :key="NIC.NIC_ID" :value="'NIC' + NIC.NIC_ID">NIC{{NIC.NIC_ID}}</a-select-option>
						</a-select>
					</a-col>
				</a-row> -->
			</div>
		</a-modal>
		
		<a-row style="margin-top: 15px">
			<a-col>
				<a-button @click="showModal('attach')" @final="() => this.closeModal('detach')">{{$t('Attach new NIC')}}</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import md5 from 'md5'
import { mapGetters } from 'vuex'
import publicNetwork from '../../../publicNetwork'

const columns = [
	{
    title: '№',
		dataIndex: 'NIC_ID',
		key: "NIC_ID",
		width: 50,
		align: 'center'
	},
	{
		title: 'Network',
		dataIndex: 'NETWORK',
		key: "NETWORK",
		// scopedSlots: { customRender: 'ImageName' },
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

const privateIPS = [
	{
		min: '10.0.0.1',
		max: '10.255.255.254',
		mask: 8
	},
	{
		min: '172.16.0.1',
		max: '172.31.255.254',
		mask: 12
	},
	{
		min: '192.168.0.1',
		max: '192.168.255.254',
		mask: 16
	},

]

let masks = [];
for(let i = 8; i <= 32; i++){
	masks.push(i);
}

export default {
	name: 'networkControl',
	components: {
		publicNetwork
	},
	data(){
		return {
			columns,
			NICsColumns,
			NICs: [],
			privateIPS,
			masks,
			modal: {
				detach: false,
				attach: false
			},
			detach: {
				NIC: -1,
				loading: false
			},
			attach: {
				loading: false,
				type: 2,
				newIP: '',
				mask: 24,
				publicAR_ID: -1,
				publicAR_IP: '',
				parent: null,
				showParrent: false
			}
		}
	},
	computed: {
		...mapGetters('cloud', {
			SingleCloud: 'getOpenedCloud',
		}),
		...mapGetters('network', ['getNICs', 'getNICloading']),
		...mapGetters('settings', ['getSettings']),
		...mapGetters({user: 'getUser'}),
		newtworks(){
			if(Array.isArray(this.SingleCloud.NIC)){
				return this.SingleCloud.NIC
			}
			return [this.SingleCloud.NIC]
		},
		possibleMasks(){
			const interval = this.privateIPS.find( el => {
				const min = this.ipToSingleNumber(el.min);
				const max = this.ipToSingleNumber(el.max);
				const ip = this.ipToSingleNumber(this.attach.newIP);
				return min <= ip && ip <= max;
				});
			if(interval != undefined){
				const mask = interval.mask;
				const posibleMasks = this.masks.filter( el => el >= mask);
				// this.attach.mask = posibleMasks[0];
				return posibleMasks;
			} else {
				// this.attach.mask = 24;
				return this.masks
			}
		}
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
		showModal(modalname){
			this.modal[modalname] = true;
		},
		closeModal(modalname){
			this.modal[modalname] = false;
		},
		detachInit(NIC){
			// console.log(NIC)
			// console.log('works', NIC.NIC_ID)
			// console.log('works', this.modal.detach)
			this.detachCaller(NIC.NIC_ID);
		},
		detachCaller(NIC_ID){
			
			this.detach.NIC = NIC_ID;
			this.showModal('detach');

		},
		sendDetach(NIC){
			// console.log(NIC)
			if(this.detach.imageID == 0){
				this.$message.warning('You can\' remove main NIC');
				return;
			}

			const user = this.user;
			const vmid = this.SingleCloud.ID;

			const close_your_eyes = md5('VMNICdetach' + user.id + user.secret);
			const auth = {
				userid: user.id,
				vmid,
				secret: close_your_eyes,
			};
			const actionParams = {
				nicID: this.detach.NIC,
			}
			const query = Object.assign(auth, actionParams);
			const url = `/VMNICdetach.php?${this.URLparameter(query)}`;

			this.detach.loading = true;
			this.$axios.get(url)
			.then( res => {
				// console.log(res);
				if(res.data.result == 'success')
					this.$message.success(`NIC detached`);
				else{
					this.$message.error(`NIC detach failed`);
					console.error(res.data);
				}
			})
			.catch( err => {
				console.error(err)
			})
			.finally( () => {
				setTimeout(() => {
					this.$store.dispatch('cloud/silentUpdate', this.$route.params.pathMatch);
					this.$store.dispatch('network/silentFetchNICs');
				}, 500);
				this.closeModal('detach');
				this.detach.loading = false;
			})
		},
		isValidIP(iptotest){
			const ipreg = new RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$');
			return ipreg.test(iptotest);
		},
		ipToSingleNumber(ip){
			const arrayOfOctets = ip.split('.');
			const binArray = arrayOfOctets.map( part => this.dec2Bin(part).padStart(8, 0) );
			return this.bin2Dec(binArray.join(''));
		},
		SingleNumberToIp(num){
			const fullBinary = this.dec2Bin(num).padStart(24, '0');
			const arrayOfBinOctets = fullBinary.match(/.{8}/g);
			const arrayOfOctets = arrayOfBinOctets.map( bin => this.bin2Dec(bin) );
			return arrayOfOctets.join('.');
		},
		sendNewIP(){
			const user = this.user;
			const vmid = this.SingleCloud.ID;

			const close_your_eyes = md5('VMNICattach' + user.id + user.secret);
			const auth = {
				userid: user.id,
				vmid,
				secret: close_your_eyes,
			};
			let query = {};
			if(this.attach.type == 1){
				if(!privateIPS.some( el => {
					const min = this.ipToSingleNumber(el.min);
					const max = this.ipToSingleNumber(el.max);
					const ip = this.ipToSingleNumber(this.attach.newIP);
					return min <= ip && ip <= max;
				}) && this.attach.newIP != ''){
					this.$message.error('You can\'t use that IP for private network');
					return;
				}

				if(this.attach.newIP.match(/\.255$|\.0$/)){
					this.$message.error('You can\'t use that IP for network');
					return;

				}
				
				let actionParams = {
					type: this.attach.type,
					// nicID: this.NICs.PRIVATE.NETWORK_ID
				}
				// console.log(actionParams);
				if(this.attach.newIP != ''){
					actionParams.newIP = this.attach.newIP;
					actionParams.mask = this.attach.mask;
				}

				query = Object.assign(auth, actionParams);
			}

			if(this.attach.type == 2){
				if(this.attach.publicAR_IP == ''){
					this.$message.warning(this.$t('select at least one NIC'));
					return;
				}
				let actionParams = {
					type: this.attach.type,
					// AR_ID: this.attach.publicAR_ID,
					AR_IP: this.attach.publicAR_IP,
				}
				query = Object.assign(auth, actionParams);
			}
			// console.log(this.attach.parent);
			if (this.attach.parent != null && this.attach.showParrent) {
				query.parent = this.attach.parent;
			}
			this.attach.loading = true;
			const url = `/VMNICattach.php?${this.URLparameter(query)}`;
			this.$axios.get(url)
			.then( res => {
				// console.log(res);
				if(res.result == 'error'){
					throw res.data;
				}else{
					this.$message.success(`NIC attached`);
				}
			})
			.catch( err => {
				this.$message.error(`NIC attach failed`);
				console.error(err)
			})
			.finally( () => {
				this.$store.dispatch('cloud/silentUpdate', this.$route.params.pathMatch);
				this.$store.dispatch('network/silentFetchNICs');
				this.closeModal('attach');
				this.attach.loading = false;
				this.attach.newIP = '';
			})
		},
		dec2Bin(dec) {
			return (dec >>> 0).toString(2);
		},
		bin2Dec(bin){
			return parseInt(bin, 2);
		},
		ipInput(e){
			this.attach.newIP = this.attach.newIP.replace(/,/gi, '.');
			this.attach.newIP = this.attach.newIP.replace(/[a-z]/gi, '');
			this.attach.newIP = this.attach.newIP.replace(/(\d{3})(\d)/gi, '$1.$2');
			this.attach.newIP = this.attach.newIP.replace(/((\d{1,3}\.){3}\d{1,3})\d?\.?/gi, '$1');
			this.attach.newIP = this.attach.newIP.replace(/(\d{1,3})\d*/gi, '$1');
			this.attach.newIP = this.attach.newIP.replace(/[3-9]\d\d|[2-9][6-9]\d|[2-9][5-9][6-9]/gi, '255');
			// this.attach.newIP = this.attach.newIP.replace(/\/[4-9][1-9]|\/[3-9][3-9]/gi, '/32');
		},
		selectedRows(rows){
			// console.log(rows);
			this.attach.publicAR_IP = rows.selectedRows[0].IP;
			// console.log(this.attach.publicAR_ID);
		},
		toggleAlias(){
			if(!this.attach.showParrent) {
				this.attach.showParrent = true
				this.$store.dispatch('network/fetchNICsAuto');
			} else {
				this.attach.showParrent = false
			}
		}
	},
	mounted(){
	},
	watch: {
		'attach.type': function (newal) {
			this.attach.parent = null
		}	
	}
}
</script>

<style>

</style>