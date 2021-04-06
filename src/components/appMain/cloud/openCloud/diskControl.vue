<template>
	<div class="disk">
		<a-table :columns="columns" :data-source="disks" :pagination="false">
			<span slot="ImageName" slot-scope="value, row">{{getImageName(row)}}</span>
			<span slot="size" slot-scope="value">{{Math.round(value/1024)}}GB</span>

			<div slot="buttons" slot-scope="value, row">
				<span v-if="value.DISK_ID != 0" class="modal_table_action_btn" title="Detach" @click="detachInit(row)">
					<a-icon type="close" />
				</span>
				<span class="modal_table_action_btn" title="Resize" @click="resizeInit(row)">
					<a-icon type="arrows-alt" />
				</span>

				<a-modal
					title="Disk resize"
					:visible="modal.resize"
					:confirm-loading='resize.loading'
					@ok="sendResize"
					@cancel="closeModal('resize')"
				>
					<a-slider
						v-if="modal.resize"
						:min="disks[resize.currentdiskIndex].SIZE / 1024"
						:tooltip-visible="true"
						:tipFormatter="el => el+resize.scale"
						v-model="resize.newsize"
					/>
				</a-modal>
			</div>
		</a-table>
		<a-row style="margin-top: 15px">
			<a-col>
				<a-button @click="showModal('attach')">Attach new disk</a-button>
			</a-col>
		</a-row>
		<a-modal
			title="Disk detach"
			:visible="modal.detach"
			:confirm-loading='detach.loading'
			@ok="sendDetach"
			@cancel="closeModal('detach')"
		>
			<p>This will detach the disk immediately</p>
			<p>Do you want to proceed?</p>
		</a-modal>
		<a-modal
			title="Disk attach"
			:visible="modal.attach"
			:confirm-loading='attach.loading'
			@ok="sendAttach"
			@cancel="closeModal('attach')"
		>
			<a-radio-group v-model="attach.type">
				<a-radio :value='1'>Image</a-radio>
				<a-radio :value='2'>Volatile disk</a-radio>
			</a-radio-group>

			<template v-if="attach.type == 1">
				<a-radio-group v-model="attach.imageID" style="display:flex; flex-direction: column; margin-top: 20px">
					<a-row :gutter='[10, 10]'>
						<a-col v-for="image in images" :key="image.ID" :span='12'>
							<a-radio :value='image.ID'>{{image.NAME}} ({{imageTypes[image.TYPE]}})</a-radio>
						</a-col>
					</a-row>
				</a-radio-group>
			</template>

			<template v-if="attach.type == 2">
				<a-slider
					v-if="attach.type == 2 && modal.attach"
					:min="10"
					:max="200"
					:tooltip-visible="true"
					:tipFormatter="el => el+'GB'"
					v-model="attach.size"
					style="margin-top: 60px"
				/>
			</template>

		</a-modal>
	</div>
</template>

<script>
import md5 from 'md5'
import { mapGetters } from 'vuex'

const columns = [
	{
    title: '№',
		dataIndex: 'DISK_ID',
		// rowKey: 'DISK_ID',
		key: "DISK_ID",
		width: 50,
		align: 'center'
	},
	{
		title: 'Image / Size-Fromat',
		key: 'ImageName',
		scopedSlots: { customRender: 'ImageName' },
  },
	{
		title: 'Size',
    dataIndex: 'SIZE',
		key: 'SIZE',
		scopedSlots: { customRender: 'size' },
  },
	{
		title: 'Actions',
		key: 'actions',
		scopedSlots: { customRender: 'buttons' },
		width: 100,
	},
]

