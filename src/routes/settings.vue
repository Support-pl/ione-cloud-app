<template>
	<div class="settings">
		<div class="container">
			<div class="settings__content">

				<div class="settings__info">
					<div class="settings__user">
						<div class="settings__name">{{user.firstname}} {{user.lastname}}</div>
						<div class="settings__balance">{{$t('Balance')}}: <balance style="display: inline-block" :clickable="false"/></div>
					</div>
					<div class="settings__user-btn" v-if="user_btn">
						<a-icon type="right" />
					</div>
				</div>

				<div class="settings__item" @click="GoToPersonalArea()">
					<div class="settings__logo">
						<a-icon type="user" />
					</div>
					<div class="settings__title">
						{{$t('Personal Area')}}
					</div>
				</div>

				<div class="settings__item" @click="changeLanguage()">
					<div class="settings__logo">
						<a-icon type="global" />
					</div>
					<div class="settings__title">
						{{$t('Language')}}
					</div>

					<a-modal
						:title="$t('Language')"
						:visible="modal.language"
						:footer="false"
						@cancel="closeModal('language')"
					>
						<div v-for="lang in langs" :key='lang' @click="changeLocale(lang)" class="singleLang">
							<span class="singleLang__title">
								{{$t('localeLang', lang)}}
							</span>
							<span v-if="$i18n.locale == lang" class='singleLang__current-marker'></span>
						</div>
					</a-modal>
				</div>

				<div class="settings__item" @click="showModal('addFunds')">
					<div class="settings__logo">
						<a-icon type="dollar" />
					</div>
					<div class="settings__title">
						{{$t('Add Funds')}}
					</div>
					<add-funds :modalVisible="modal.addFunds" :hideModal="hideFunds"/>
				</div>
				<button class="settings__exit" @click="logoutFunc()">
					{{$t('Exit')}}
				</button>
			</div>
		</div>
		
	</div>
</template>

<script>
import balance from "../components/balance/balance.vue";
import addFunds from "../components/balance/addFunds.vue";
import config from "../appconfig";
import md5 from 'md5';

export default {
	name: 'settings',
  data() {
    return {
			confirmLoading: false,
			user_btn: false,
			modal: {
				language: false,
				addFunds: false
			},
			config
    };
	},
	components: {
		balance,
		addFunds
	},
	methods: {
		exit(){
			this.$router.push("login")
		},
		showModal(name){
			this.modal[name] = true;
		},
		closeModal(name){
			this.modal[name] = false;
		},
		hideFunds(){
			this.closeModal('addFunds')
		},
		changeLanguage(){
			this.showModal('language')
		},
		changeLocale(lang){
			this.closeModal('language');
			this.$i18n.locale = lang;
			localStorage.setItem("lang", this.$i18n.locale);
		},
		logoutFunc(){
			this.$router.push({name: 'login'})
			this.$store.commit('logout')
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
		addAmount(amount){
			if(this.amount == "") this.amount = 0
			this.amount += amount;
		},
		GoToPersonalArea(){
			const close_your_eyes = md5('openWHMCSclientDetails'+this.user.id+this.user.secret);
			window.open(config.WHMCSsiteurl + config.appFolder + `/openWHMCSclientDetails.php?userid=${this.user.id}&secret=${close_your_eyes}`);
		}
	},
	computed: {
		user(){
			return this.$store.getters.getUser;
		},
		langs(){
			return this.config.languages;
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
		/* background-color: var(--err); */
		border: none;
		outline: none;
		color: #fff;
		font-weight: 600;
		width: 100%;
		padding: 12px 0;
		border-radius: 12px;
		margin-top: 40px;
		cursor: pointer;
		transition: filter .2s ease;
	}

	.settings__exit:hover{
		background-color: #f76964;
	}

	.settings__exit:active{
		background-color: #d8504b;
	}

	.singleLang .singleLang__title{
		padding-left: 20px;
	}

	.singleLang__current-marker{
		position: absolute;
		right: 20px;
		top: 50%;
		background-color: var(--main);
		border-radius: 50%;
		width: 7px;
		height: 7px;
		transform: translateY(-50%);
	}

	.singleLang{
		position: relative;
		font-size: 1rem;
		padding: 16px 0;
		border-top: 1px solid rgba(0, 0, 0, .1);
		cursor: pointer;
		transition: background-color .2s ease;
	}

	.singleLang:hover{
		background-color: rgba(0,0,0,.1);
	}

	.singleLang:last-of-type{
		border-bottom: 1px solid rgba(0, 0, 0, .1);
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