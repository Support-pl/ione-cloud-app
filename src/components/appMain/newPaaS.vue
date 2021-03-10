<template>
	<div class="newCloud_wrapper">
		<div v-if="true" class="newCloud">
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
				</div>
			</div>
			
			<div class="newCloud__calculate newCloud__field">
					
				<a-row type="flex" justify="space-between">
					<a-col>
						CPU:
					</a-col>
					<a-col>
					</a-col>
				</a-row>

				<a-row type="flex" justify="space-between">
					<a-col>
						RAM:
					</a-col>
					<a-col>
					</a-col>
				</a-row>

				<a-row type="flex" justify="space-between">
					<a-col>
						{{$t('Drive')}}:
					</a-col>
					<a-col>
					</a-col>
				</a-row>
				
				<a-divider orientation="left" :style="{'margin-bottom': '0'}">
					{{$t('Total')}}:
				</a-divider>

				<a-row type="flex" justify="space-around" :style="{'font-size': '1.5rem'}">
					<a-col>
						<a-tooltip :get-popup-container="getPopupContainer" style="cursor: help">
							<template slot="title">
								{{$t('Actual price may vary')}}
							</template>
						</a-tooltip>
					</a-col>
				</a-row>

				<transition name="networkApear">
					<!-- <a-row v-if="options.network.public.status" type="flex" justify="space-around" :style="{'font-size': '1.2rem'}"> -->
						<a-col>
						</a-col>
					<!-- </a-row> -->
				</transition>
				
				<!-- <template v-if="false"> -->
					<a-divider orientation="left" :style="{'margin-bottom': '0'}">
						{{$t('Tarification')}}:
					</a-divider>

					<a-row type="flex" justify="space-around" :style="{'font-size': '.95rem', 'margin-bottom': '10px'}">
						<a-col>
							<div style="text-align: center">
								{{$t('When paying per month - save up to 15%')}}
							</div>
						</a-col>
					</a-row>
					
					<a-row type="flex" justify="space-around">
						<a-col>
							{{$t('Monthly payment')}}
						</a-col>
						<a-col>
							<!-- <a-switch v-model="options.tarification" :disabled="options.rate.id != 0"></a-switch> -->
						</a-col>
					</a-row>
				<!-- </template> -->

				<a-row type="flex" justify="space-around" style="margin-top: 24px; margin-bottom: 10px">
					<a-col :span="22">
						<a-button type="primary" block shape="round" @click="createVDC">
							{{$t("Create")}}
						</a-button>
						<a-modal
							v-if="false" 
							:title="$t('Confirm')"
							:visible="modal.confirmCreate"
							:confirm-loading="modal.confirmLoading"
							:cancel-text="$t('Cancel')"
							@ok="handleOk"
							@cancel="handleCancel"
						>
							<p>
								{{$t("Enter VM name")}}:
								<!-- <a-input v-model="options.vmname" /> -->
							</p>
							<p>
								{{$t("Enter OS password")}}:
								<!-- <a-input-password v-model="options.password" /> -->
							</p>
						</a-modal>
					</a-col>
				</a-row>

			</div>
		</div>
		<div v-else class="test">kek</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import md5 from 'md5'
