<template>
	<div class="network-control">
		<a-table :columns="columns" :data-source="newtworks" :pagination="false">
			<div slot="buttons" slot-scope="value, row">
				<span v-if="value.NIC_ID != 0" class="network__button" title="Detach" @click="detachInit(row)">
					<a-icon type="close" />
				</span>
			</div>
		</a-table>
		
		<a-row style="margin-top: 15px">
			<a-col>
				<a-button @click="showModal('attach')">Attach new disk</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import md5 from 'md5'
import { mapGetters } from 'vuex'

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
  },
	{
		title: 'Actions',
		key: 'actions',
		scopedSlots: { customRender: 'buttons' },
		width: 100,
	},
]

export default {
	name: 'networkControl',
	data(){
		return {
			columns
		}
	},
	computed: {
		...mapGetters('cloud', {
			SingleCloud: 'getOpenedCloud',
		}),
		...mapGetters({user: 'getUser'}),
		newtworks(){
			if(Array.isArray(this.SingleCloud.NIC)){
				return this.SingleCloud.NIC
			}
			return [this.SingleCloud.NIC]
		},
	},
}
</script>

<style>

</style>