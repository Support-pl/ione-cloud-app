<template>
	<div class="addTicket__wrapper" @click="clickOutOfBlock(this)">
		<div class="addTicket">
			<div class="addTicket__header">{{$t('support_Create_ticket')}}</div>
			<div class="addTicket__title">
				<div class="addTicket__title-name row__name">{{$t('support_Question_subject')}}</div>
				<input type="text" class="addTicket__title-input" v-model="ticketTitle">
			</div>
			<div class="addTicket__message">
				<div class="addTicket__message-name row__name">{{$t('support_Question')}}</div>
				<textarea name="question" id="question" cols="30" rows="10" class="addTicket__message-input"  v-model="ticketMessage"></textarea>
			</div>
			<div class="addTicket__buttons">
				<button class="addTicket__button addTicket__button--cancel" @click="closeFields()">{{$t('Cancel')}}</button>
				<button class="addTicket__button addTicket__button--send" @click="sendNewTicket()">
					<template v-if="!isSending">{{$t('Send')}}</template>
					<a-icon v-else type="loading" />
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import md5 from 'md5';

export default {
	name: 'addTicket',
	data(){
		return {
			ticketTitle: "",
			ticketMessage: "",
			isSending: false,
		}
	},
	computed: {
		user(){
			return this.$store.getters.getUser;
		}
	},
	methods: {
		clickOutOfBlock(){
			if(event.target.classList.contains("addTicket__wrapper")){
				this.closeFields();
			}
		},
		closeFields(){
			this.$store.commit('support/inverseAddTicketState')
		},
		sendNewTicket(){
			if(this.ticketTitle.length < 3 || this.ticketMessage.length < 3) return;
			this.isSending = true;

			const close_your_eyes = md5('openticket'+this.user.id+this.user.secret);
			const object = {
				subject: this.ticketTitle,
				message: this.ticketMessage,
				clientid: this.user.id,
				secret: close_your_eyes
			}

			const params = Object.entries(object).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');

			const url = `/openticket.php?${params}`;

			this.$axios.get(url)
				.then(resp => {
					if(resp.data.result == "success"){
						this.ticketTitle = "";
						this.ticketMessage = "";
						this.isSending = false;
						
						
						this.$store.dispatch("support/fetchTickets")
						this.$store.commit('support/inverseAddTicketState')
					}
				})
		},
	}
}
</script>

<style>

	.addTicket__wrapper{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.2);
	}

	.addTicket{
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		max-width: 768px;
		height: 90%;
		background: #fff;
		border-radius: 35px 35px 0 0;
		box-shadow: 5px 2px 15px rgba(0,0,0,.2);
		padding: 15px 20px;
		display: flex;
		flex-direction: column;
	}

	.addTicket__header{
		text-align: center;
		font-size: 1.3rem;
		font-weight: 600;
	}

	.addTicket__title{
		margin-top: 20px;
	}
	
	.addTicket__message{
		flex: 1 0;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
	}

	.addTicket__title-input,
	.addTicket__message-input{
		width: 100%;
		border: none;
		outline: none;
		background-color: var(--bright_bg);
		border-radius: 25px;
		padding: 10px 15px;
	}

	.row__name{
		padding-left: 20px;
		margin-bottom: 5px;
	}

	.addTicket__message-input{
		border-radius: 25px 25px 0 0;
		flex: 1 0;
		resize: none;
	}

	.addTicket__buttons{
		display: flex;
		width: 100%;
	}

	.addTicket__button{
		flex-grow: 1;
		padding: 10px 15px;
		border: none;
		outline: none;
		color: #fff;
		font-weight: 600;
		font-size: 1.1rem;
		cursor: pointer;
	}

	.addTicket__button--cancel{
		background-color: var(--err);
		border-radius: 0 0 0 25px;
	}

	.addTicket__button--send{
		background-color: var(--success);
		border-radius: 0 0 25px 0;
	}
</style>