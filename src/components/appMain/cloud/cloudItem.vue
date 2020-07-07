<template>
	<div class="cloud__item-wrapper">
		<div class="cloud__item">
			<div class="upper">
				<div class="item__color" :style="{'background-color': cloud.color}"></div>
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
	}
}
</script>

<style>

	.cloud__item-wrapper{
		padding: 0 15px 0 35px  
	}

	.cloud__item{
		position: relative;
		border-bottom: 1px solid gray;
		padding: 10px 0;
		font-size: 16px;
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