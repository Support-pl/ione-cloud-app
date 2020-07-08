<template>
	<div class="cloud__item-wrapper">
		<div class="cloud__item" @click="cloudClick(cloud.id)">
			<div class="upper">
				<div class="item__color" :style="{'background-color': statusColor}"></div>
				<div class="item__title">{{cloud.title}}</div>
				<div class="item__status">{{cloud.status}}</div>
			</div>
			<div class="lower">
				HOST: {{cloud.host}}, IP: {{cloud.ip}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "cloudItem",
	props: {
		cloud: Object,
	},
	computed: {
		statusColor(){
			let color = '';
			switch (this.cloud.status.toLowerCase()) {
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
		}
	},
	methods: {
		cloudClick(id){
			this.$router.push('cloud-' + id)
		}
	}
}
</script>

<style>

	.cloud__item-wrapper{
		padding: 0 15px 0 35px; 
		cursor: pointer;
	}

	.cloud__item{
		position: relative;
		border-bottom: 1px solid gray;
		padding: 10px 0;
		font-size: 16px;
	}

	.cloud__item-wrapper:hover{
		background-color: rgba(0,0,0,.08);
	}

	.upper{
		display: flex;
		justify-content: space-between;
	}

	.item__color{
		width: 18px;
		height: 18px;
		background-color: #fff;
		position: absolute;
		border-radius: 50%;
		left: -24px;
		top: 15px;
	}

	.item__title{
		font-weight: bold;
	}

	.item__status, .lower{
		color: rgba(0, 0, 0, .4)
	}
</style>