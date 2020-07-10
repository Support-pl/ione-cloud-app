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
					<div class="openInvoice__cost">{{inv.cost}} {{inv.currency}}</div>
					<div class="openInvoice__info">
						<div class="info__header-title">Information</div>
						<div class="info__row">
							<div class="info__title">{{$t("status")}}</div>
							<div class="info__value">{{$t(inv.status)}}</div>
						</div>
						<div class="info__row">
							<div class="info__title">{{$t("invoiceDate")}}</div>
							<div class="info__value">{{inv.invoiceDate}}</div>
						</div>
						<div class="info__row">
							<div class="info__title">{{$t("dueDate")}}</div>
							<div class="info__value">{{inv.dueDate}}</div>
						</div>
						<div class="info__row">
							<div class="info__title">{{$t("service")}}</div>
							<div class="info__value">{{inv.service}}</div>
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
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "openInvoice",
	data(){
		return {
			inv: {
				id: '124',
				cost: '50',
				currency: 'USD',
				status: 'Unpaid',
				invoiceDate: '07/01/2020',
				dueDate: '17/01/2020',
				service: 'CRM+ (Cloud)'
			},
			payment: [
				'visa',
				'mastercard',
				'yandex.money',
				'ЕРИП'
			]
		}
	},
	methods: {
		goBack(){
			this.$router.push("/invoice");
		},
		
	},

}
</script>

<style>
	.openInvoice{
		height: 100%;
		display: flex;
		flex-direction: column;
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
		/* padding: 6px 15px; */
	}

	.openInvoice__main-content{
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.openInvoice__cost{
		align-self: center;
		font-size: 4rem;
		color: #427cf7;
	}

	.openInvoice__info{
		flex: 1 0;
		background-color: rgb(250, 250, 250);
		border-radius: 25px 25px 0 0;
		padding: 10px 20px;
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
		font-size: 1.2rem;
		font-weight: 500;
	}

	.info__payment-select{
		border: none;
		outline: none;
		background-color: rgb(250, 250, 250);
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
		margin-top: 20px;
	}
	
	.info__row--pay-btn:hover{
		background-color: #18da62;
	}
	
	.info__row--pay-btn:active{
		background-color: rgb(22, 194, 88);
	}
</style>