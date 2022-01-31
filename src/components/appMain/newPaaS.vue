<template>
	<div class="newCloud_wrapper">
		<maintanance-mode v-if="isMaintananceMode"></maintanance-mode>
		<template v-else>
			<template v-if="true">

				<div class="newCloud" v-if="!isProductsLoading">

					<div class="newCloud__inputs field">

						<a-slider
							:marks="{...sizes}"
							:value="sizes.indexOf(options.size)"
							:tip-formatter="null"
							:max="sizes.length-1"
							:min="0"
							@change="(newval) => options.size = sizes[newval]"
						>
						</a-slider>

						<a-skeleton :loading="getCurrentProd==null" :active="true">
							<a-row justify="space-between" style="margin-top:50px">
								<a-col span="8" :xs="6">
									<span style="display: inline-block; width: 70px">CPU:</span>								
								</a-col>
								<a-col span="4" :xs="12">
									<a-switch :checked="options.kind == 'X2CPU'" @change="(val) => {options.kind = val?'X2CPU':'standart'}" style="width: 60px">
										<span slot="checkedChildren">x2</span>
										<span slot="unCheckedChildren">x1</span>
									</a-switch>
								</a-col>
								<!-- <a-col span="8">
									<a-tooltip>
										<template slot="title">
											{{$t('increases core frequency from 2.4 GHz to 3.7 GHz')}}
										</template>
										<a-checkbox v-model="options.highCPU" class="newCloud__prop">{{$t('High speed')}}</a-checkbox>
									</a-tooltip>
								</a-col> -->
								<transition name="textchange" mode="out-in">
									<a-col class="changing__field" span="6" style="text-align: right" :key='getCurrentProd!=null ? getCurrentProd.specs.CPU : "DefaultKey"'>
										{{getCurrentProd!=null ? getCurrentProd.specs.CPU : ''}} vCPU
									</a-col>
								</transition>
							</a-row>

							<a-row justify="space-between" class="newCloud__prop">
								<a-col span="8" :xs="6">
									<span style="display: inline-block; width: 70px">RAM:</span> 
								</a-col>
								<a-col span="12">
									<a-switch :checked="options.kind == 'X2RAM'" @change="(val) => {options.kind = val?'X2RAM':'standart'}" style="width: 60px">
										<span slot="checkedChildren">x2</span>
										<span slot="unCheckedChildren">x1</span>
									</a-switch>
								</a-col>
								<transition name="textchange" mode="out-in">
									<a-col class="changing__field" span="6" style="text-align: right" :key='getCurrentProd!=null ? getCurrentProd.specs.RAM : "DefaultKeyForRAM"'>
										{{getCurrentProd!=null ? getCurrentProd.specs.RAM : ''}} GB RAM
									</a-col>
								</transition>
							</a-row>

							<a-row class="newCloud__prop">
								<a-col span="8" :xs="6">
									<span style="display: inline-block; width: 70px">{{$t('Drive')}}:</span>
								</a-col>
								<a-col :xs="10" :sm="14">
									<a-switch v-model="options.drive" style="width: 60px">
										<span slot="checkedChildren">SSD</span>
										<span slot="unCheckedChildren">HDD</span>
									</a-switch>
								</a-col>
								<a-col :xs="8" :sm="4">
									<a-select default-value="-1" style="width: 100%" @change="(newdata)=> setAddon('drive', +newdata)">
										<a-select-option value="-1">{{getCurrentProd.specs.DISK_SIZE}} Gb</a-select-option>
										<a-select-option
											v-for="disk in getAddons[options.drive?'ssd':'hdd']"
											:key="disk.id"
											:value="disk.id"
										>
											{{parseInt(getCurrentProd.specs.DISK_SIZE) + parseInt(disk.value)}} Gb
										</a-select-option>
									</a-select>
								</a-col>
							</a-row>
						</a-skeleton>

						<div class="paas_addons" v-if="!isAddonsLoading">

							<a-row class="newCloud__prop" v-if="getAddons.traffic">
								<a-col span="8" :xs="6">{{$t('traffic') | capitalize}}:</a-col>
								<a-col span="16" :xs="18">
									<a-select default-value="-1" style="width: 100%" @change="(newdata)=> setAddon('traffic', +newdata)">
										<a-select-option value="-1">{{$t('under 3 Gb per month')}}</a-select-option>
										<a-select-option v-for="group in getAddons.traffic" :key="group.id">
											{{group.description.TITLE.replace('Безлимитный, скорость канала не менее', 'Безлимит, от ')}}
											</a-select-option>
									</a-select>
								</a-col>
							</a-row>

							<a-row class="newCloud__prop" v-if="getAddons.panel">
								<a-col span="8" :xs="6">{{$t('panel') | capitalize}}:</a-col>
								<a-col span="16" :xs="18">
									<a-select default-value="-1" style="width: 100%" @change="(newdata)=> setAddon('panel', +newdata)">
										<a-select-option value="-1">{{$t('none')}}</a-select-option>
										<a-select-option v-for="group in getAddons.panel" :key="group.id">{{group.description.TITLE}}</a-select-option>
									</a-select>
								</a-col>
							</a-row>

							<a-row class="newCloud__prop" v-if="getAddons.os">
								<a-col span="8" :xs="6">{{$t('os')}}:</a-col>
								<a-col span="16" :xs="18">
									<a-select :default-value="getAddons.os[0].id" style="width: 100%" @change="(newdata)=> setAddon('os', +newdata)">
										<a-select-option v-for="group in getAddons.os" :key="group.id">{{group.name}}</a-select-option>
									</a-select>
								</a-col>
							</a-row>

							<a-row class="newCloud__prop" v-if="getAddons.backup">
								<a-col span="8" :xs="6">{{$t('backup HDD') | capitalize}}:</a-col>
								<a-col span="16" :xs="18">
									<a-select default-value="-1" style="width: 100%" @change="(newdata)=> setAddon('backup', +newdata)">
										<a-select-option value="-1">0 Gb</a-select-option>
										<a-select-option v-for="group in getAddons.backup" :key="group.id">{{group.description.TITLE}}</a-select-option>
									</a-select>
								</a-col>
							</a-row>

							
						</div>
					</div>
					
					<div class="newCloud__calculate field result">
						<a-skeleton :loading="getCurrentProd==null" :active="true">
						
							

							<a-row type="flex" justify="space-around" style="margin-top: 20px">
								<a-col :xs="10" :sm="6" :lg='12' style="font-size: 1rem">
									{{$t('Pay peroiod')}}:
								</a-col>

								<a-col :xs="12" :sm="18" :lg='12'>
									<a-select v-model="options.period"  style="width: 100%">
										<a-select-option v-for="period in periods" :key="period.title+period.count" :value='period.value'>
											{{period.title == 'year'?'1 ':''}}{{$tc(period.title, period.count)}}
										</a-select-option>
									</a-select>
								</a-col>
							</a-row>

							<a-divider orientation="left" :style="{'margin-bottom': '0'}">
								{{$t('Total')}}:
							</a-divider>

							<a-row type="flex" justify="space-around" :style="{'font-size': '1.5rem'}">
								<transition name="textchange" mode="out-in">
									<a-col :key='getFullPrice'>
										{{getFullPrice}} {{currency}}
									</a-col>
								</transition>
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

									<a-row style="margin-top: 20px">
										<a-col>
											<a-checkbox :checked="modal.goToInvoice" @change="(e) => modal.goToInvoice = e.target.checked"/> {{$t('go to invoice') | capitalize}}
										</a-col>
									</a-row>
								</a-modal>
							</a-col>
						</a-row>

					</div>
				</div>
				<loading v-else></loading>
			</template>
			<div v-else class="newCloud tariff">
				<div class="field field--fluid">
					<div class="tariff__header">
						Choose your tariff
					</div>
					
					<div class="tariff__wrapper">
						<div class="tariff__cards">
							<div class="tariff__items">

								<div class="tariff__item" v-for="tariff in tariffs" :key="tariff" @click="() => {options.isOnCalc = true; options.kind = tariff; options.size = sizes[options.slide]}">
									<div class="tariff__title">
										{{getProducts[sizes[options.slide]][tariff].name}}
									</div>
									<div class="tariff__body">
										<loading v-if="isProductsLoading"/>
										<div v-else>
											<ul>
												<!-- <li class="tariff__property">
													<span class="tariff__body-value">
														{{getProducts[sizes[options.slide]][tariff][0][0].pricing[currency].monthly}} <span class="tariff__currency">{{currency}}</span>
													</span>
												</li> -->
												<!-- <li v-for="(spec, index) in ['cpu_core', 'ram']" :key="index" class="tariff__property">
													<span class="tariff__body-value">
														{{getProducts[sizes[options.slide]][tariff][0][0].props[spec].VALUE}}
													</span>
												</li> -->
											</ul>
										</div>
									</div>
								</div>
							</div>

							<div class="tariff__nav">
								<span class="tariff__nav-item tariff__nav-item_prev" :class="[sliderIsCanPrev ? 'tariff__nav-item_active' : 'tariff__nav-item_disabled']" @click='sliderNavPrev'>
									<a-icon type="left" />
								</span>
								<span class="tariff__nav-item tariff__nav-item_next" :class="[sliderIsCanNext ? 'tariff__nav-item_active' : 'tariff__nav-item_disabled']" @click='sliderNavNext'>
									<a-icon type="right" />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
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

