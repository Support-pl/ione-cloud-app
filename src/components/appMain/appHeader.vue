<template>
	<div class="header__container">
		<div class="container">
			<template v-if="!beta">
			<div class="header__content">
				<div v-if="active == 'cloud'" class="header__wrapper">
			<div class="header__left clickable" @click="inverseSearch">
				<div class="icon__wrapper" :class="{ active__btn:isSearch }">
					<a-icon class="header__icon" type="search"/>
				</div>
			</div>
			<div class="header__title">{{$t('Cloud')}}</div>
			<div class="header__right clickable" @click="fetchClouds">
				<div class="icon__wrapper">
					<a-icon class="header__icon" type="reload"/>
				</div>
			</div>
		</div>

		<div v-if="active == 'support'"  class="header__wrapper header__wrapper--four">
			<div class="header__left clickable" @click="fetchTicketsThatClosed">
				<div class="icon__wrapper" :class="{ active__btn:isOnlyClosedTickets  }">
					<a-icon class="header__icon" type="filter"/>
				</div>
			</div>
			<div class="header__title">{{$t('Support')}}</div>
			<div class="header__right clickable" @click="fetchTickets">
				<div class="icon__wrapper">
					<a-icon class="header__icon" type="reload"/>
				</div>
			</div>
			<div class="header__right clickable" @click="inverseAddTicketState">
				<div class="icon__wrapper"  :class="{active__btn: isAddTicketState}">
					<a-icon class="header__icon" type="plus" />
				</div>
			</div>
		</div>

		<div v-if="active == 'invoice'"  class="header__wrapper header__wrapper--four">
			<div class="header__left clickable">
				<div class="icon__wrapper">
					<a-icon class="header__icon" type="plus" />
				</div>
			</div>
			<div class="header__title">{{$t('Invoice')}}</div>
			<div class="header__right clickable" @click="fetchInvoices">
				<div class="icon__wrapper">
					<a-icon class="header__icon" type="reload"/>
				</div>
			</div>
			<div class="header__right">${{user.balance?user.balance:0}}</div>
		</div>

		<div v-if="active == 'settings'"  class="header__wrapper">
			<div class="header__left"></div>
			<div class="header__title">{{$t('Settings')}}</div>
			<div class="header__right"></div>
		</div>
			</div>
		</template>

		<div v-else class="header__wrapper">
			<div class="header__title">
				{{this.$t(headers[active].title)}}
			</div>
			<div class="header__buttons" >
				<div class="header__button" v-for="button in headers[active].buttons" :key="button.icon" @click="button.onClickFuncion">
					<div class="icon__wrapper" :class="[{ active__btn: getState(button.name) }, button.additionalClass]">
						<a-icon class="header__icon" :type="button.icon"/>
					</div>
				</div>
			</div>
		</div>


		</div>
		
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
	name: "appHeader",
	data(){
		return {
			beta: true,
			headers: {
				'cloud': {
					title: 'Cloud',
					buttons: [
						{
							name: 'cloud_search',
							icon: 'search',
							onClickFuncion: this.inverseSearch,
							isActiveState: this.isSearch
						},
						{
							name: 'cloud_reload',
							icon: 'reload',
							onClickFuncion: this.fetchClouds
						},
					]
				},
				'support': {
					title: 'Support',
					buttons: [
						{
							name: 'support_filter',
							icon: 'filter',
							onClickFuncion: this.fetchTicketsThatClosed,
							isActiveState: this.isOnlyClosedTickets
						},
						{
							name: 'support_plus',
							icon: 'plus',
							onClickFuncion: this.inverseAddTicketState,
							isActiveState: this.isAddTicketState,
							additionalClass: ['active-rotate']
						},
						{
							name: 'support_reload',
							icon: 'reload',
							onClickFuncion: this.fetchTickets
						},
					]
				},
				'invoice': {
					title: 'Invoice',
					buttons: [
						{
							name: 'invoice_filter',
							icon: 'reload',
							onClickFuncion: this.fetchInvoices,
						},
					]
				},
				'settings': {
					title: 'Settings',
					buttons: []
				}

			}
		}
	},
	methods: {
		...mapActions('support', ['fetchTickets', 'fetchTicketsThatClosed']),
		...mapActions('invoices', ['fetchInvoices']),
		...mapActions('cloud', ['fetchClouds']),
		...mapMutations('support', ['inverseAddTicketState']),
		...mapMutations('cloud', ['inverseSearch']),
		getState(name){
			switch (name) {
				case 'cloud_search':
					return this.isSearch;
					break;
				case 'support_filter':
					return this.isOnlyClosedTickets;
					break;
				case 'support_plus':
					return this.isAddTicketState;
					break;
			
				default:
					break;
			}
		}
	},
	computed:{
		user(){
			return this.$store.getters.getUser
		},
		...mapGetters('support', ['isAddTicketState', 'isOnlyClosedTickets']),
		...mapGetters('app', ['getActiveTab']),
		...mapGetters('cloud', ['isSearch']),
		active(){
			return this.getActiveTab.title
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

	.header__wrapper--four{
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

	.header__right{
		transition: transform .2s ease;
	}

	.header__icon{
		font-size: 1.4rem;
	}

	.clickable:hover{
		/* cursor: pointer; */
	}

	.icon__wrapper{
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
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
	.icon__wrapper.active__btn{
		background-color: #fff;
		color: #427cf7;
	}

	.icon__wrapper:active{
		transform: scale(1.1);
	}
	
	.active-rotate.active__btn{
		transform: rotate(45deg);
	}

	.header__wrapper{
		display: flex;
		justify-content: space-between;
		padding: 0 15px;
	}

	.header__buttons{
		display: flex;
		justify-content: space-around;
	}
	
	.header__button:not(:last-child){
		margin-right: 15px;
	}
</style>