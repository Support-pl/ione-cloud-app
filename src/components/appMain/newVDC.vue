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
							<div class="newCloud__template-item" :class="{ active: activeOS==OS.id }" @click='()=> activeOS = OS.id' v-for="OS in templatesArray" :key="OS.id">
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
						<div style="margin-bottom: 16px">
							RAM: <a-input-number default-value="1">
								<a-select slot="addonAfter" default-value="GB" style="width: 80px">
									<a-select-option value="GB">
										GB
									</a-select-option>
									<a-select-option value="MB">
										MB
									</a-select-option>
								</a-select>
							</a-input-number>
						</div>
						<div style="margin-bottom: 16px">
							CPU: <a-input-number default-value="1">
								<a-select slot="addonAfter" default-value="GB" style="width: 80px">
									<a-select-option value="GB">
										GB
									</a-select-option>
									<a-select-option value="MB">
										MB
									</a-select-option>
								</a-select>
							</a-input-number>
						</div>
					</div>

					<div class="newCloud__option-field">
						<a-divider orientation="left">
							Диски:
						</a-divider>
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
	},
	computed: {
		templatesArray(){
			const elements = this.$store.getters["newVDC/getTemplates"];
			console.log(elements);
			this.activeOS = elements[0].id;
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
		flex-grow: 72;
	}

	.newCloud__calculate{
		flex-grow: 28;
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
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(max-content, 1fr)); */
    grid-template-columns: repeat(auto-fill, minmax(min-content, 90px));
    grid-auto-rows: min-content;
    grid-gap: 15px;
		justify-content: space-between;
	}

	.newCloud__template-item{
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
		}
		.newCloud__field{
			box-shadow: none;
			flex-grow: 0;
		}
		.newCloud__calculate{
			border-radius: 0 0 20px 20px;
		}
	}
</style>