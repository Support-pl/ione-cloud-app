<template>
	<div class="login">
		<div class="login__title login__layout">
			<div class="logo" :class="['pos_'+companyLogoPos]">
				<div class="logo__subtitle" v-if="companyName">
					Instant, Easy, Reliable
				</div>
				<div class="logo__title" v-if="companyName">
					<img src="/img/images/tothost.svg" alt="tothost">
				</div>
				<div class="logo__image" v-if="companyLogo">
					<img :src="`./img/${companyLogo}`" alt="logo">
				</div>

			</div>
			<svg class="clipPathSvg" width="0" height="0">
				<defs>
					<clipPath id="myCurve" clipPathUnits="objectBoundingBox">
					<path
						d="M0.000,0.000 L1,-0.000 L1,0.743 C1,0.7 1,0.806 0.846,0.806 C0.728,0.806 0.635,0.791 0.400,0.791 C0.130,0.791 0.022,0.976 0.000,1 L0.000,-0.000 Z"
					/>
					</clipPath>
				</defs>
			</svg>
		</div>
		<div class="login__main login__layout">
			<div class="login__UI">
		
				<div v-if="getOnlogin.info" class="login__action-info">
					{{getOnlogin.info}}
				</div>

				<div class="login__inputs">
					<form>
					<!-- <div v-if="loginError" class="login__error">{{loginError}}</div> -->

						<!-- <div class="inputs__log-pas">
							<input type="text" placeholder="Email" v-model="userinfo.email">
							<span class="login__horisontal-line"></span>
							<input type="password" :placeholder="$t('clientinfo.password') | capitalize"  v-model="userinfo.password">
						</div> -->

						<div class="inputs__log-pas">
							<input
								type="text"
								name="firstname"
								:placeholder="$t('clientinfo.firstname') + ' *' | capitalize"
								v-model="userinfo.firstname"
								readonly
								onfocus="this.removeAttribute('readonly')"
							>
							<!-- <span class="login__horisontal-line"></span> -->
							<input
								type="text"
								name="lastname"
								:placeholder="$t('clientinfo.lastname') + ' *' | capitalize" 
								v-model="userinfo.lastname"
								readonly
								onfocus="this.removeAttribute('readonly')"
							>
							<!-- <span class="login__horisontal-line"></span> -->
							<input
								type="email"
								name="email"
								:placeholder="$t('clientinfo.email') + ' *' | capitalize"
								v-model="userinfo.email"
								readonly
								onfocus="this.removeAttribute('readonly')"
							>
							<!-- <span class="login__horisontal-line"></span> -->
							<input
								type="text"
								name="phone"
								:placeholder="$t('clientinfo.phone number') + ' *' | capitalize"
								v-model="userinfo.phonenumber"
								readonly
								onfocus="this.removeAttribute('readonly')"
							>
							<!-- <span class="login__horisontal-line"></span> -->
							<input
								type="password"
								name="password"
								:placeholder="$t('clientinfo.password') + ' *' | capitalize" 
								v-model="userinfo.password"
								readonly
								onfocus="this.removeAttribute('readonly')"
							>
							<!-- <span class="login__horisontal-line"></span> -->
							<input
								type="password"
								name="password"
								:placeholder="$t('clientinfo.password again') + ' *' | capitalize" 
								v-model="userinfo.password2"
								readonly
								onfocus="this.removeAttribute('readonly')"
							>
							<!-- <span class="login__horisontal-line"></span> -->
						</div>

						<a-select class="login__selector" style="width: 100%; border: none; margin-bottom: 15px; margin-left: 0" @change="(e) => $i18n.locale = e" :value="$i18n.locale">
							<a-select-option v-for="lang in langs" :key="lang" :value="lang">
								{{$t('localeLang', lang)}}
							</a-select-option>
						</a-select>

						<div class="terms-accept">
							<a-checkbox v-model="accepted" style="color: #B0B0B1">
								{{$t("tos.part1")}} <a href="https://tothost.vn/privacy-policy/" target="_blank">{{$t("tos.link")}}</a>{{$t("tos.part2")}}
								<!-- agree to <a href="https://tothost.vn/privacy-policy/" target="_blank">terms and conditions</a> -->
							</a-checkbox>
						</div>

						<!-- <div class="inputs__log-pas">
							<select name="country" id="country" v-model="userinfo.country">
								<option v-for="country in countries" :key="country.code" :value="country.code">{{country.title}}</option>
							</select>
							<span class="login__horisontal-line"></span>
							<input type="text" :placeholder="$t('clientinfo.state') | capitalize" v-model="userinfo.state">
							<span class="login__horisontal-line"></span>
							<input type="text" :placeholder="$t('clientinfo.city') | capitalize" v-model="userinfo.city">
							<span class="login__horisontal-line"></span>
							<input type="text" :placeholder="$t('clientinfo.postcode') | capitalize" v-model="userinfo.postcode">
							<span class="login__horisontal-line"></span>
							<input type="text" :placeholder="$t('clientinfo.address') | capitalize"  v-model="userinfo.address1">
						</div>

						<div class="inputs__log-pas">
							<input type="text" :placeholder="$t('clientinfo.phone number') | capitalize" v-model="userinfo.phonenumber">
						</div> -->

						<template>
							<button v-if="!registerLoading" @click.prevent="submitHandler()" class="login__submit">{{$t('clientinfo.register') | capitalize}}</button>
								
							<div v-else class="login__loading">
								<span class="load__item"></span>
								<span class="load__item"></span>
								<span class="load__item"></span>
							</div>
						</template>

					</form>
				</div>
				<div class="register__already-has" style="margin-top: 40px">
					<router-link :to="{name: 'login'}">{{$t('clientinfo.already have account?') | capitalize}}</router-link>
				</div>
			</div>
		</div>
  	</div>
  
