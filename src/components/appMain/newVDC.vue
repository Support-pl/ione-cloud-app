<template>
	<div class="newCloud_wrapper">
		<div class="newCloud">
			<div class="newCloud__inputs newCloud__field">
				<div class="newCloud__field-header">
					Создание VM
				</div>

				<div class="newCloud_option">
					<a-collapse accordion :style="{'border-radius': '25px'}">
						<a-collapse-panel key="1" header="Выберите ОС:">
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
						<a-collapse-panel key="2" header="CPU + RAM:" :disabled="false">
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
										RAM: 
									</a-col>
									<a-col  :sm="13" :span="14">
										<a-row>
											<a-col :span="14">
												<a-input-number v-model="options.ram.size" class="max-width" min=0 default-value="1" />
											</a-col>
											<a-col :span="10">
												<a-select v-model="options.ram.units" class="max-width" default-value="GB">
													<a-select-option value="GB">
														GB
													</a-select-option>
													<a-select-option value="MB">
														MB
													</a-select-option>
												</a-select>
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
										<a-input-number v-model="options.cpu.count" class="max-width" min=0 default-value="1" />
									</a-col>
								</a-row>
							</a-col>

						</a-row>
					</div>
					</a-collapse-panel>
					<a-collapse-panel key="3" header="Диски:">
					<div class="newCloud__option-field">
						<!-- <a-divider orientation="left">
							Диски:
						</a-divider> -->
						<a-row :gutter="[10, 10]">
							<a-col :sm="12" :span="24">
								<a-row>
									<a-col  :sm="8" :span="10">
										Диск: 
									</a-col>
									<a-col  :sm="13" :span="14">
										<a-row>
											<a-col :span="8">
												<a-slider v-model="options.disk.size" :min="1" :max="1024" />
											</a-col>
											<a-col :span="8">
												<a-input-number v-model="options.disk.size" min="0" class="max-width" default-value="1" />
											</a-col>
											<a-col :span="8">
												<a-select v-model="options.disk.units" class="max-width" default-value="GB">
													<a-select-option value="GB">
														GB
													</a-select-option>
													<a-select-option value="MB">
														MB
													</a-select-option>
												</a-select>
											</a-col>
										</a-row>
									</a-col>
								</a-row>
							</a-col>

							<a-col :sm="12" :span="24">
								<a-row>
									<a-col :sm="8" :span="10">
										Тип диска: 
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

					<a-collapse-panel key="4" header="Сеть:" :style="{'border-radius': '0 0 25px 25px'}">
					<div class="newCloud__option-field">
						<!-- <a-divider orientation="left">
							Сеть:
						</a-divider> -->
						<a-row :gutter="[10, 10]">
							<a-col :sm="12" :span="24">
								<a-row>
									<a-col  :sm="10" :span="12">
										Публичная сеть: 
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
										Локальная сеть: 
									</a-col>
									<a-col :sm="12" :span="12">
										<a-switch v-model="options.network.local.status" />
										<a-input-number v-model="options.network.local.count" :min="1" :max="10" :disabled="!options.network.local.status" :style="{'margin-left': '10px'}"/>
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
					Результат
				</div>
					
				<a-row type="flex" justify="space-around" :style="{'margin-bottom': '15px'}">
					<a-col :span="22">
						<a-select default-value="hour" :value="period" style="width: 100%" @change="changePeriod">
							<a-select-option value="minute">
								Стоимость/Минута
							</a-select-option>
							<a-select-option value="hour">
								Стоимость/Час
							</a-select-option>
							<a-select-option value="day">
								Стоимость/День
							</a-select-option>
							<a-select-option value="month">
								Стоимость/Месяц
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
						Диск {{options.disk.type}}: {{options.disk.size}} {{options.disk.units}}
					</a-col>
					<a-col>
						{{(calculatePrice(options.disk.price[options.disk.type])*options.disk.size).toFixed(3)}}BYN
					</a-col>
				</a-row>

				<transition name="networkApear">
					<a-row v-if="options.network.public.status" type="flex" justify="space-between">
						<a-col>
							Сеть:
						</a-col>
						<a-col>
							{{(calculatePrice(options.network.price)*options.network.public.count).toFixed(3)}}BYN
						</a-col>
					</a-row>
				</transition>
				
				<a-divider orientation="left" :style="{'margin-bottom': '0'}">
					Итого:
				</a-divider>

				<a-row type="flex" justify="space-around" :style="{'font-size': '1.5rem'}">
					<a-col>
						{{calculateFullPrice()}}BYN/{{toShow[period]}}
					</a-col>
				</a-row>

				<a-row type="flex" justify="space-around" style="margin-top: 24px; margin-bottom: 10px">
					<a-col :span="22">
						<a-button type="primary" block shape="round" @click="createVDC">
							Создать
						</a-button>
					</a-col>
				</a-row>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "newVDC",
	data(){
		return {
			period: "hour",
			toShow: {
				minute: "мин.",
				hour: "час",
				day: "день",
				month: "мес."
			},
			options: {
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
					size: 1,
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
						status: false,
						count: 1
					},
					local: {
						status: false,
						count: 1
					},
					price: 9
				}
			}
		}
	},
	mounted(){
		this.$store.dispatch("newVDC/fetchTemplates");
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
			switch (this.period) {
				case "minute":
					price = price / 60;
				case "hour":
					price = price / 24;
				case "day":
					price = price / 30;
				case "month":
					price = price;
					break
				default:
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
			console.log(this.options)
		}
	},
	computed: {
		templatesArray(){
			const elements = this.$store.getters["newVDC/getTemplates"];
			return elements;
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