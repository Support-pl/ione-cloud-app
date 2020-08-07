<template>
	<div class="openInvoice">
		<!-- {{this.$route.params.pathMatch}} -->
		<div class="openInvoice__header">
			<div class="container full-height">
				<div class="openInvoice__header--content">
					<div class="openInvoice__back" @click="goBack()">
						<div class="icon__wrapper">
							<a-icon type="left" />
						</div>
					</div>
					<div class="openInvoice__title">
						{{$t('singleInvoice')+'#'+this.$route.params.pathMatch}}
					</div>
				</div>
			</div>
		</div>
		

		<div class="openInvoice__main">
			<div class="container full-height">
				<div class="openInvoice__main-content">
					<div class="openInvoice__cost">
						<svg viewBox="0 0 95 20">
							<text class="openInvoice__cost-text" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{{inv.total}} {{inv.currency == undefined ? "USD" : inv.currency}}</text>
						</svg>
						<!-- {{inv.total}} {{inv.currency == undefined ? "USD" : inv.currency}} -->
					</div>
					<div class="openInvoice__info">
						<div class="info__header-title">Information</div>

						<div class="info__main">
							<div class="info__dates">
								<div class="info__date-item">
									<div class="info__date-title">{{$t("invoiceDate")}}</div>
									<div class="info__date-value">{{inv.date || 'loading...'}}</div>
								</div>
								<div class="info__date-item">
									<div class="info__date-title">{{$t("dueDate")}}</div>
									<div class="info__date-value">{{inv.duedate || 'loading...'}}</div>
								</div>
							</div>

							<div class="info__table table">
								<div class="table__header">
									<div class="table__header-item">
										Description
									</div>
									<div class="table__header-item">
										Price
									</div>
								</div>
								<div class="table__wrapper">
									<table v-if="!showFullTable" class="table__table">
										<tr>
											<td>{{ inv.items.item[0].description }}</td>	
											<td>{{ inv.items.item[0].amount }}</td>	
										</tr>
									</table>
									<table v-else class="table__table">
										<tr v-for="(elem, index) of inv.items.item" :key="index">
											<td>{{ elem.description }}</td>	
											<td>{{ elem.amount }}</td>	
										</tr>
									</table>
								</div>
								<div v-if="inv.items.item.length > 1 && !showFullTable" @click="showfull" class="table__show-full">
									Отобразить полный список ({{inv.items.item.length}})
								</div>
							</div>
						</div>
						<div class="info__footer">
							<template v-if="inv.status == 'Unpaid'">
								<div class="info__postpone">
									<a-icon type="clock-circle" />
								</div>
								<div class="info__button info__button--pay">
									Оплатить
								</div>
							</template>
						</div>

						<!-- <div class="info__row">
							<div class="info__title">{{$t("status")}}</div>
							<div class="info__value">{{$t(inv.status.toLowerCase())}}</div>
						</div>
						<div class="info__row">
							<div class="info__title">{{$t("invoiceDate")}}</div>
							<div class="info__value">{{inv.date}}</div>
						</div>
						<div class="info__row">
							<div class="info__title">{{$t("dueDate")}}</div>
							<div class="info__value">{{inv.duedate}}</div>
						</div>
						<div class="info__row">
							<div class="info__title">{{$t("service")}}</div>
							<div class="info__value">{{inv.service == undefined? "не получен с API" : inv.service}}</div>
						</div>
						<template v-if="inv.status == 'Unpaid'">
							<div class="info__row info__row--pay">
								<div class="info__title">{{$t("Choice payment")}}</div>
								<div class="info__value">
									<select class="info__payment-select" name="payment" id="payment">
										<option v-for="(pay, index) in payment" :key="index" :value="index">{{pay}}</option>
									</select>
								</div>
							</div>
							<div class="info__row info__row--pay-btn">
								Оплатить
							</div>
						</template> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import md5 from "md5";
import { mapGetters } from 'vuex';

export default {
	name: "openInvoice",
	data(){
		return {
			inv: {
				// id: '124',
				// cost: '50',
				// currency: 'USD',
				// status: 'Unpaid',
				// invoiceDate: '07/01/2020',
				// dueDate: '17/01/2020',
				// service: 'CRM+ (Cloud)'
			},
			payment: [
				'visa',
				'mastercard',
				'yandex.money',
				'ЕРИП'
			],
			showFullTable: false
		}
	},
	methods: {
		goBack(){
			this.$router.push("/invoice");
		},	
		showfull(){
			this.showFullTable = true;
		}
	},
	mounted(){

		const close_your_eyes = md5('invoice'+this.user.id+this.user.secret);
		const url = `https://my.support.by/app_cloud_mobile/invoice.php?id=${this.$route.params.pathMatch}&secret=${close_your_eyes}`;
		console.log(url)

		axios.get(url)
		.then(res => {
			console.log(res);
			this.inv = res.data;
		})
	},
	computed: {
		user(){
			return this.$store.getters.getUser;
		}
	}

}
</script>

