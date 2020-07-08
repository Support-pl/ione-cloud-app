<template>
	<div class="settings">
		<div class="container">
			<div class="settings__content">

				<div class="settings__info">
					<div class="settings__user">
						<div class="settings__name">Jacod Willms</div>
						<div class="settings__balance">{{$t('Balance')}}: 109 $</div>
					</div>
					<div class="settings__user-btn">
						<a-icon type="right" />
					</div>
				</div>
				<button class="settings__exit" @click="exit">
					{{$t('Exit')}}
				</button>
				
			</div>
		</div>
		
	</div>
</template>

<script>
export default {
	name: 'settings',
	methods: {
		exit(){
			this.$router.push("login")
		}
	}
}
</script>

<style>
	.settings{
		height: 100%;
	}

	.settings__content{
		padding: 20px 10px 0;
		overflow: auto;

	}

	.settings__info{
		display: flex;
		padding: 0 10px 0 40px
	}

	.settings__user{
		flex: 1 0;
	}

	.settings__user-btn{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 42px;
		height: 42px;
		translate: background-color .2s ease;
		cursor: pointer;
	}

	.settings__user-btn:hover{
		background-color: rgba(0, 0, 0, .1);
	}

	.settings__exit{
		background-color: #ee5854;
		border: none;
		outline: none;
		color: #fff;
		font-weight: 600;
		width: 100%;
		padding: 12px 0;
		border-radius: 12px;
		margin-top: 40px;
		cursor: pointer;
	}

	.settings__exit:hover{
		background-color: #f76964;
	}

	.settings__exit:active{
		background-color: #d8504b;
	}
</style>