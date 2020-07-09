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


		<div class="chat__content">
			<div class="chat__message chat__message--out">Тестовое исходящее сообщение</div>
			<div class="chat__message chat__message--in">Тестовое входяещее сообщение в ответ</div>
		</div>

		<div class="chat__footer">
			<input type="text" class="chat__input" name="message" id="message" placeholder="Message...">
			<div class="chat__send">
				<a-icon type="arrow-up" />
			</div>
			<div class="chat__send">
				<a-icon type="plus" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ticketChat",
	data(){
		return {
			theme: "Чат с агентом поддержки"
		}
	},
	methods: {
		goBack(){
			this.$router.push("support");
		},
	},

}
</script>

<style>
	.chat{
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.chat__header {
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
		flex: 1 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 6px 15px;
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

	.chat__message:not(:last-child){
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
