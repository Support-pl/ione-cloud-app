<template>
	<div class="cloud__item-wrapper" @click="cloudClick(cloud.ID)">
		<div class="cloud__item">
			<div class="cloud__upper">
				<div class="item__color" :style="{'background-color': statusColor}"></div>
				<div class="item__title">{{cloud.CUSTOM_VM_NAME ? cloud.CUSTOM_VM_NAME : cloud.NAME}}</div>
				<div class="item__status">{{cloud.STATE}}</div>
			</div>
			<div class="cloud__lower">
				<template v-if="cloud.HOST != '' && cloud.HOST != undefined">
					HOST: {{cloud.HOST}},
				</template>
					IP: {{cloud.IP || $t('ip.none')}}
			</div>
		</div>
		<div class="cloud__label cloud__label__mainColor">
			{{cloud.VDC == 1 ? "PAYG" : "PrePaid"}}
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
			const color = this.$store.getters['cloud/getStateColor'](this.cloud.STATE);
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
	position: relative;
	padding: 8px 15px 15px 40px;
	box-shadow: 5px 8px 10px rgba(0, 0, 0, .05);
	border-radius: 15px;
	background-color: #fff;
	color:rgba(0, 0, 0, .7);
	cursor: pointer;
	overflow: hidden;
}
.cloud__item-wrapper:hover{
	background-color: rgba(255,255,255,.55);
}
.cloud__item-wrapper:not(:last-child){
	margin-bottom: 20px;
}

.cloud__item{
	position: relative;
	font-size: 16px;
}

.cloud__upper{
	display: flex;
	justify-content: space-between;
}

.item__color{
	width: 18px;
	height: 18px;
	background-color: #fff;
	position: absolute;
	border-radius: 50%;
	left: -28px;
	top: 15px;
}

.item__title{
	flex-grow: 1;
	padding-right: 10px;
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.item__status, .cloud__lower{
	color: rgba(0, 0, 0, .4)
}



@media screen and (min-width: 768px){
	.cloud__item-wrapper:not(:last-child){
		margin-bottom: 0px;
	}
	.cloud__item-wrapper{
		height: max-content;
	}
}

.cloud__label{
	position: absolute;
	right: 0;
	bottom: 0;
	background: var(--main);
	color: #fff;
	padding: 3px 15px;
	border-radius: 20px 0px 0px 0px;
	transition-property: padding, border-radius;
	transition-duration: .2s;
	transition-timing-function: ease;
}

.cloud__item-wrapper:hover .cloud__label{
	padding: 7px 20px;
	border-radius: 22px 0px 0px 0px;
}
</style>