</template>

<script>
import api from '@/api.js';
import countries from '@/countries.json';

export default {
	name: "register-view",
	data(){
		return {
			countries,
			registerLoading: false,
			accepted: false,
			userinfo: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
				password2: '',
				// address1: '',
				// city: '',
				// state: '',
				// postcode: '',
				country: 'VN',
				phonenumber: ''
			}
		}
	},
	methods: {
		submitHandler(){
			this.send(this);
		},
		send(){
			if(this.userinfo.password !== this.userinfo.password2){
				this.$message.warn('Passwords must match')
				return
			}

			if(Object.keys(this.userinfo).some(key => !this.userinfo[key].length)){
				this.$message.warn(this.$t('all fields are required'));
				return
			}

			for(let key in this.userinfo){
				if(this.userinfo[key].length < 2){
					this.$message.warn(key + ' ' + this.$t('field must contain more characters'));
					return
				}
			}

			let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if(!this.userinfo.email.match(regexEmail)){
				this.$message.warn('Email is not valid');
				return
			}

			if(!this.accepted){
				this.$message.warn('Accept terms of use is required')
				return
			}

			const temp = JSON.parse(JSON.stringify(this.userinfo));
			temp.phonenumber = temp.phonenumber.replace("+", "")

			this.registerLoading = true;
			api.getWithParams('client.addClient', {...temp, lang: this.$i18n.locale})
			.then(result => {
				if(result.result == 'success'){
					this.$message.success('Account created successfully.');
					this.$router.push({name: 'login'});
				} else {
					throw result;
				}
				console.log(result)
			})
			.catch(err => {
				this.$message.error(err.message);
				console.error(err);
			})
			.finally(()=>{
				this.registerLoading = false;
			})
		},	
	},
	computed: {
		getOnlogin(){
			return this.$store.getters.getOnlogin;
		},
		companyName(){
			return this.$store.getters['getDomainInfo'].name ?? this.$config.appTitle
		},
		langs(){
			return this.$config.languages;
		},
		companyLogo(){
			return this.$config.appLogo.path;
		},
		companyLogoPos(){
			return this.$config.appLogo.pos;
		},
	}
}
</script>

<style>

.logo{
	display: flex;
	grid-gap: 15px
}

.pos_top{
	flex-direction: column-reverse;
}

.pos_bottom{
	flex-direction: column;
}

.pos_left{
	flex-direction: row-reverse;
}

