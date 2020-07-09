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

				<div class="settings__item" @click="changeLanguage()">
					<div class="settings__logo">
						<a-icon type="global" />
					</div>
					<div class="settings__title">
						{{$t('Language')}}
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
		},
		changeLanguage(){
			// console.log("time to change lang", this.$i18n)
			this.$i18n.locale = this.$i18n.locale == "ru"? "en" : "ru";
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
		padding: 0 10px 0 40px;
		margin-bottom: 20px;
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

	.settings__item{
		display: flex;
		position: relative;
		font-size: 1rem;
		padding: 16px 0;
		border-top: 1px solid rgba(0, 0, 0, .1);
		cursor: pointer;
		transition: background-color .2s ease;
	}

	.settings__item:hover{
		background-color: rgba(0,0,0,.1);
	}

	.settings__item:last-of-type{
		border-bottom: 1px solid rgba(0, 0, 0, .1);
	}

	.settings__logo{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 20px;
		font-size: 1.4rem;
	}

	.settings__title{
		padding-left: 60px;
	}
</style>