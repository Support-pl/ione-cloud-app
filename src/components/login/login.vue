<template>
	<div class="login">
		<div class="login__title login__layout">
			support.by
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
				<div class="login__inputs">
					<div v-if="loginError" class="login__error">{{loginError}}</div>
					<div v-on:keyup.enter="submitHandler()" class="inputs__log-pas">
						<input type="text" placeholder="Email" v-model="email">
						<template v-if="remember">
							<span class="login__horisontal-line"></span>
							<input type="password" placeholder="Password"  v-model="password">
						</template>
					</div>
					<template>
						<template v-if="!tryingLogin">
							<button v-if="remember" @click="submitHandler()" class="login__submit">{{$t('login') | capitalize}}</button>
							<button v-else @click="restorePass()" class="login__submit">{{$t('restore') | capitalize}}</button>

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
					{{$t('use access data from my.support.by')}}
				</div>
				<div id="qrcode" style="margin-top: 50px; text-align: center">
					<p>{{$t('Use on your phone:')}}</p>
					<img src="/img/images/qrcode.png" alt="qrcode" style="width: 150px">
				</div>
			</div>
		</div>
  	</div>
  
</template>

<script>
import md5 from 'md5'

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
			
			this.$axios.get(`/login.php?email=${email}&password=${password}`)
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
						this.$router.push("cloud");
						location.reload() //костыль, починить позже
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
			.finally( () => {
				this.tryingLogin = false;
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
		
	}
}
</script>

<style>

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
}

.login__inputs{
	display: flex;
	flex-direction: column;
	width: 80%;
	max-width: 500px;
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
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 3px 8px 20px rgba(164, 180, 244, .5);
	margin-bottom: 25px;
}

.login__submit{
	border: none;
	outline: none;
	color: #fff;
	font-weight: 600;
	border-radius: 10px;
	padding: 7px 20px;
	background: linear-gradient(90deg, #427cf7, #8baef2);
    background-size: 150% 200%;
	background-position: 0 0;
	/* animation: AnimationName 1s ease infinite; */
	cursor: pointer;
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

.inputs__log-pas input{
	border: none;
	outline: none;
	padding: 10px 15px;
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

@keyframes loading {
	from, to {transform: scale(1)}
	50% {transform: scale(.2);}
}

.login__error{
	color: tomato;
	text-align: center;
	position: absolute;
	top: 0px;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
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

	.login__error{
		top: 50%;
		transform: translateX(-50%) translateY(-750%);
	}

	#qrcode{
		display: inline-block;
	}
}

</style>