<template>
	<div v-if="!isProductsLoading" class="newCloud_wrapper">
		<div class="newCloud">
			<div class="newCloud__inputs newCloud__field">

				<div class="newCloud_option">
					<a-row>
						<a-radio-group v-model="options.period" class='period__wrapper'>
							<a-col v-for="period in periods" :key="period.title+period.count" span='6' class='period__item'>
								<a-radio :value='period.value'>
									{{period.title == 'year'?'1 ':''}}{{$tc(period.title, period.count)}}
								</a-radio>
								<span v-if="period.discount != undefined" class="period__discount">-{{period.discount}}%</span>
							</a-col>
						</a-radio-group>
					</a-row>

					<a-row>
						<a-col span="4">basic {{$t('processor')}}</a-col>
						<a-col span="2"><a-switch v-model="options.highCPU"></a-switch></a-col>
						<a-col span='4'>high {{$t('processor')}}</a-col>
					</a-row>

					<a-row>
						<a-col span="4">HDD {{$t('drive')}}</a-col>
						<a-col span="2"><a-switch v-model="options.drive"></a-switch></a-col>
						<a-col span='4'>SSD {{$t('drive')}}</a-col>
					</a-row>

					<a-row>
						<a-col span="4">X2CPU</a-col>
						<a-col span="2"><a-switch :checked="options.kind == 'X2CPU'" @change="controlKindOfVM('X2CPU')"></a-switch></a-col>
					</a-row>
					<a-row>
						<a-col span="4">X2RAM</a-col>
						<a-col span="2"><a-switch :checked="options.kind == 'X2RAM'" @change="controlKindOfVM('X2RAM')"></a-switch></a-col>
					</a-row>
				</div>

			</div>
			
			<div class="newCloud__calculate newCloud__field result">
				<a-skeleton :loading="getCurrentProd==null" :active="true">
					<div class="result__title">
						{{getCurrentProd!=null ? getCurrentProd.name : ''}}
					</div>
					<a-row type="flex" justify="space-between">
						<a-col>
							CPU:
						</a-col>
						<a-col>
							{{getCurrentProd!=null ? getCurrentProd.props.cpu_core.TITLE : ''}}
						</a-col>
					</a-row>

					<a-row type="flex" justify="space-between">
						<a-col>
							RAM:
						</a-col>
						<a-col>
							{{getCurrentProd!=null ? getCurrentProd.props.ram.TITLE : ''}}
						</a-col>
					</a-row>

					<a-row type="flex" justify="space-between">
						<a-col>
							{{$t('Drive')}}:
						</a-col>
						<a-col>
							{{getCurrentProd!=null ? getCurrentProd.props.drive.TITLE : ''}}
						</a-col>
					</a-row>
					
					<a-divider orientation="left" :style="{'margin-bottom': '0'}">
						{{$t('Total')}}:
					</a-divider>

					<a-row type="flex" justify="space-around" :style="{'font-size': '1.5rem'}">
						<a-col>
							{{getCurrentProd!=null ? getCurrentProd.pricing.BYN[options.period] : ''}} BYN
						</a-col>
					</a-row>
				</a-skeleton>

				<a-row type="flex" justify="space-around" style="margin-top: 24px; margin-bottom: 10px">
					<a-col :span="22">
						<a-button type="primary" block shape="round" @click="() => modal.confirmCreate=true" :loading="getCurrentProd==null">
							{{$t("Create")}}
						</a-button>
						<a-modal
							:title="$t('Confirm')"
							:visible="modal.confirmCreate"
							:confirm-loading="modal.confirmLoading"
							:cancel-text="$t('Cancel')"
							@ok="handleOkOnCreateOrder"
							@cancel="() => modal.confirmCreate = false"
						>
							{{$t('Virtual machine will be available after paying the invoice')}}

							<div>
								<a-checkbox :checked="modal.goToInvoice" @change="(e) => modal.goToInvoice = e.target.checked"/> {{$t('go to invoice')}}
							</div>
						</a-modal>
					</a-col>
				</a-row>

			</div>
		</div>
	</div>
</template>

<script>

const periods = [
	{
		count: 1,
		title: 'month',
		value: 'monthly'
	},
	{
		count: 3,
		title: 'month',
		value: 'quarterly'
	},
	{
		count: 6,
		title: 'month',
		value: 'semiannually',
		discount: 5
	},
	{
		count: 1,
		title: 'year',
		value: 'annually',
		discount: 10
	},
];

