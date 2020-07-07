<template>
	<div class="header__container">
		<div v-if="active == 0" class="header__wrapper">
			<div class="header__left clickable">
				<a-icon class="header__icon" type="search" />
			</div>
			<div class="header__title">{{$t('Cloud')}}</div>
			<div class="header__right">${{user.balance.toFixed(2)}}</div>
		</div>

		<div  v-if="active == 1"  class="header__wrapper">
			<div class="header__left">
			</div>
			<div class="header__title">{{$t('Support')}}</div>
			<div class="header__right clickable">
				<a-icon class="header__icon" type="plus" />
			</div>
		</div>

		<div  v-if="active == 2"  class="header__wrapper">
			<div class="header__left clickable">
				<a-icon class="header__icon" type="plus" />
			</div>
			<div class="header__title">{{$t('Invoice')}}</div>
			<div class="header__right">${{user.balance.toFixed(2)}}</div>
		</div>

		<div  v-if="active == 3"  class="header__wrapper">
			<div class="header__left">
			</div>
			<div class="header__title">{{$t('Settings')}}</div>
			<div class="header__right clickable">Edit</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "appHeader",
	props: {
		user: Object,
		active: Number
	}
}
</script>

<style>
	.header__wrapper{
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		justify-items: center;
		align-items: center;
	}

	.header__left{
		width: 90%;
		height: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header__title{
		font-weight: bold;
		font-size: 1.1rem;
	}

	.header__icon{
		font-size: 1.4rem;
	}

	.clickable:hover{
		cursor: pointer;
		transform: scale(1.05)
	}
</style>