<template>
	<div class="newCloud">
		<div class="newCloud__inputs newCloud__field">
			<div class="newCloud__field-header">
				Настройки
			</div>

			<div class="punkts">
				Здесь будут пункты настроек
			</div>
		</div>
		<div class="newCloud__calculate newCloud__field">
			<div class="newCloud__field-header">
				Результат
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "newVDC"
}
</script>

<style>
	.newCloud{
		margin-top: 15px;
		margin-bottom: 15px;
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
		padding: 10px;
		background-color: #fff;
	}

	.newCloud__field-header{
		text-align: center;
		font-size: 1.2rem;
		font-weight: bold;
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