const sizes = ['M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

import { mapGetters } from 'vuex'
import config from '../../appconfig'
export default {
	name: "newPaaS",
	data(){
		return {
			periods,
			sizes,
			options: {
				kind: 'standart',
				period: 'monthly',
				size: 'L',
				drive: false, // 1 ssd, 0 hdd
				highCPU: false, // 1 highCPU, 0 basicCPU
			},
			modal: {
				confirmCreate: false,
				confirmLoading: false,
				goToInvoice: false
			}
		}
	},
	mounted(){
		this.$store.dispatch('newPaaS/fetchProductsAuto');
		this.$store.dispatch('newPaaS/fetchAddonsAuto');
	},
	methods: {
		getPopupContainer(trigger) {
			const elem = trigger.parentElement.parentElement.parentElement;
      return elem;
		},
		URLparameter(obj, outer = ''){
			var str = "";
			for (var key in obj) {
				if(key == "price") continue;
				if (str != "") {
						str += "&";
				}
				if(typeof obj[key] == 'object') {
					str += this.URLparameter(obj[key], outer+key);
				} else {
					str += outer + key + "=" + encodeURIComponent(obj[key]);
				}
			}
			return str;
		},
		controlKindOfVM(newKind){
			if(this.options.kind == newKind){
				this.options.kind = 'standart';
			}else{
				this.options.kind = newKind;
			}
		},
		handleOkOnCreateOrder(){
			this.confirmLoading = true;
			this.$store.dispatch('newPaaS/sendOrder', this.getCurrentProd.pid)
			.then( result => {
				const res = result.data;
				if(res.result == "success"){
					this.$message.success(this.$t('Order created successfully.'));
					if(this.modal.goToInvoice){
						this.$router.push(`/invoice-${res.invoiceid}`);
					}
				} else {
					throw result.data
				}
			})
			.catch( err => {
				this.$message.error('Can\'t create order. Try later.');
				console.error(err);
			} )
			.finally( res => {
				this.confirmLoading = false;
			} )
		}
	},
	computed: {
		...mapGetters('newPaaS', [
			'getProducts',
			'getAddons',
			'isProductsLoading',
			'isAddonsLoading',
		]),
		getCurrentProd(){
			const o = this.options;
			const path =  [o.kind, o.size, +o.drive, +o.highCPU];
			let current = this.getProducts;
			if(current == undefined || current.length == 0){
				return null
			}
			for (let index = 0; index < path.length; index++) {
				if(current[path[index]] != undefined){
					current = current[path[index]];
				} else {
					let pt = path.slice(0, index+1).join('/')
					console.error(`there is no product with path: ${pt}, there is only: ${Object.keys(current).join(', ')}`);
					return null;
				}
			}
			return current;
		}
	},
	watch: {
		collapseKey: function(val) {
			if(val == 'drive'){
				setTimeout(() => {
					this.showTooltip = true
				}, 250);
			} else {
					this.showTooltip = false
			}
		}
	}
}
</script>

<style>

.period__wrapper{
	display: block;
	padding: 15px 0 0;
}

.period__item{
	display: flex;
	justify-content: center;
	position: relative;
}

.period__discount{
	position: absolute;
	top: -22px;
	font-size: 1.1rem;
	color: var(--err);
	font-weight: bold;
}

.newCloud_wrapper{
	position: relative;
	width: 100%;
	min-height: 100%;
}
.newCloud{
	position: absolute;
	margin-top: 15px;
	margin-bottom: 15px;
	width: 100%;
	max-width: 1024px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
}

.newCloud__inputs{
	margin-right: 20px;
	width: 72%;
	padding: 20px;
}

.newCloud__field{
	border-radius: 20px;
	box-shadow:
		5px 8px 10px rgba(0, 0, 0, .08),
		0px 0px 12px rgba(0, 0, 0, .05);
	background-color: #fff;
	height: max-content;
}

.newCloud__calculate{
	width: 28%;
	font-size: 1.1rem;
	padding: 10px 15px 10px;
}

.result__title{
	font-size: 1.5rem;
	text-align: center;
	padding: 2px 0 10px;
}

@media screen and (max-width: 1024px) {
	.newCloud{
		flex-direction: column;
		padding: 10px;
		margin-top: 0px;
		overflow: auto;
	}
	.newCloud__inputs{
		margin: 0;
		border-radius: 20px 20px 0 0;
		width: auto;
	}
	.newCloud__field{
		box-shadow: none;
		flex-grow: 0;
	}
	.newCloud__calculate{
		border-radius: 0 0 20px 20px;
		width: auto;
	}
}

@media screen and (max-width: 576px) {
	.newCloud__template{
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: stretch;
	}
	.newCloud__template-item{
		grid-template-columns: max-content auto;
		grid-template-rows: 1fr;
		width: auto;
		height: 50px;
	}
	.newCloud__template-item:not(:last-child){
		margin-right: 0px;
	}
	.newCloud__template-image{
		width: 50px;
		height: 50px;
		padding: 4px;
	}
	.newCloud__template-image__rate{
		line-height: 42px;
		font-size: 1.4rem;
	}
	.newCloud__template-image img{
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
	.newCloud__template-name{
		text-align: left;
		line-height: 30px;
		display: flex;
	}
	.newCloud__template-type{
		width: 56px;
	}
	.newCloud__template-name ul{
		display: flex;
		justify-content: space-around;
		list-style: none;
		flex: 1
	}
	.newCloud__template-name ul li{
		margin-left: 20px;
	}
}
</style>