import config from '../../appconfig'
export default {
	name: "newPaaS",
	data(){
		return {
			periods: [
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
			],
			options: {
				period: 'monthly',
			}
		}
	},
	mounted(){
		// console.log(this.user);
		this.$store.dispatch('newPaaS/fetchProductsAuto');
		// this.$store.dispatch("newVDC/fetchTemplates");
		// this.$store.dispatch("newVDC/fetchRates");
		
		// const user = this.user;
		// let userinfo = {
		// 	userid: user.id,
		// 	secret: md5('createVDC' + user.id + user.secret)
		// }
		// this.$axios.get("createVDC.php?" + this.URLparameter(userinfo) );
		// this.$axios.get("getSettings.php?filter=cost,disktypes" )
		// 	.then( res => {
		// 		// console.log(res);
		// 		// this.options.cpu.price = res.data.CAPACITY_COST.CPU_COST * 30 * 3600 * 24
		// 		// this.options.ram.price = res.data.CAPACITY_COST.MEMORY_COST * 30 * 3600 * 24
		// 		// this.options.disk.price.HDD = res.data.DISK_COSTS.HDD * 30 * 3600 * 24
		// 		// this.options.disk.price.SSD = res.data.DISK_COSTS.SSD * 30 * 3600 * 24
		// 		// this.options.network.price = res.data.PUBLIC_IP_COST;
		// 		this.diskTypes = res.data.DISK_TYPES.split(',');
		// 		// this.options.disk.type = this.diskTypes[0];
		// 		this.pricesLoaded = true;
		// 	})
		// 	.catch( err => {
		// 		console.error(err);
		// 		this.$message.error("Can't load prices. Show saved ones.");
		// 	} )

		// userinfo = {
		// 	userid: user.id,
		// 	secret: md5('getBalance' + user.id + user.secret)
		// }
		// this.$axios.get("getBalance.php?" + this.URLparameter(userinfo))
		// 	.then( res => {
		// 		if(user.id == res.data.userid){
		// 			this.$store.dispatch("updateBalance", res.data.balance);
		// 		}
		// 	})
		// 	.catch( err => console.error(err));
	},
	methods: {
		// setOS(id){
		// 	this.options.os.id = id;
		// 	this.options.os.name = this.templatesArray.find( el=>el.id==id ).description;
		// 	if(this.options.rate.id == 0){
		// 		this.collapseKey = "CPURAM"
		// 	} else {
		// 		this.collapseKey = "drive"
		// 	}
		// },
		// setRate(id){
		// 	this.options.rate.id = id;
		// 	this.savedRateId = id;
		// 	if(id != 0){
		// 		const rate = this.ratesArray.find( el=>el.pid==id );
		// 		this.options.rate.name = rate.name;
		// 		let props = rate.description.properties;
		// 		props.forEach(el => {
		// 			let val = el.VALUE.match(/\d+/);
		// 			if(el.GROUP == "hdd"){
		// 				this.options.disk.type = el.GROUP.toUpperCase();
		// 				this.options.disk.size = parseInt(val[0], 10);
		// 			}
		// 			if(el.GROUP == "ssd"){
		// 				this.options.disk.type = el.GROUP.toUpperCase();
		// 				this.options.disk.size = parseInt(val[0], 10);
		// 			}
		// 			if(el.GROUP == "cpu_core"){
		// 				this.options.cpu.count = parseInt(val[0], 10);
		// 			}
		// 			if(el.GROUP == "ram"){
		// 				this.options.ram.size = parseInt(val[0], 10);
		// 			}
		// 		});
		// 	} else 
		// 		this.options.rate.name = "Custom";
		// 	this.collapseKey = "OS";
		// },
		// changePeriod(value){
		// 	this.period = value;
		// },
		// calculatePrice(price, period = this.period){
		// 	if(this.options.tarification){
		// 		return price;	
		// 	}
		// 	switch (period) {
		// 		case "minute":
		// 			price = price / 60;
		// 		case "hour":
		// 			price = price / 24;
		// 		case "day":
		// 			price = price / 30;
		// 		case "month":
		// 			break
		// 		case "week":
		// 			price = price / 30 * 7;
		// 			break
		// 		default:
		// 			console.error("[VDC Calculator]: Wrong price in calc.");
		// 			return undefined
		// 			break;
		// 	}
		// 	return price;
		// },
		// calculateFullPrice(){
		// 	if(this.options.rate.id != 0){
		// 		const user = this.user;
		// 		this.options.tarification = true;
		// 		return this.ratesArray.find(el => el.pid == this.options.rate.id).pricingmonth[user.currency_code || 'BYN'];
		// 	} //выключил
		// 	let parts = [
		// 		this.options.cpu.price*this.options.cpu.count,
		// 		this.options.ram.price*this.options.ram.size,
		// 		this.options.disk.price[this.options.disk.type] * this.options.disk.size,
		// 		// this.options.network.price * this.options.network.public.count
		// 		]
		// 	return this.calculatePrice( parts.reduce( (a,b)=>a+b ) ).toFixed(2);
		// },
		// createVDC(){
		// 	const user = this.user;
		// 	let parts = [
		// 		this.options.cpu.price*this.options.cpu.count,
		// 		this.options.ram.price*this.options.ram.size,
		// 		this.options.disk.price[this.options.disk.type] * this.options.disk.size
		// 		]
		// 	let price = this.calculatePrice( parts.reduce( (a,b)=>a+b ), 'day' ).toFixed(3);
		// 	if(+price > +user.balance){
		// 		this.$message.error('You don\'t have enough money for a day of use');
		// 		return;
		// 	}
		// 	if(!~this.options.os.id){
		// 		this.$message.error(this.$t("select OS"));
		// 		this.collapseKey = "OS";
		// 		return;
		// 	}
		// 	if(!this.custom && this.options.rate.id == 0){
		// 		this.$message.error(this.$t("select tariff"));
		// 	} else {
		// 		this.modal.confirmCreate = true;
		// 	}
		// },
		// diskChange(){
		// 	if([
		// 		this.options.disk.min.SSD,
		// 		this.options.disk.min.HDD
		// 	].includes(this.options.disk.size)){
		// 		this.options.disk.size = this.options.disk.min[this.options.disk.type];
		// 	}
		// },
		// handleOk(){
		// 	if(this.options.password.length < 6) {
		// 		this.$message.error(this.$t("Password is too short"));
		// 		return 0
		// 	}
		// 	this.modal.confirmLoading = true;
		// 	this.send()
		// 		.then( responce => {
		// 			if(responce.data.result == 'error'){
		// 				this.$message.error(responce.data.message);
		// 			} else {
		// 				this.$message.success(this.$t('VDC created successfully with') +' id = ' + responce.data.id);
		// 				this.$store.dispatch("app/setTabByName", "cloud");
		// 			}
		// 			this.options.password = '';
		// 			this.modal.confirmCreate = false;
		// 			this.modal.confirmLoading = false;
		// 		})
		// 		.catch( err => {
		// 			console.error(err)
		// 			this.$message.error(this.$t("Unknown error."));
		// 		});

		// },
		// handleCancel(){
		// 	this.modal.confirmCreate = false;
		// },
		getPopupContainer(trigger) {
			const elem = trigger.parentElement.parentElement.parentElement;
      return elem;
		},
		// send(){
		// 	const user = this.user;
		// 	const userinfo = {
		// 		userid: user.id,
		// 		secret: md5('createVM' + user.id + user.secret)
		// 	}
		// 	let savedPeriod = this.period;
		// 	this.period = 'month';
		// 	const price = this.calculateFullPrice();
		// 	this.period = savedPeriod;
		// 	const vmOptions = {
		// 		'publicIPs': this.options.network.public.count,
		// 		'cpu': this.options.cpu.count,
		// 		'drivesize': this.options.disk.size,
		// 		'drive': this.options.disk.type,
		// 		'driveunits': this.options.disk.units,
		// 		'memory': this.options.ram.size,
		// 		'memoryunits': this.options.ram.units,
		// 		'templateid': this.options.os.id,
		// 		'vmname': this.options.vmname,
		// 		'password': this.options.password,
		// 		'calculatedPrice': price
		// 	}
		// 	if(this.options.network.local.status){
		// 		vmOptions['localIPs'] = this.options.network.local.count;
		// 	}
		// 	return this.$axios.get("createVM.php?" + this.URLparameter(vmOptions) + "&" + this.URLparameter(userinfo) );
		// },
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
		// collapseChange(key){
		// 	this.collapseKey = key;
		// },
		// changeValue(variable, val){
		// 	if(variable == 'disksize'
		// 		&& this.options.disk.size + val <= this.options.disk.max[this.options.disk.type]
		// 		&& this.options.disk.size + val >= this.options.disk.min[this.options.disk.type])
		// 	{
		// 		this.options.disk.size += val;
		// 	}
		// 	if(variable == 'ramsize'
		// 		&& this.options.ram.size + val <= this.options.ram.max
		// 		&& this.options.ram.size + val >= this.options.ram.min)
		// 	{
		// 		this.options.ram.size += val;
		// 	}
		// 	if(variable == 'cpucount'
		// 		&& this.options.cpu.count + val <= this.options.cpu.max
		// 		&& this.options.cpu.count + val >= this.options.cpu.min)
		// 	{
		// 		this.options.cpu.count += val;
		// 	}
		// },
		// closeAllTabs(val){
		// 	if(val){
		// 		this.options.rate.id = 0
		// 	} else {
		// 		this.options.rate.id = this.savedRateId;
		// 	}
		// 	this.collapseKey = '';
		// }
	},
	computed: {
		templatesArray(){
			const elements = this.$store.getters["newVDC/getTemplates"];
			return elements;
		},
		ratesArray(){
			const elements = this.$store.getters["newVDC/getRates"];
			return elements;
		},
		// periodToShow(){
		// 	if(this.options.tarification){
		// 		return 'month';
		// 	} else {
		// 		return this.period
		// 	}
		// },
		// disableNotCustom(){
		// 	return this.options.rate.id != 0;
		// },
		user(){
			const user = this.$store.getters.getUser;
			return user;
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