<template>
	<div class="login">
		<div class="login__title login__layout">
			Cloud Support.by
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
					<div class="inputs__log-pas">
						<input type="text" placeholder="Login">
						<span class="login__horisontal-line"></span>
						<input type="password" placeholder="Password">
					</div>
					<template>
						<button v-if="!tryingLogin" @click="submitHandler()" class="login__submit">{{$t('login')}}</button>
						<div v-else class="login__loading">
							<span class="load__item"></span>
							<span class="load__item"></span>
							<span class="load__item"></span>
						</div>
					</template>
				</div>
				<div class="login__forgot">
					<a href="#">{{$t('forgotPass')}}</a>
				</div>
			</div>
		</div>
  	</div>
  
</template>

<script>
export default {
	name: "login",
	data(){
		return {
			tryingLogin: false,
			loginError: ""
		}
	},
	props: {
		getUser: Function
	},
	methods: {
		submitHandler(){
			this.tryingLogin = true;
			const result = this.send(this);
			result
				.then((data) => this.getUser(data))
				.catch((err) => {
					this.loginError = err;
				})
		},
		send(context){
			return new Promise((reslove, reject) =>{
				setInterval(() => {
					context.tryingLogin = false;
					// DEBUG
					reslove({
						name: "test",
						balance: 222
					});
				}, 2000);
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
}

.login__layout{
	height: 50%;
}

.login__title{
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(90deg, #2074f5, #367ff2);
	clip-path: url(#myCurve);
	color: #fff;
	font-size: 36px;
	font-weight: bold;
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
	/* height: 60px; */
	padding: 10px 15px;
	/* background-color: red;
	border: 1px dashed gray; */
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
	/* padding: 15px 0px; */
	position: absolute;
	top: 0px;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
}



</style>