<style>
	.openInvoice{
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.openInvoice__header {
		height: 64px;
		line-height: 64px;
		background-color: rgb(66, 124, 247);
		color: #fff;
		padding: 0;
	}

	.openInvoice__header--content{
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		justify-items: center;
		align-items: center;
		height: 100%;
	}

	.openInvoice__title{
		font-weight: bold;
		line-height: 1.1rem;
	}

	.openInvoice__back{
		font-size: 1.4rem;
		cursor: pointer;
	}

	.openInvoice__main{
		flex: 1 0;
		background-color: rgb(66, 124, 247);
		/* padding: 6px 15px; */
	}

	.openInvoice__main-content{
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.openInvoice__cost{
		width: 100%;
	}
	
	.openInvoice__cost-text{
		fill: #fff;
	}

	.openInvoice__info{
		display: flex;
		flex-direction: column;
		flex: 1 0;
		background-color: rgb(250, 250, 250);
		border-radius: 25px 25px 0 0;
		padding: 10px 20px 20px;
	}

	.info__main{
		display: flex;
		flex-direction: column;
		flex: 1 0;
	}

	.info__dates{
		display: flex;
		justify-content: space-around;
		margin-bottom: 30px;
	}

	.info__date-item{
		text-align: center;
	}

	.info__date-value{
		font-weight: 600;
	}

	.info__table{
		flex: 1 0;
		overflow: auto;
	}

	.table__wrapper{
		overflow: auto;
	}

	.table__header{
		display: flex;
		justify-content: space-between;
		color:rgba(0, 0, 0, .8);
		margin-bottom: 5px;
	}

	.table__header-item{
		text-transform: uppercase;
		font-weight: 700;
		font-size: 1.05rem;
	}

	.table__table{
		border-top: 2px solid rgba(0, 0, 0, .70);
		border-bottom: 2px solid rgba(0, 0, 0, .70);
		width: 100%;
		overflow: hidden;
	}

	.table__table td{
		padding: 15px 0 15px 0;
		line-height: .85rem;
		border-bottom: 1px solid rgba(0, 0, 0, .25);
	}

	.table__table td:first-child{
		border-right: 2px solid rgba(0, 0, 0, .70);
		text-align: left;
		padding-right: 5px;
	}

	.table__table td:last-child{
		text-align: right;
		width: 30%;
		max-width: 150px;
		padding-left: 5px;
	}

	.table__show-full{
		border-bottom: 2px solid rgba(0, 0, 0, .70);
		color:rgb(66, 124, 247);
		cursor: pointer;
	}

	.table__show-full:hover{
		text-decoration: underline;
	}

	.info__footer{
		display: flex;
		height: 48px;
		margin-top: 20px;
	}

	.info__postpone{
		font-size: 24px;
		padding: 9px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.info__button{
		flex: 1 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #0fd058;
		border-radius: 24px;
		font-weight: 600;
		color: #fff
	}

	.info__row{
		display: flex;
		/* margin-top: 10px; */
		border-top: 1px solid rgb(230, 230, 230);
	}

	.info__row--pay{
		margin-top: 40px;
	}

	.info__title, .info__value{
		flex: 1 0;
		padding: 10px 5px;
	}

	.info__row:last-child{
		border-bottom: 1px solid rgb(230, 230, 230);
	}

	.info__title{
		border-right: 1px solid rgb(230, 230, 230);
	}

	.info__value{
		text-align: center;
	}

	.full-height{
		height: 100%;
	}

	.info__header-title{
		text-align: center;
		font-size: 1.3rem;
		font-weight: 500;
		margin-bottom: 20px;
	}

	.info__payment-select{
		border: none;
		outline: none;
		background-color: rgb(250, 250, 250);
		width: 90%;
	}

	.info__payment-select > option{
		border: none;
		outline: none;
	}

	.info__row--pay-btn{
		background-color: #0fd058;
		color: #fff;
		font-weight: 500;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 12px 0;
		border-radius: 20px;
		transition: background-color .2s ease;
		margin-top: 30px;
	}
	
	.info__row--pay-btn:hover{
		background-color: #18da62;
	}
	
	.info__row--pay-btn:active{
		background-color: rgb(22, 194, 88);
	}
</style>