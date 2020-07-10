<template>
	<div class="header__container">
		<div class="container">
			<div class="header__content">
				<div v-if="active == 'cloud'" class="header__wrapper header__wrapper--cloud">
			<div class="header__left clickable" @click="change">
				<div class="icon__wrapper">
					<a-icon class="header__icon" type="search"/>
				</div>
			</div>
			<div class="header__title">{{$t('Cloud')}}</div>
			<div class="header__left clickable" @click="reload">
				<div class="icon__wrapper">
					<a-icon class="header__icon" type="reload"/>
				</div>
			</div>
			<div class="header__right">${{user.balance.toFixed(2)}}</div>
		</div>

		<div v-if="active == 'support'"  class="header__wrapper">
			<div class="header__left">
			</div>
			<div class="header__title">{{$t('Support')}}</div>
			<div class="header__right clickable">
				<div class="icon__wrapper">
					<a-icon class="header__icon" type="plus" />
				</div>
			</div>
		</div>

		<div v-if="active == 'invoice'"  class="header__wrapper">
			<div class="header__left clickable">
				<div class="icon__wrapper">
					<a-icon class="header__icon" type="plus" />
				</div>
			</div>
			<div class="header__title">{{$t('Invoice')}}</div>
			<div class="header__right">${{user.balance.toFixed(2)}}</div>
		</div>

		<div v-if="active == 'settings'"  class="header__wrapper">
			<div class="header__left"></div>
			<div class="header__title">{{$t('Settings')}}</div>
			<div class="header__right"></div>
		</div>
			</div>
		</div>
		
	</div>
</template>

<script>
export default {
	name: "appHeader",
	date(){
		return {
			
		}
	},
	props: {
		user: Object,
		active: String,
		change: Function
	},
	methods: {
		reload(){
			console.log('reload');
		}
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

	.header__wrapper--cloud{
		grid-template-columns: 20% 1fr 20% 20%;
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
	}

	.icon__wrapper{
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition:
			background-color .2s ease,
			color .1s ease,
			transform .2s ease;
	}

	.icon__wrapper:hover{
		background-color: #fff;
		color: #427cf7;
		transform: scale(1.2);
	}

	.icon__wrapper:active{
		transform: scale(1.1);
	}
</style>