.pos_right{
	flex-direction: row;
}

.logo__title{
	text-align: center;
}

.clipPathSvg{
	height: 0;
	width: 0;
}

.login{
	height: 100%;
	display: flex;
	flex-direction: column;
}

.login__layout{
	flex: 1 0;
}

.login__title{
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--main);
	clip-path: url(#myCurve);
	color: var(--bright_font);
	font-size: 36px;
	font-weight: bold;
	flex-shrink: 0;
	min-height: 50%;
}

.login__title::selection{
	color: var(--main);
	background: var(--bright_font);
}
.login__title::moz-selection{
	color: var(--main);
	background: var(--bright_font);
}

.login__UI{
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	overflow-y: auto;
}

.login__inputs{
	display: flex;
	flex-direction: column;
	width: 80%;
	max-width: 500px;
	position: relative;
}

.login__horisontal-line{
	display: block;
	width: 95%;
	height: 1px;
	margin: auto;
	background: #f4f4f4;
}

.inputs__log-pas input{
	background-color: transparent;
	border: 1px solid #7A7AE8;
	outline: none;
	padding: 10px 15px;
	border-radius: 5px;
	color: #B0B0B1;
}

.inputs__log-pas input:not(:last-child) {
	margin-bottom: 13px;

}

/* .login__input:not(:last-child) {
	margin-bottom: 13px;
} */

.inputs__log-pas{
	display: flex;
	flex-direction: column;
	/* border-radius: 10px; */
	overflow: hidden;
	/* box-shadow: 3px 8px 20px rgba(164, 180, 244, .5); */
	margin-bottom: 25px;
}

.login__submit{
	border: none;
	outline: none;
	color: #fff;
	font-weight: 600;
	border-radius: 10px;
	padding: 7px 20px;
	background: linear-gradient(90deg, #7474DD 4.43%, #7474DD 4.44%, #5252D5 96.5%);
	background-size: 150% 200%;
	background-position: 0 0;
	/* animation: AnimationName 1s ease infinite; */
	cursor: pointer;
	width: 100%;
}

.terms-accept {
	margin-bottom: 10px;
	margin-top: -5px;
	margin-left: 5px;
}

#qrcode{
	display: none;
}

.login__submit:hover{
	animation: gradient 2s ease infinite;
}

@keyframes gradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

.inputs__log-pas input,
.inputs__log-pas select{
	/* border: none; */
	outline: none;
	/* padding: 10px 15px; */
}

.inputs__log-pas input::placeholder{
	opacity: .5;
}

.register__already-has a{
	text-decoration: none;
}

.register__already-has a:hover{
	text-decoration: underline;
}

.login__loading{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 35px;
}

.load__item:not(:first-child){
	margin-left: 10px;
}

.load__item{
	display: block;
	width: 25px;
	height: 25px;
	background: #437dfb;
	border-radius: 50%;
}

.load__item:nth-child(1){
	animation: loading 1.4s .2s ease infinite;
}
.load__item:nth-child(2){
	animation: loading 1.4s .4s ease infinite;
}
.load__item:nth-child(3){
	animation: loading 1.4s .6s ease infinite;
}

.inputs__log-pas .ant-select-selection{
	border: none;
}

.logo__image {
	max-width: 500px;
	margin: 0 auto;
}

.logo__image img {
	max-width: 500px;	
}

@keyframes loading {
	from, to {transform: scale(1)}
	50% {transform: scale(.2);}
}

.login__error{
	color: tomato;
	text-align: center;
	position: absolute;
	top: -35px;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
}

.login__selector .ant-select-selection{
	background-color: transparent;
	box-shadow: inset 0px 0px 0px 1px #7A7AE8;
	border: none;
}

.login__selector .ant-select-arrow {
	color: #8e8eee;
}

.login__selector .ant-select-selection__rendered {
	color: #fff;
}

@media screen and (min-width: 1024px){
	.login{
		flex-direction: row;
	}

	.login__title{
		clip-path: none;
	}

	.login__UI{
		justify-content: center;
	}

	.login__forgot{
		margin-top: 40px;
	}

	#qrcode{
		display: inline-block;
	}
}

</style>