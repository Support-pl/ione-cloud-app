<template>
	<div class="newCloud_wrapper">
		<div class="newCloud">
			<div class="newCloud__inputs newCloud__field">
				<div class="newCloud__field-header">
					{{$t('VM create')}}
				</div>

				<div class="newCloud_option">
					<a-collapse accordion :style="{'border-radius': '25px'}" @change="collapseChange">
						<a-collapse-panel key="OS" header="Выберите ОС:">
					<div class="newCloud__option-field">
						<!-- <a-divider orientation="left">
							Выберите ОС:
						</a-divider> -->
						<div class="newCloud__template">
							<div v-for="OS in templatesArray" class="newCloud__template-item" :class="{ active: options.os.id==OS.id }" @click='setOS(OS.id)' :key="OS.id">
								<div class="newCloud__template-image">
									<img :src="'https://vcloud.support.by/' + OS.logo" :alt="OS.name">
								</div>
								<div class="newCloud__template-name">{{OS.description.replace(' Template', "")}}</div>
							</div>
						</div>
					</div>
						</a-collapse-panel>
						<a-collapse-panel key="CPURAM" header="CPU + RAM:" :disabled="false">
					<div class="newCloud__option-field">

						<!-- <a-divider orientation="left">
							CPU + RAM:
						</a-divider> -->
						<!-- <a-row :gutter="{sm: [0, 10]}"> -->
						<a-row :gutter="[10, 10]">
							<a-col :sm="12" :span="24">
								<a-row>
									<a-col  :sm="8" :span="10">
									<!-- <div style="margin-bottom: 16px"> -->
										RAM (GB): 
									</a-col>
									<a-col  :sm="13" :span="14">
										<a-row>
											<a-col :span="24">
												<a-input-number v-model="options.ram.size" class="max-width" :min="0" default-value="1" />
											</a-col>
										</a-row>
									</a-col>
								</a-row>
							</a-col>

							<a-col :sm="12" :span="24">
								<a-row>
									<a-col :sm="8" :span="10">
										CPU: 
									</a-col>
									<a-col :sm="13" :span="14">
										<a-input-number v-model="options.cpu.count" class="max-width" :min='0' default-value="1" />
									</a-col>
								</a-row>
							</a-col>

						</a-row>
					</div>
					</a-collapse-panel>
					<a-collapse-panel key="drive" header="Диски:">
					<div class="newCloud__option-field">
						<!-- <a-divider orientation="left">
							Диски:
						</a-divider> -->
						<a-row :gutter="[10, 10]">
							<a-col :sm="12" :span="24">
								<a-row>
									<a-col  :sm="8" :span="10">
										{{$t('Drive')}}: 
									</a-col>
									<a-col  :sm="13" :span="14">
										<a-row type="flex" justify="space-between">
											<!-- <a-col :span="12"> -->
											<a-col :span="3">
												<a-icon type="minus" class="slider_btn" @click="changeValue('disksize', -10)"></a-icon>
											</a-col>
											<a-col :span="18">
												<a-slider v-model="options.disk.size" :min="10" :max="1020" :tooltip-visible="collapseKey == 'drive'" :step="10" />
											</a-col>
											<a-col :span="3">
												<a-icon type="plus" class="slider_btn" @click="changeValue('disksize', 10)"></a-icon>
											</a-col>
											<!-- <a-col :span="12">
												<a-input-number v-model="options.disk.size" :min="0" class="max-width" default-value="1" />
											</a-col> -->
										</a-row>
									</a-col>
								</a-row>
							</a-col>

							<a-col :sm="12" :span="24">
								<a-row>
									<a-col :sm="8" :span="10">
										{{$t('Drive type')}}: 
									</a-col>
									<a-col :sm="13" :span="14">
										<a-select v-model="options.disk.type" class="max-width" default-value="SSD">
											<a-select-option value="SSD">
												SSD
											</a-select-option>
											<a-select-option value="HDD">
												HDD
											</a-select-option>
										</a-select>
									</a-col>
								</a-row>
							</a-col>

						</a-row>
					</div>
					</a-collapse-panel>

					<a-collapse-panel key="network" header="Сеть:" :style="{'border-radius': '0 0 25px 25px'}">
					<div class="newCloud__option-field">
						<!-- <a-divider orientation="left">
							Сеть:
						</a-divider> -->
						<a-row :gutter="[10, 10]">
							<a-col :sm="12" :span="24">
								<a-row>
									<a-col  :sm="10" :span="12">
										{{$t("Public network")}}:
									</a-col>
									<a-col  :sm="12" :span="12">
										<a-switch v-model="options.network.public.status"/>
										<a-input-number v-model="options.network.public.count" :min="1" :max="10" :disabled="!options.network.public.status" :style="{'margin-left': '10px'}"/>
									</a-col>
								</a-row>
							</a-col>

							<a-col :sm="12" :span="24">
								<a-row>
									<a-col :sm="10" :span="12">
										{{$t("Local network")}}:
									</a-col>
									<a-col :sm="12" :span="12">
										<a-switch v-model="options.network.local.status" />
										<a-input-number v-model="options.network.local.count" :min="0" :max="10" :disabled="!options.network.local.status" :style="{'margin-left': '10px'}"/>
									</a-col>
								</a-row>
							</a-col>

						</a-row>
					</div>
					</a-collapse-panel>
					</a-collapse>
				</div>
			</div>
			
			<div class="newCloud__calculate newCloud__field">
				<div class="newCloud__field-header">
					{{$t("Result")}}
				</div>
					
				<a-row type="flex" justify="space-around" :style="{'margin-bottom': '15px'}">
					<a-col :span="22">
						<a-select default-value="hour" :disabled="options.tarification" :value="periodToShow" style="width: 100%" @change="changePeriod">
							<!-- <a-select-option value="minute">
								Стоимость/Минута
							</a-select-option> -->
							<a-select-option value="hour">
								{{$t("Cost")}}/{{$t("hour")}}
							</a-select-option>
							<a-select-option value="day">
								{{$t("Cost")}}/{{$t("day")}}
							</a-select-option>
							<a-select-option value="week">
								{{$t("Cost")}}/{{$t("week")}}
							</a-select-option>
							<a-select-option value="month">
								{{$t("Cost")}}/{{$t("month")}}
							</a-select-option>
						</a-select>
					</a-col>
				</a-row>
					
				<a-row type="flex" justify="space-between">
					<a-col>
						CPU: {{options.cpu.count}}
					</a-col>
					<a-col>
						{{(calculatePrice(options.cpu.price)*options.cpu.count).toFixed(3)}}BYN
					</a-col>
				</a-row>

				<a-row type="flex" justify="space-between">
					<a-col>
						RAM: {{options.ram.size}} {{options.ram.units}}
					</a-col>
					<a-col>
						{{(calculatePrice(options.ram.price)*options.ram.size).toFixed(3)}}BYN
					</a-col>
				</a-row>

				<a-row type="flex" justify="space-between">
					<a-col>
						{{$t('Drive')}} {{options.disk.type}}: {{options.disk.size}} {{options.disk.units}}
					</a-col>
					<a-col>
						{{(calculatePrice(options.disk.price[options.disk.type])*options.disk.size).toFixed(3)}}BYN
					</a-col>
				</a-row>

				<transition name="networkApear">
					<a-row v-if="options.network.public.status" type="flex" justify="space-between">
						<a-col>
							{{$t("Network")}}:
						</a-col>
						<a-col>
							{{(calculatePrice(options.network.price)*options.network.public.count).toFixed(3)}}BYN
						</a-col>
					</a-row>
				</transition>
				
				<a-divider orientation="left" :style="{'margin-bottom': '0'}">
					{{$t('Total')}}:
				</a-divider>

				<a-row type="flex" justify="space-around" :style="{'font-size': '1.5rem'}">
					<a-col>
						<a-tooltip :get-popup-container="getPopupContainer" style="cursor: help">
							<template slot="title">
								{{$t('Actual price may vary')}}
							</template>
							~{{calculateFullPrice()}}BYN/{{toShow[periodToShow]}}
						</a-tooltip>
					</a-col>
				</a-row>
				
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
						<a-switch v-model="options.tarification"></a-switch>
					</a-col>
				</a-row>


				<!-- <a-row type="flex" justify="space-around" style="margin-top: 24px; margin-bottom: 10px">
					<a-col>
						<p>Ежемесячная оплата</p>
						<p>
							<a-switch default-checked />
						</p>
					</a-col>
				</a-row> -->

				<a-row type="flex" justify="space-around" style="margin-top: 24px; margin-bottom: 10px">
					<a-col :span="22">
						<a-button type="primary" block shape="round" @click="createVDC">
							{{$t("Create")}}
						</a-button>
						<a-modal
							:title="$t('Confirm')"
							:visible="modal.confirmCreate"
							:confirm-loading="modal.confirmLoading"
							:cancel-text="$t('Cancel')"
							@ok="handleOk"
							@cancel="handleCancel"
						>
							<p>
								{{$t("Enter VM name")}}:
								<a-input v-model="options.vmname" />
							</p>
							<p>
								{{$t("Enter OS password")}}:
								<a-input-password v-model="options.password" />
							</p>
						</a-modal>
					</a-col>
				</a-row>

			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import md5 from 'md5'
