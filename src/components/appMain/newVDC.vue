<template>
	<div class="newCloud_wrapper">
		<div class="newCloud">
			<div class="newCloud__inputs newCloud__field">
				<div class="newCloud__field-header">
					Настройки
				</div>

				<div class="newCloud_option">
					<div class="newCloud__option-field">
						<a-divider orientation="left">
							Выберите ОС:
						</a-divider>
						<div class="newCloud__template">
							<div v-for="OS in templatesArray" class="newCloud__template-item" :class="{ active: activeOS==OS.id }" @click='()=> activeOS = OS.id' :key="OS.id">
								<div class="newCloud__template-image">
									<img :src="'https://vcloud.support.by/' + OS.logo" :alt="OS.name">
								</div>
								<div class="newCloud__template-name">{{OS.description.replace(' Template', "")}}</div>
							</div>
						</div>
					</div>

					<div class="newCloud__option-field">

						<a-divider orientation="left">
							CPU + RAM:
						</a-divider>
						<!-- <a-row :gutter="{sm: [0, 10]}"> -->
						<a-row :gutter="[10, 10]">
							<a-col :sm="12" :span="24">
								<a-row>
									<a-col  :sm="8" :span="12">
									<!-- <div style="margin-bottom: 16px"> -->
										RAM: 
									</a-col>
									<a-col  :sm="13" :span="12">
										<a-row>
											<a-col :span="16">
												<a-input-number v-model="options.ram.size" class="max-width" default-value="1" />
											</a-col>
											<a-col :span="8">
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
										
										<!-- <a-select default-value="GB" style="width: 80px">
											<a-select-option value="GB">
												GB
											</a-select-option>
											<a-select-option value="MB">
												MB
											</a-select-option>
										</a-select> -->
									</a-col>
								</a-row>
							</a-col>

							<a-col :sm="12" :span="24">
								<a-row>
									<a-col :sm="8" :span="12">
										CPU: 
									</a-col>
									<a-col :sm="13" :span="12">
										<a-input-number v-model="options.cpu" class="max-width" default-value="1" />
									</a-col>
								</a-row>
							</a-col>

						</a-row>
					</div>

					<div class="newCloud__option-field">
						<a-divider orientation="left">
							Диски:
						</a-divider>
						<a-row :gutter="[10, 10]">
							<a-col :sm="12" :span="24">
								<a-row>
									<a-col  :sm="8" :span="12">
										Диск: 
									</a-col>
									<a-col  :sm="13" :span="12">
										<a-row>
											<a-col :span="8">
												<a-slider v-model="options.disk.size" :min="1" :max="1024" />
											</a-col>
											<a-col :span="8">
												<a-input-number v-model="options.disk.size" class="max-width" default-value="1" />
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
									<a-col :sm="8" :span="12">
										Тип диска: 
									</a-col>
									<a-col :sm="13" :span="12">
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


					<div class="newCloud__option-field">
						<a-divider orientation="left">
							Сеть:
						</a-divider>
						<a-row :gutter="[10, 10]">
							<a-col :sm="12" :span="24">
								<a-row>
									<a-col  :sm="8" :span="12">
										Публичная сеть: 
									</a-col>
									<a-col  :sm="12" :span="12">
										<a-switch @change="switchChanged('public network')"/>
									</a-col>
								</a-row>
							</a-col>

							<a-col :sm="12" :span="24">
								<a-row>
									<a-col :sm="8" :span="12">
										Локальная сеть: 
									</a-col>
									<a-col :sm="12" :span="12">
										<a-switch @change="switchChanged('local network')"/>
									</a-col>
								</a-row>
							</a-col>

						</a-row>
					</div>
				</div>
			</div>
			<div class="newCloud__calculate newCloud__field">
				<div class="newCloud__field-header">
					Результат
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "newVDC",
	data(){
		return {
			activeOS: -1,
			options: {
				cpu: 1,
				ram: {
					size: 1,
					units: "GB"
				},
				disk: {
					size: 1,
					units: "GB",
					type: "SSD"
				},
				network: {
					public: false,
					local: false
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
		switchChanged(name){
			switch (name) {
				case 'local network':
					this.options.network.local = !this.options.network.local;
					break;
				case 'public network':
					this.options.network.public = !this.options.network.public;
					break;
			
				default:
					break;
			}
		}
	},
	computed: {
		templatesArray(){
			const elements = this.$store.getters["newVDC/getTemplates"];
			console.log(elements);
			if(elements.lenght > 0){
				this.activeOS = elements[0].id;
			}
			this.activeOS = 532;
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

	.newCloud__calculate{
		/* flex-grow: 28; */
		width: 28%;
	}

	.newCloud__field{
		border-radius: 20px;
		box-shadow:
			5px 8px 10px rgba(0, 0, 0, .08),
			0px 0px 12px rgba(0, 0, 0, .05);
		padding: 10px 30px;
		background-color: #fff;
	}

	.newCloud__field-header{
		text-align: center;
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 30px;
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
</style>