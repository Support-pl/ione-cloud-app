<template>
	<div class="header__container">
		<div class="container">
			<div v-if="headers[active]" class="header__wrapper">
			<div class="header__title">
				<div v-if="headers[active] && headers[active].notmain" class="header_back_btn icon__wrapper" @click="routeBack">
					<a-icon type="left"/>
				</div>
				{{this.$t(headers[active].title)}}
			</div>
			<div class="header__right-side">
				<div class="header__buttons" >
					<div class="header__button" v-for="button in headers[active].buttons" :key="button.icon">
						<div v-if="button.onClickFuncion && button.type == undefined" class="icon__wrapper" :class="[{ active__btn: getState(button.name) }, button.additionalClass]" @click="button.onClickFuncion">
							<a-icon class="header__icon" :type="button.icon"/>
						</div>
						<div v-else-if="button.onClickFuncion && button.type != undefined" class="icon__wrapper order__btn" :class="[{ active__btn: getState(button.name) }, button.additionalClass]" @click="button.onClickFuncion">
							<div class="header__order-btn">{{button.name}}</div>
						</div>
						<div v-else class="icon__wrapper" :class="[{ active__btn: getState(button.name) }, button.additionalClass]">
							<a-icon v-if="!button.popover" class="header__icon" :type="button.icon"/>
							<a-popover v-else placement="bottomRight">
								<template slot="content">
									<div>
										<a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
									</div>
								</template>
								<template slot="title">
									<span>{{$t('Filter')}}</span>
								</template>
								<a-icon class="header__icon" :type="button.icon"/>
							</a-popover>
						</div>
					</div>
				</div>
				<div v-if="headers[active].needBalance" class="header__balance">
					<balance/>
				</div>
			</div>
		</div>


		</div>
		
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import balance from "../balance/balance.vue";

export default {
	name: "appHeader",
	components: {
		balance
	},
	data(){
		return {
			indeterminate: true,
			checkAll: false,
			checkedList: [],
			headers: {
				'cloud': {
					title: 'Cloud',
					// needBalance: true,
					buttons: [
						{
							name: this.$t('Order'),
							type: 'main action',
							onClickFuncion: this.orderVM
						},
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
					// needBalance: true,
					buttons: [
						{
							name: 'support_filter',
							icon: 'filter',
							isActiveState: this.isOnlyClosedTickets,
							popover: true
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
				'services': {
					title: 'Services',
					needBalance: true,
					buttons: [
					]
				},
				'invoice': {
					title: 'Invoice',
					// needBalance: true,
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
				},
				'newVDC': {
					title: 'Create VM',
					notmain: true,
					// needBalance: true,
					buttons: []
				},
				'newPaaS': {
					title: 'Create VM',
					notmain: true,
					// needBalance: true,
					buttons: []
				}

			}
		}
	},
	methods: {
		...mapActions('support', ['fetchTickets', 'fetchTicketsThatClosed']),
		...mapActions('invoices', ['fetchInvoices']),
		...mapActions('cloud', ['fetchClouds']),
		...mapMutations('support', ['inverseAddTicketState', 'updateFilter']),
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
				case 'cloud_plus':
					return false;
					break;
			
				default:
					break;
			}
		},
		createVDC(){
			this.$router.push('/cloud/new');
		},
		onChange(checkedList) {
      this.indeterminate = !!this.checkedList.length && checkedList.length < this.plainOptions.length;
			this.checkAll = this.checkedList.length === this.plainOptions.length;
			this.updateFilter(this.checkedList);
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
			this.updateFilter(this.checkedList);
		},
		routeBack(){
			this.$router.go(-1)
		},
		orderVM(){
			this.$router.push({name: 'newPaaS'});
		}
	},
	computed:{
		user(){
			return this.$store.getters.getUser
		},
		...mapGetters('support', ['isAddTicketState', 'isOnlyClosedTickets', 'getTickets', 'getAllTickets']),
		...mapGetters('app', ['getActiveTab']),
		...mapGetters('cloud', ['isSearch']),
		...mapGetters(['getUser']),
		active(){
			return this.getActiveTab.title
		},
		plainOptions(){
			function arrayUnique(arr){
				return arr.filter((e,i,a)=>a.indexOf(e)==i)
			}
			
			const tickets = this.getAllTickets;
			let statuses = tickets.map(el => el.status);
			statuses = arrayUnique(statuses);
			Object.assign(this, {
        checkedList: statuses,
        indeterminate: false,
        checkAll: true,
      });
			return statuses;
		}
	},
	created(){
		
	}
	
}
</script>

<style scoped>
	.header__wrapper{
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		justify-items: center;
		align-items: center;
		font-size: 1.1rem;
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
		display: flex;
		align-items: center;
	}

	.header_back_btn{
		font-size: 1.4rem;
		margin-right: 20px;
	}

	.header__right{
		transition: transform .2s ease;
	}

	.header__icon{
		font-size: 1.4rem;
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
	
	.order__btn{
		min-width: 44px;
		width: auto;
		border-radius: 30px;
		padding: 2px 10px;
	}

	.header__order-btn{
		font-size: 1rem;
	}

	.icon__wrapper:hover{
		background-color: var(--bright_bg);
		color: var(--main);
		transform: scale(1.2);
	}
	.icon__wrapper.active__btn{
		background-color: var(--bright_bg);
		color: var(--main);
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

	.header__right-side{
		display: flex;
		align-items: center;
	}

	.header__balance{
		margin-left: 10px;
	}
</style>