export default {
	name: 'diskControl',
	data(){
		return {
			columns,
			modal: {
				resize: false,
				detach: false,
				attach: false,
				detach: false
			},
			resize: {
				currentdisk: 0,
				currentdiskIndex: 0,
				newsize: 0,
				scale: 'GB',
				loading: false
			},
			attach: {
				types: {
					'1': 'Image',
					'2': 'Volatile disk'
				},
				type: 1,
				size: 10,
				imageID: -1,
				loading: false
			},
			detach: {
				loading: false,
				diskID: -1
			},
			images: [],
			imageTypes: [
				'OS',
				'CDROM',
				'DATABLOCK'
			]
		}
	},
	computed: {
		...mapGetters('cloud', {
			SingleCloud: 'getOpenedCloud',
		}),
		...mapGetters({user: 'getUser'}),
		disks(){
			if(Array.isArray(this.SingleCloud.DISKS)){
				return this.SingleCloud.DISKS
			}
			return [this.SingleCloud.DISKS]
		},
	},
	mounted() {
			const user = this.user;
			const vmid = this.SingleCloud.ID;

			const close_your_eyes = md5('getImages' + user.id + user.secret);

			let query = {
				userid: user.id,
				vmid,
				secret: close_your_eyes
			};

		this.$axios.get(`getImages.php?${this.URLparameter(query)}`)
		.then( res => {
			this.images = res.data.IMAGE_POOL.IMAGE;
		})
		.catch( err => {
			console.error(err);
		} )
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
		detachInit(disk){
			// console.log(disk)
			this.detach.diskID = disk.DISK_ID;
			this.showModal('detach');
		},
		resizeInit(disk){
			// console.log(disk)
			this.resize.currentdisk = disk.DISK_ID;
			this.resize.currentdiskIndex = this.disks.indexOf(disk);
			this.resize.newsize = disk.SIZE / 1024
			this.showModal('resize');
		},
		showModal(modalname){
			this.modal[modalname] = true;
		},
		closeModal(modalname){
			this.modal[modalname] = false;
		},
		sendResize(){
			let currentdisk = this.resize.currentdisk;
			let newDiskSizeInMB;
			if(this.resize.scale == 'GB'){
				newDiskSizeInMB = this.resize.newsize * 1024;
			} else {
				newDiskSizeInMB = this.resize.newsize;
			}
			// console.log(newDiskSizeInMB)
			if(newDiskSizeInMB <= this.disks[currentdisk].SIZE){
				this.$message.warning('You can\'t resize disk to the same size');
				return;
			}


			const user = this.user;
			const vmid = this.SingleCloud.ID;

			const close_your_eyes = md5('VMDiskResize' + user.id + user.secret);

			let query = {
				userid: user.id,
				vmid,
				secret: close_your_eyes,
				diskID: currentdisk,
				newsize: newDiskSizeInMB
			};

			let url = `/VMDiskResize.php?${this.URLparameter(query)}`
			
			this.resize.loading = true;
			this.$axios.get(url)
			.then( res => {
				if(res.data.result == 'success')
					this.$message.success(`VM disk #${currentdisk} resized successfully`);
				else{
					this.$message.error(`VM disk #${currentdisk} resize failed`);
					console.error(res.data);
				}
			})
			.catch( err => {
				console.error(err)
			})
			.finally( () => {
				this.$store.dispatch('cloud/silentUpdate', this.$route.params.pathMatch);
				this.closeModal('resize');
				this.resize.loading = false;
			})
		},
		getImageName(disk){
			if(disk.IMAGE != undefined){
				return disk.IMAGE
			} else {
				return `${Math.round(disk.SIZE/1024)}GB - ${disk.FORMAT}`;
			}
		},
		sendAttach(){
			if(this.attach.type == 1 && this.attach.imageID < 0){
				this.$message.warning('Choose OS');
				return;
			}

			const user = this.user;
			const vmid = this.SingleCloud.ID;

			const close_your_eyes = md5('VMDiskAttach' + user.id + user.secret);
			const auth = {
				userid: user.id,
				vmid,
				secret: close_your_eyes,
			};
			const actionParams = {
				type: this.attach.type,
			}
			if(this.attach.type == 1){
				actionParams['imageID'] = this.attach.imageID;
			}
			if(this.attach.type == 2){
				actionParams['size'] = this.attach.size * 1024;
			}
			const query = Object.assign(auth, actionParams);
			const url = `/VMDiskAttach.php?${this.URLparameter(query)}`
			
			// console.log(query);
			// return
			this.attach.loading = true;
			this.$axios.get(url)
			.then( res => {
				// console.log(res);
				if(res.data.result == 'success')
					this.$message.success(`Disk attached`);
				else{
					this.$message.error(`VM disk attach failed`);
					console.error(res.data);
				}
			})
			.catch( err => {
				console.error(err)
			})
			.finally( () => {
				this.$store.dispatch('cloud/silentUpdate', this.$route.params.pathMatch);
				this.closeModal('attach');
				this.attach.loading = false;
			})
		},
		sendDetach(disk){
			// console.log(disk)
			if(this.detach.imageID == 0){
				this.$message.warning('You can\' remove main OS disk');
				return;
			}

			const user = this.user;
			const vmid = this.SingleCloud.ID;

			const close_your_eyes = md5('VMDiskDetach' + user.id + user.secret);
			const auth = {
				userid: user.id,
				vmid,
				secret: close_your_eyes,
			};
			const actionParams = {
				diskID: this.detach.diskID,
			}
			const query = Object.assign(auth, actionParams);
			const url = `/VMDiskDetach.php?${this.URLparameter(query)}`;

			this.detach.loading = true;
			this.$axios.get(url)
			.then( res => {
				// console.log(res);
				if(res.data.result == 'success')
					this.$message.success(`Disk detached`);
				else{
					this.$message.error(`VM disk detach failed`);
					console.error(res.data);
				}
			})
			.catch( err => {
				console.error(err)
			})
			.finally( () => {
				this.$store.dispatch('cloud/silentUpdate', this.$route.params.pathMatch);
				this.closeModal('detach');
				this.detach.loading = false;
			})
		}
	}
}
</script>

<style>

.modal_table_action_btn{
	font-size: 1.2rem;
	cursor: pointer;
}

.modal_table_action_btn i{
	transition: color .2s ease, transform .2s .1s ease;
}

.modal_table_action_btn:not(:last-child){
	margin-right: 15px;
}

.modal_table_action_btn:hover i{
	color: #427cf7;
	transform: scale(1.25);
}

</style>