export default {
	name: "newVDC",
	data(){
		return {
			collapseKey: "",
			period: "hour",
			toShow: {
				minute: "мин.",
				hour: "час",
				day: "день",
				week: "неделя",
				month: "мес."
			},
			modal: {
				confirmCreate: false,
				confirmLoading: false
			},
			options: {
				tarification: false,
				vmname: '',
				password: '',
				os: {
					id: 532,
					name: "CentOS 7",
				},
				cpu: {
					count: 1,
					price: 11.5
				},
				ram: {
					size: 1,
					units: "GB",
					price: 10
				},
				disk: {
					size: 10,
					units: "GB",
					type: "SSD",
					price: {
						HDD: 0.2,
						SSD: 0.6
					},
					backupPrice: 0.15
				},
				network: {
					public: {
						status: true,
						count: 1
					},
					local: {
						status: false,
						count: 0
					},
					price: 9
				}
			}
		}
	},
	mounted(){
		this.$store.dispatch("newVDC/fetchTemplates");
		
		const user = this.$store.getters.getUser;
		let userinfo = {
			clientid: user.id,
			secret: md5('createVDC' + user.id + user.secret)
		}
		this.$axios.get("createVDC.php?" + this.URLparameter(userinfo) );

		userinfo = {
			userid: user.id,
			secret: md5('getBalance' + user.id + user.secret)
		}
		this.$axios.get("getBalance.php?" + this.URLparameter(userinfo))
			.then( res => {
				if(user.id == res.data.userid){
					this.$store.dispatch("updateBalance", res.data.balance);
				}
			})
			.catch( err => console.error(err));
	},
	methods: {
		onSlideChange(){
			console.log("change");
		},
		onSwiper(){
			console.log("swiper");
		},
		setOS(id){
			this.options.os.id = id;
			this.options.os.name = this.templatesArray.find( el=>el.id==id ).description.replace(' Template', "");
		},
		changePeriod(value){
			this.period = value;
		},
		calculatePrice(price){
			if(this.options.tarification){
				return price * 0.85;	
			}
			switch (this.period) {
				case "minute":
					price = price / 60;
				case "hour":
					price = price / 24;
				case "day":
					price = price / 30;
				case "month":
					break
				case "week":
					price = price / 30 * 7;
					break
				default:
					console.error("[VDC Calculator]: Wrong price in calc.");
					return undefined
					break;
			}
			return price;
		},
		calculateFullPrice(){
			let parts = [
				this.options.cpu.price*this.options.cpu.count,
				this.options.ram.price*this.options.ram.size,
				this.options.disk.price[this.options.disk.type] * this.options.disk.size
				]
			return this.calculatePrice( parts.reduce( (a,b)=>a+b ) ).toFixed(3);
		},
		createVDC(){
			this.modal.confirmCreate = true;
		},
		handleOk(){
			if(this.options.password.length < 6) {
				this.$message.error(this.$t("Password is too short"));
				return 0
			}
			this.modal.confirmLoading = true;
			this.send()
				.then( responce => {
					console.log(responce.data)
					this.$message.success(this.$t('VDC created successfully with') +' id = ' + responce.data.id);
					this.options.password = '';
					this.modal.confirmCreate = false;
					this.modal.confirmLoading = false;
					this.$store.dispatch("app/setTabByName", "cloud");
				})
				.catch( err => {
					console.error(err)
					this.$message.error(this.$t("Unknown error."));
				});

		},
		handleCancel(){
			this.modal.confirmCreate = false;
		},
		getPopupContainer(trigger) {
			const elem = trigger.parentElement.parentElement.parentElement;
      return elem;
		},
		send(){
			const user = this.$store.getters.getUser;
			const userinfo = {
				userid: user.id,
				secret: md5('createVM' + user.id + user.secret)
			}
			const vmOptions = {
				'publicIPs': this.options.network.public.count,
				'cpu': this.options.cpu.count,
				'drivesize': this.options.disk.size,
				'drive': this.options.disk.type,
				'driveunits': this.options.disk.units,
				'memory': this.options.ram.size,
				'memoryunits': this.options.ram.units,
				'templateid': this.options.os.id,
				'vmname': this.options.vmname,
				'password': this.options.password
			}
			if(this.options.network.local.status){
				vmOptions['localIPs'] = this.options.network.local.count;
			}
			console.log(vmOptions);
			return this.$axios.get("createVM.php?" + this.URLparameter(vmOptions) + "&" + this.URLparameter(userinfo) );
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
		collapseChange(key){
			this.collapseKey = key;
		},
		changeValue(variable, val){
			if(variable == 'disksize'){
				this.options.disk.size += val;
			}
		}
	},
	computed: {
		templatesArray(){
			const elements = this.$store.getters["newVDC/getTemplates"];
			return elements;
		},
		periodToShow(){
			if(this.options.tarification){
				return 'month';
			} else {
				return this.period
			}
		}
	}
}
</script>

<style>
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
		/* background: green; */
		margin-right: 20px;
		/* flex-grow: 72; */
		width: 72%;
	}

	.newCloud__field{
		border-radius: 20px;
		box-shadow:
			5px 8px 10px rgba(0, 0, 0, .08),
			0px 0px 12px rgba(0, 0, 0, .05);
		padding: 10px 5px 5px;
		background-color: #fff;
    height: max-content;
	}

	.newCloud__calculate{
		/* flex-grow: 28; */
		width: 28%;
		font-size: 1.1rem;
		padding: 10px 15px 10px;
	}

	.newCloud__field-header{
		text-align: center;
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.newCloud__template{
    /* display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min-content, 90px));
    grid-auto-rows: min-content;
    grid-gap: 15px;
		justify-content: space-between; */
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.newCloud__template-item{
		width: 116px;
		margin-right: 10px;
		margin-bottom: 10px;
		background-color: #fff;
		/* padding: 10px; */
		box-shadow:
			3px 2px 6px rgba(0, 0, 0, .08),
			0px 0px 8px rgba(0, 0, 0, .05);
		border-radius: 15px;
		transition: box-shadow .2s ease, transform .2s ease;
		cursor: pointer;
		text-align: center;
		overflow: hidden;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: max-content auto;
	}

	.newCloud__template-item:hover{
		box-shadow:
			5px 8px 10px rgba(0, 0, 0, .08),
			0px 0px 12px rgba(0, 0, 0, .05);
		/* transform: scale(1.02); */
	}

	.newCloud__template-item.active{
		box-shadow:
			5px 8px 12px rgba(0, 0, 0, .08),
			0px 0px 13px rgba(0, 0, 0, .05);
		transform: scale(1.02);
	}

	.newCloud__template-image{
		padding: 10px;
	}

	.newCloud__template-name{
		padding: 10px;
	}

	.newCloud__template-item.active .newCloud__template-name{
		background-color: #427cf7;
		color: #fff;
	}

	.max-width{
		width: 100%;
	}

	.ant-collapse-item:last-of-type .ant-collapse-content{
		border-radius: 0 0 28px 28px;
	}

	.slider_btn{
		cursor: pointer;
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
		.newCloud__template-image{
			width: 50px;
			height: 50px;
			padding: 4px;
		}
		.newCloud__template-image img{
			object-fit: contain;
			width: 100%;
			height: 100%;
		}
		.newCloud__template-name{
			text-align: left;
			line-height: 30px;
		}
	}

	.networkApear-enter-active, .networkApear-leave-active {
		transition: opacity .5s, height .5s;
		height: 26px;
	}
	.networkApear-enter, .networkApear-leave-to /* .fade-leave-active до версии 2.1.8 */ {
		opacity: 0;
		height: 0;
	}
</style>