const tariffs = ['standart', 'X2CPU', 'X2RAM'];
const sizes = ['M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

import { mapGetters } from 'vuex'
import loading from '../loading/loading'
export default {
	name: "newPaaS",
	data(){
		return {
			periods,
			sizes,
			tariffs,
			options: {
				kind: 'standart',
				period: 'monthly',
				size: "L",
				isOnCalc: false,
				drive: true, // 1 ssd, 0 hdd
				highCPU: false, // 1 highCPU, 0 basicCPU
				slide: 1,
				addons: {
					drive: -1,
					traffic: -1,
					panel: -1,
					os: -1,
					backup: -1,
				},
				addonsObjects: {
					drive: null,
					traffic: null,
					panel: null,
					os: null,
					backup: null,
				}
			},
			modal: {
				confirmCreate: false,
				confirmLoading: false,
				goToInvoice: true
			}
		}
	},
	components: {
		loading
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
		handleOkOnCreateOrder(){
			const addons = Object.values(this.options.addons).filter( el => el != -1).join(',')
			const orderData = {
				pid: this.getCurrentProd.pid,
				addons,
				billingcycle: this.options.period,
			}
			// console.log(orderData, this.$store.getters.getUser);

			if(!this.$store.getters.getUser){
				this.$store.commit('setOnloginInfo', {
					type: 'VM',
					title: 'Virtual machine',
					cost: this.getFullPrice
				});

				this.$store.dispatch('setOnloginAction', () => {
					this.orderVM(orderData);
				});

				this.$router.push({name: 'login'});

				return;
			} else {
				this.orderVM(orderData)
			}
		},
		orderVM(orderData){
			this.modal.confirmLoading = true;
			const self = this;

			this.$store.dispatch('newPaaS/sendOrder', orderData)
			.then( result => {
				const res = result.data;
				// console.log(res, self);
				if(res.result == "success"){
					self.$message.success(self.$t('Order created successfully.'));
					if(self.modal.goToInvoice){
						self.$router.push(`/invoice-${res.invoiceid}`);
					}
				} else {
					throw result.data
				}
			})
			.catch( err => {
				self.$message.error('Can\'t create order. Try later.');
				console.error(err);
			} )
			.finally( res => {
				self.modal.confirmLoading = false;
			} )
		},
		setAddon(name, value){
			this.options.addons[name] = value;
			let addons = [];
			if(name == 'drive'){
				addons = this.getAddons[this.options.drive?'ssd':'hdd'];
			} else {
				addons = this.getAddons[name]
			}
			const addon = addons.find( el => el.id == value )
			this.options.addonsObjects[name] = addon !== undefined ? addon : null;
		},
		sliderNavNext(){
			if(this.sliderIsCanNext){
				this.options.slide += 1;
			}
		},
		sliderNavPrev(){
			if(this.sliderIsCanPrev){
				this.options.slide -= 1;
			}
		},
	},
	computed: {
		...mapGetters('newPaaS', [
			'getProducts',
			'getAddons',
			'isProductsLoading',
			'isAddonsLoading',
		]),
		...mapGetters('app', ['isMaintananceMode']),
		productSpecs(){
			return this.getCurrentProd.specs
		},
		getCurrentProd(){
			const o = this.options;
			const path =  [o.size, o.kind];
			let current = this.getProducts;
			// console.log(current);
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
		},
		getFullPrice(){
			if (this.isAddonsLoading || this.isProductsLoading) {
				return false
			}
			const VMonly = +this.getCurrentProd.pricing[this.currency][this.options.period];
			const addonsName = [
					"drive",
					"traffic",
					"panel",
					"os",
					"backup",
			];
			const addonsCosts = addonsName.map( name => {
				if(this.options.addonsObjects[name] == null){
					return 0;
				}
				// console.log(this.options.addonsObjects[name], this.options.addonsObjects, name);
				return +this.options.addonsObjects[name].pricing[this.options.period] 
			});
			// console.log('~~~', addonsCosts);
			return [VMonly, ...addonsCosts].reduce( (acc, val) => acc + val ).toFixed(2);
		},
		sliderIsCanNext(){
			return this.options.slide < this.sizes.length - 1;
		},
		sliderIsCanPrev(){
			return this.options.slide > 0;
		},
		currency(){
			return this.$config.currency.code;
		}
	},
	watch: {
		getAddons: function(newVal){
			if(newVal.os){
				this.options.addons.os = +newVal.os[0].id;
			}
		}
	}
}
</script>

<style>

.newCloud__prop{
	margin-bottom: 15px;
}

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

.newCloud__change-tariff{
	color: var(--main);
	cursor: pointer;
}

.field{
	border-radius: 20px;
	box-shadow:
		5px 8px 10px rgba(0, 0, 0, .08),
		0px 0px 12px rgba(0, 0, 0, .05);
	background-color: #fff;
	height: max-content;
}

.field--fluid{
	width: 100%;
	padding: 10px 15px;
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

.tariff__header{
	text-align: center;
	padding: 5px 0;
	font-size: 1.6rem;
}

/* .tariff__wrapper:not(:last-child){ */
.tariff__wrapper{
	margin-top: 20px;
	margin-bottom: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}

.tariff__nav-item{
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	font-size: 3rem;
	color: var(--main);
	opacity: .7;
	--step: -55px;
	cursor: pointer;
	transition:
		opacity .2s ease,
		font-size .2s ease,
		transform .2s ease;
	user-select: none;

}

.tariff__nav-item_active:hover{
	opacity: 1;
	transform: translateY(-50%) scale(1.1);
}

.tariff__nav-item_active:active{
	opacity: 1;
	transform: translateY(-50%) scale(0.8);
}

.tariff__nav-item_prev{
	left: var(--step);
}

.tariff__nav-item_next{
	right: var(--step);
}

.tariff__nav-item_disabled{
	color: rgba(0, 0, 0, .6);
	font-size: 2.5rem;
}

.tariff__cards{
	display: flex;
	position: relative;
}

.tariff__items{
	display: flex;
}

.tariff__sizes{
	display: flex;
	justify-content: space-between;
	/* flex-wrap: wrap; */
	overflow-x: scroll;
}

.tariff-group--title{
	font-size: 1.4rem;
	text-transform: uppercase;
	padding-left: 12px;
}

.tariff__item{
	cursor: pointer;
	width: 200px;
	/* border: 1px solid lightgray; */
	border-radius: 20px;
	overflow: hidden;
	margin-bottom: 15px;
	flex-shrink: 0;
	box-shadow:
		5px 8px 10px rgba(0, 0, 0, .08),
		0px 0px 12px rgba(0, 0, 0, .05);
}

.tariff__item:not(:last-of-type){
	margin-right: 15px;
}

.tariff__title{
	background-color: var(--main);
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 5px;
	font-size: 1.6rem;
}
.tariff__body{
	padding: 5px 12px 15px;
}

.tariff__body ul{
	padding: 0;
	margin: 0;
	list-style-type: none;
}

.tariff__currency{
	font-size: 1rem;
	opacity: .8;
	transition: font .2s ease;
}

.tariff__property:hover .tariff__currency{
	opacity: 9;
	font-size: 1.1rem;
}

.tariff__property{
	margin: 10px 0;
	font-size: 1.3rem;
	text-align: center;
}

.tariff__body-value{
	margin-left: 5px;
}

/* .tariff__order{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px 0;
	border-top: 1px solid lightgray;
	transition: background-color .2s ease;
} */

.tariff__order:hover {
	background-color: rgba(0,0,0,.05);
}

.changing__field{
	font-weight: 600;
}


@media screen and (max-width: 991px) {
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
		padding-bottom: 0;
	}

	/* .newCloud__calculate{
		padding-top: 0;
	} */

	.field{
		box-shadow: none;
		flex-grow: 0;
	}
	.newCloud__calculate{
		border-radius: 0 0 20px 20px;
		width: auto;
	}
}

@media screen and (max-width: 768px) {
	.tariff__items{
		flex-direction: column;
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

.textchange-enter-active,
.textchange-leave-active {
  transition: all .15s ease;
}

.textchange-enter{
  transform: translateY(-0.5em);
  opacity: 0;
}

.textchange-leave-to{
  transform: translateY(0.5em);
  opacity: 0;
}
</style>