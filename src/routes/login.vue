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
				<div class="login__onlogin-action">
					<div v-if="!getOnlogin.info" class="login__see-services">
						<router-link :to="{name: 'services'}">
							<img src="/img/logos/logoTothostMini.png" alt="tothost">
							{{$t('unregistered.see services') | capitalize}}
						</router-link>
					</div>

					<div v-else class="login__action-info">
						<!-- {{getOnlogin.info}} -->
						your order:
						<div class="order__card">
							<div class="order__icon">
								<a-icon :type="$config.services[getOnlogin.info.type].icon"/>
							</div>
							<div class="order__info">
								<div class="order__title">{{getOnlogin.info.title}}</div>
								<div class="order__cost">{{getOnlogin.info.cost}} {{$config.currency.suffix}}</div>
							</div>
							<div class="order__remove" @click="$store.commit('clearOnlogin');">
								<a-icon type="close" />
							</div>
						</div>
					</div>

					<a-select class="login__selector" style="width: 70px;" @change="(e) => $i18n.locale = e" :value="$i18n.locale">
						<a-select-option v-for="lang in langs" :key="lang" :value="lang">
							{{lang.toUpperCase()}}
						</a-select-option>
					</a-select>
				</div>

				<div class="login__inputs">
					<div v-if="loginError" class="login__error">{{loginError}}</div>
					<div v-on:keyup.enter="submitHandler()" class="inputs__log-pas">
						<input class="login__input" type="text" placeholder="Email" v-model="email">
						<template v-if="remember">
							<!-- <span class="login__horisontal-line"></span> -->
							<input class="login__input" type="password" placeholder="Password"  v-model="password">
						</template>
					</div>
					<template>
						<template v-if="!tryingLogin">
							<div class="login__button">
								<button v-if="remember" @click="submitHandler()" class="login__submit">{{$t('login') | capitalize}}</button>
								<button v-else @click="restorePass()" class="login__submit">{{$t('restore') | capitalize}}</button>
							</div>

						</template>
						<div v-else class="login__loading">
							<span class="load__item"></span>
							<span class="load__item"></span>
							<span class="load__item"></span>
						</div>
					</template>
				</div>
				<div class="login__forgot">
					<a href="#" @click="forgotPass()">{{remember?$t('forgotPass'):$t('I have a password') | capitalize}}</a>
				</div>
				<div class="login__forgot" style="margin-top: 5px">
					<router-link :to="{name: 'register'}">{{$t('sign up') | capitalize}}</router-link>
				</div>
				<!-- <div id="qrcode" style="margin-top: 50px; text-align: center">
					<p>{{$t('Use on your phone:')}}</p>
  				<qrcode-vue :value="selfUrl" size="150" level="M" renderAs="svg" />
				</div> -->
			</div>
		</div>
  	</div>
  
</template>

<script>
import md5 from 'md5'
import QrcodeVue from 'qrcode.vue'

export default {
	name: "login",
	data(){
		return {
			tryingLogin: false,
			loginError: "",
			remember: true,
			password: '',
			email: '',
			qrcode: null
		}
	},
	components: {
		QrcodeVue
	},
	props: {
		getUser: Function
	},
	methods: {
		submitHandler(){
			this.tryingLogin = true;
			this.send(this);
		},
		send(context){
			const email = encodeURIComponent(this.email);
			const password = encodeURIComponent(this.password);
			
			this.$api.auth(email, password)
			.then(Response => {
				const data = Response.data;
				const user = {};
				if (data.result == "success"){

					user.id = data.userid;
					user.passwordhash = data.passwordhash;
					user.email = data.email;
					user.secret = data.secret;
					
					const close_your_eyes = md5('clientDetails'+user.id+user.secret);
					const url = `/clientDetails.php?userid=${user.id}&secret=${close_your_eyes}`;
					this.$axios.get(url)
					.then(resp => {
						user.firstname = resp.data.firstname;
						user.lastname = resp.data.lastname;
						user.balance = resp.data.credit;
						user.currency_code = resp.data.currency_code;

						this.$store.dispatch("onLoadUser", user);
						if(this.getOnlogin.redirect){
							this.$router.push({name: this.getOnlogin.redirect});
						} else {
							this.$router.push({name: 'root'});
						}

						if(this.getOnlogin.action){
							this.getOnlogin.action();
						}
						// location.reload() //костыль, починить позже
					})
					.finally( () => {
						this.tryingLogin = false;
					})
				}
				else if(data.result == "error"){
					this.loginError = data.message;
					this.tryingLogin = false;
				}
			})
			.catch(err => {
				console.error(err);
				this.$message.error("Can't connect to the server")
			})
		},
		forgotPass(){
			this.remember = !this.remember;
		},
		restorePass(){
			const email = encodeURIComponent(this.email);
			
			this.$axios.get(`/userResetPassword.php?email=${email}`)
			.then(res => {
				const data = res.data;
				// console.log(data);
				if (data.result == "success"){
					// console.log('succ');
					this.$message.success(data.message);
				}
				else if(data.result == "error"){
					// console.log('err');
					this.loginError = data.message;
					this.tryingLogin = false;
				}
			})
			.catch(err => {
				console.error(err);
				this.$message.error("Can't connect to the server")
			})
			.finally( () => {
				this.tryingLogin = false;
			})
		}
		
	},
	computed: {
		getOnlogin(){
			return this.$store.getters.getOnlogin;
		},
		companyName(){
			return this.$store.getters['getDomainInfo'].name ?? this.$config.appTitle
		},
		companyLogo(){
			return this.$config.appLogo.path;
		},
		companyLogoPos(){
			return this.$config.appLogo.pos;
		},
		selfUrl(){
			return location.href;
		},
		langs(){
			return this.$config.languages;
		},
	}
}
</script>

