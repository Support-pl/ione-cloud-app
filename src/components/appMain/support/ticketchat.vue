<template>
	<div class="chat">
		<!-- {{this.$route.params.pathMatch}} -->
		<div class="chat__header">
			<div class="chat__back">
				<div class="icon__wrapper" @click="goBack()">
					<a-icon type="left" />
				</div>
			</div>
			<div class="chat__title">
				{{theme}}
			</div>
		</div>


		<!-- <div class="chat__content">
			<div class="chat__message chat__message--out">Тестовое исходящее сообщение</div>
			<div class="chat__message chat__message--in">Тестовое входяещее сообщение в ответ</div>
		</div> -->
		<div class="chat__content">
			<div v-for='(reply, index) in replies' :key='index' class="chat__message" :class="[ isAdminSent(reply) ? 'chat__message--in' : 'chat__message--out']">
				<pre v-html="beauty(reply.message)"></pre>
			</div>
		</div>

		<div class="chat__footer">
			<input v-model="messageInput" v-on:keyup.enter="sendMessage" type="text" class="chat__input" name="message" id="message" placeholder="Message...">
			<div class="chat__send" @click="sendMessage">
				<a-icon type="arrow-up" />
			</div>
			<div class="chat__send">
				<a-icon type="plus" />
			</div>
		</div>
	</div>
</template>

<script>
const axios = require('axios');

export default {
	name: "ticketChat",
	props: {
		user: Object
	},
	data(){
		return {
			theme: "SUPPORT",
			replies: null,
			messageInput: "",
		}
	},
	methods: {
		goBack(){
			this.$router.push("support");
		},
		beauty(message){
			message = message.replace(/\n/g, '<br>');
			message = message.replace(/[\s\uFEFF\xA0]{2,}/g, ' ');
			return message.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		},
		isAdminSent(reply){
			return reply.admin !== "";
		},
		sendMessage(){
			if (this.messageInput.length < 1) return;
			this.replies.unshift({
				admin: "",
				attachment: "",
				contactid: "0",
				date: new Date(),
				email: "TEMP",
				message: this.messageInput,
				name: "TEMP",
				userid: "TEMP"
			})
			this.messageInput = "";
		}
	},
	mounted(){
		console.log(this.user)
		axios.get(`https://devwhmcs.support.by/app_cloud_mobile/ticket.php?id=${this.$route.params.pathMatch}`)
		.then(resp => {
			this.replies = resp.data.replies.reply;
			this.theme = resp.data.subject;
			console.log(resp);
			console.log(this.replies);
		})
	}

}
</script>

<style>
	.chat{
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		padding-top: 64px;
		padding-bottom: 55px;
	}

	.chat__header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 64px;
		line-height: 64px;
		background-color: rgb(66, 124, 247);
		color: #fff;
		padding: 0;
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		justify-items: center;
		align-items: center;
	}

	.chat__title{
		font-weight: bold;
		line-height: 1.1rem;
	}

	.chat__back{
		font-size: 1.4rem;
		cursor: pointer;
	}

	.chat__footer{
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ececec;
		padding: 10px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.chat__input{
		border: 0;
		outline: 0;
		border-radius: 40px;
		flex: 1 0;
		padding: 7px 10px;
	}

	.chat__send{
		background-color: #1b7ee4;
		color: #fff;
		border-radius: 50%;
		height: 35px;
		width: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10px;
		font-size: 1.2rem;
		transition: background-color .2s ease;
	}

	.chat__send:hover{
		background-color: #2387eb;
	}

	.chat__send:active{
		background-color: #1f7cda;
	}

	.chat__content{
		height: 100%;
		flex: 1 0;
		display: flex;
		/* flex-direction: column;
		justify-content: flex-end; */
		flex-direction: column-reverse;
		justify-content: flex-start;
		padding: 6px 15px;
		overflow: auto;
	}

	.chat__message {
		background: #dcfdbe;
		font-weight: 500;
		padding: 5px 7px;
		border-radius: 5px;
		box-shadow: 2px 2px 2px rgba(0, 0, 0, .07);
		position: relative;
		width: max-content;
		max-width: 80%;
	}

	.chat__message{
		margin-bottom: 10px;
	}

	.chat__message::after{
		content: '';
		display: block;
		position: absolute;
		/* background-color: red; */
		bottom: 0;
		border: 9px solid transparent;
		border-bottom: 10px solid #dcfdbe;
	}

	.chat__message--out {
		align-self: flex-end;
	}

	.chat__message--out::after{
		right: 0;
		transform: translateX(50%);
	}

	.chat__message--in {
		align-self: flex-start;
	}

	.chat__message--in::after{
		left: 0;
		transform: translateX(-50%);
	}
</style>
