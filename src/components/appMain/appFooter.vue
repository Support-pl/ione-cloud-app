<template>
	<div class="footer">
		<div class="container">
			<div class="footer__content">
				<!-- <div class="bg" :style="{transform: 'translateX('+getBiasLeft+'px)'}"></div> -->
				<!-- <div class="bg"></div> -->
				<div v-for="(button, index) in getButtons" :key="index" @click="setTabByName(button.title)" class="button" :class="{ active: button.title==active }">
					<div class="button__icon">
						<a-icon :type="button.icon" :theme="button.theme" />
					</div>
					<div class="button__title">
						{{$t(button.title)}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: "appFooter",
	computed: {
		getBiasLeft(){
			const btn = document.querySelector(".button");
			const width = btn.offsetWidth;
			let ind = -1;
			
			for(let i = 0; i < this.getButtons.length; i++){
				if(this.active == this.getButtons[i].title) ind = i;
			}

			ind = ind < 0? 0 : ind;

			return width * ind;
		},
		...mapGetters('app', ['getButtons']),
		...mapGetters('app', ['getActiveTab']),
		active(){
			return this.getActiveTab.title
		}
	},
	methods: {
		...mapActions('app', ['setTabByName'])
	}
}
</script>

<style>

.footer{
	background-color: #fdfdfd;
	position: relative;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, .2);
	user-select: none;
}

.footer__content{
	display: flex;
	position: relative;
}

.button{
	flex: 1 0;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	position: relative;
	z-index: 2;
}

.button__title{
	transform: translateY(20px);
	transition: transform .2s .1s ease;
}

.button__icon{
	font-size: 1.2rem;
	color: #919191;
	position: relative;
	z-index: 2;
	translate: color .2s ease;
	transform: translateY(10px);
	transition: transform .2s ease;
}

.button:hover .button__icon{
	color: #7c7c7c;
}
/* 
.footer__active{
	background-color: #fdfdfd;
	width: 60px;
	height: 60px;
	position: absolute;
	top: -30px;
	left: 15px;
	border-radius: 50%;
	z-index: 1;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, .2);
	color: #fff;
}

.footer__active::before{
	content: '';
	display: block;
	height: 52px;
	width: 52px;
	background-color: #427cf7;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	z-index: 1;
} */
.footer__active{
	background-color: #427cf7;
	height: 52px;
	width: 52px;
	position: absolute;
	top: -30px;
	left: 47px;
	border-radius: 50%;
	z-index: 2;
	color: #fff;
	transform: translateX(-50%);
}

.footer__active::before{
	content: '';
	display: block;
	width: 60px;
	height: 60px;
	background-color: #fdfdfd;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	z-index: 1;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, .2);
}

/* temp */
.button.active{
	background-color: #427cf7;
}

.bg{
	background-color: #427cf7;
	position: absolute;
	z-index: 1;
	height: 100%;
	width: 25%;
	transition: transform .2s ease;
}

.button.active .button__icon{
	color: #fff;
	transform: translateY(5px);
}

.button.active .button__title{
	transform: none;
	color: #fff
}
</style>