<style lang="less">
@import '~ant-design-vue/dist/antd.less';
@import '../variables.less';

.logo{
	display: flex;
	grid-gap: 0px;
	padding-bottom: 88px;
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

.logo__subtitle{
	text-align: center;
	font-size: 16px;
	font-weight: 300;
}

.clipPathSvg{
	height: 0;
	width: 0;
}

.login{
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #0D0D22;
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
	background-image: url("/img/images/bg1_1.png");
	background-repeat: no-repeat;
	background-position: 50% 50%;
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
	background-color: #0D0D22;
	background-image: url("/img/images/bg1_2.png");
}

.login__inputs{
	display: flex;
	flex-direction: column;
	width: 80%;
	max-width: 500px;
	position: relative;
}

.login__input {
	background-color: transparent;
	border: 1px solid #7A7AE8;
	outline: none;
	padding: 10px 15px;
	border-radius: 5px;
	color: #B0B0B1;
}

.login__input:not(:last-child) {
	margin-bottom: 13px;
}

.login__horisontal-line{
	display: block;
	width: 95%;
	height: 1px;
	margin: auto;
	background: #f4f4f4;
}

.inputs__log-pas{
	display: flex;
	flex-direction: column;
	// border-radius: 10px;
	overflow: hidden;
	// box-shadow: 3px 8px 20px rgba(164, 180, 244, .5);
	margin-bottom: 25px;
}

.login__button{
	display: flex;
	grid-gap: 15px;
	justify-content: center;
	align-items: center;
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
	flex-grow: 1;
}
#qrcode{
	display: none;
}

.login__submit:hover{
	animation: gradient 2s ease infinite;
}

.logo__image {
	max-width: 500px;
	margin: 0 auto;
}

.logo__image img {
	max-width: 500px;	
}

@keyframes gradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

.login__forgot a{
	text-decoration: none;
}

.login__forgot a:hover{
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

.login__onlogin-action {
	display: flex;
	align-items: stretch;
	margin-bottom: 40px;
}

.login__see-services a{
	display: block;
	padding: 10px 15px;
	/* border: 1px solid #d0dfff; */
	box-shadow: inset 0px 0px 0px 2px #7F7FEC;
	border-radius: 5px;
	transition: box-shadow .2s ease;
	display: flex;
	grid-gap: 10px;
	font-size: 1.2em;
}
.login__see-services img{
	height: 20px;
	margin-top: 4px;
}
.login__see-services a:hover{
	box-shadow: inset 0px 0px 0px 2px #8e8eee;
}

.login__see-services a i{
	font-size: 1.5em;
}

.order__card{
	margin-top: 7px;
	position: relative;
	box-sizing: border-box;
	display: flex;
	min-width: 300px;
	box-shadow: inset 0px 0px 0px 1px #d0dfff;
	border-radius: 5px;
	padding: 10px 15px;
	grid-gap: 10px;
}

.order__icon{
	font-size: 32px;
}

.order__remove{
	position: absolute;
	padding: 5px;
	top: 5px;
	right: 10px;
	cursor: pointer;
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
	box-shadow: inset 0px 0px 0px 2px #8e8eee;
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
		padding-bottom: 0px;
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

.login .ant-select {
	border-radius: 5px;
	margin-left: 10px;
}

.login .ant-select .ant-select-selection--single {
	height: 100%;
}

.login .ant-select-selection--single .ant-select-selection__rendered {
	line-height: 44px;
}
</style>