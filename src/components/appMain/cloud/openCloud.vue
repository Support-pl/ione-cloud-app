<template>
	<div class="cloud__fullscreen Fcloud">
		<transition name="opencloud" :duration="600">
		<div v-if="!singleLoading" class="cloud__container">
			<div class="Fcloud">
				<div class="Fcloud__header">
					<div class="Fcloud__back-wrapper">
						<router-link class="Fcloud__back icon__wrapper" to="cloud">
							<a-icon type="left" />
						</router-link>
					</div>
					<div class="Fcloud__header-title" v-if="SingleCloud.STATE">
						<div class="Fcloud__status-color" :class="{ 'glowing-animations': updating }" :style="{'background-color': statusColor}"></div>
						<div class="Fcloud__title">{{SingleCloud.NAME}}</div>
						<div class="Fcloud__status" :class="{ 'glowing-animations': updating }">{{vmState}}</div>
					</div>
				</div>
				<div class="Fcloud__buttons">
					<div v-if="SingleCloud.STATE == '3'" class="Fcloud__button" :class="{ 'disabled': updating }" @click="sendAction('Shutdown')">
						<div class="Fcloud__BTN-icon">
							<a-icon type="pause" />
						</div>
						<div class="Fcloud__BTN-title">Stop</div>
					</div>
					<div v-else class="Fcloud__button" :class="{ 'disabled': permissions.start }" @click='sendAction("Start")'>
						<div class="Fcloud__BTN-icon">
							<a-icon type="caret-right" />
						</div>
						<div class="Fcloud__BTN-title">Start</div>
					</div>
					<!-- <div class="Fcloud__button" :class="{ 'disabled': updating }" @click='sendAction("Restart")'> -->
					<div class="Fcloud__button" :class="{ 'disabled': permissions.reboot , 'btn_disabled_wiggle': true}" @click='openModal("reboot")'>
						<div class="Fcloud__BTN-icon">
							<a-icon type="redo" />
						</div>
						<div class="Fcloud__BTN-title">Reboot</div>
						<a-modal v-model="modal.reboot" title="Reboot option" @ok="handleOk('reboot')">
							<p>{{$t('cloud_Reboot_invite')}}</p>
							<a-radio-group v-model="option.reboot" name="rebootOption" :default-value="1">
								<a-radio :value="0">
									<a-tag color="green" :style="{'margin-bottom': '10px'}">
										{{$t('cloud_Regular')}}
									</a-tag>
									перезапуск
								</a-radio>
								<a-radio :value="1">
									<a-tag color="red">
										HARD
									</a-tag>
									перезапуск
								</a-radio>
							</a-radio-group>
						</a-modal>
					</div>
					<!-- <div class="Fcloud__button" :class="{ 'disabled': updating }" @click='sendAction("Shutdown")'> -->
					<div class="Fcloud__button" :class="{ 'disabled': permissions.shutdown }" @click='openModal("shutdown")'>
						<div class="Fcloud__BTN-icon">
							<a-icon type="stop" />
						</div>
						<div class="Fcloud__BTN-title">Shutdown</div>
						<a-modal v-model="modal.shutdown" title="reboot option" @ok="handleOk('shutdown')">
							<p>{{$t('cloud_Shutdown_invite')}}</p>
							<a-radio-group v-model="option.shutdown" name="shutdownOption" :default-value="1">
								<a-radio :value="0" :style="{'margin-bottom': '10px'}">
									<a-tag color="green" :style="{'margin': '0 2px 0 0'}">{{$t('cloud_Regular')}}</a-tag>
									{{$t('cloud_Shutdown')}}
								</a-radio>
								<a-radio :value="1">
									<a-tag color="red" :style="{'margin': '0 2px 0 0'}">
										HARD
									</a-tag>
									{{$t('cloud_Shutdown')}}
								</a-radio>
							</a-radio-group>
						</a-modal>
					</div>
				</div>

				
				<div class="Fcloud__info">
					<div class="Fcloud__info-header">
						<div class="Fcloud__info-title">{{$t('Information')}}</div>
					</div>

					<div class="Fcloud__main-info">
						<table class="Fcloud__table">
							<tbody>
								<tr>
									<td>{{$t('cloud_StartTime')}}</td>
									<td>{{SingleCloud.STIME}}</td>
								</tr>
								<tr>
									<td>IP</td>
									<td>{{SingleCloud.IP}}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="Fcloud__info-block block">
						<div class="Fcloud__block-header">
							<a-icon type="setting" theme="filled" />
							{{$t('cloud_Capacity')}}
						</div>
						<div class="Fcloud__block-content">
							<div class="block__column">
								<div class="block__title">CPU</div>
								<div class="block__value">{{SingleCloud.CPU}}</div>
							</div>
							<!-- <div class="block__column">
								<div class="block__title">VCPU</div>
								<div class="block__value">{{SingleCloud.VCPU}}</div>
							</div> -->
							<div class="block__column">
								<div class="block__title">{{$t('cloud_Memory')}}</div>
								<div class="block__value">{{mbToGb(SingleCloud.RAM)}} GB</div>
							</div>
						</div>
					</div>

					<div class="Fcloud__info-block block">
						<div class="Fcloud__block-header">
							<a-icon type="database" theme="filled" />
							{{$t('cloud_Storage')}}
						</div>
						<div class="Fcloud__block-content">
							<div class="block__column">
								<div class="block__title">{{$t('cloud_Type')}}</div>
								<div class="block__value">{{SingleCloud.DRIVE}}</div>
							</div>
							<div class="block__column">
								<div class="block__title">{{$t('cloud_Size')}}</div>
								<div class="block__value">{{mbToGb(SingleCloud.DRIVE_SIZE)}} GB</div>
							</div>
						</div>
					</div>

					<div v-if="showPermissions" class="Fcloud__info-block block">
						<div class="Fcloud__block-header">
							<a-icon type="user" />
							Permissions
						</div>
						<div class="Fcloud__block-content">
							<table class="permissions">
								<tbody>
									<tr>
										<th></th>
										<th>Use</th>
										<th>Manage</th>
										<th>Admin</th>
									</tr>
									<tr>
										<td>Owner</td>
										<td><input type="checkbox" name="" id=""></td>
										<td><input type="checkbox" name="" id=""></td>
										<td><input type="checkbox" name="" id=""></td>
									</tr>
									<tr>
										<td>Group</td>
										<td><input type="checkbox" name="" id=""></td>
										<td><input type="checkbox" name="" id=""></td>
										<td><input type="checkbox" name="" id=""></td>
									</tr>
									<tr>
										<td>Other</td>
										<td><input type="checkbox" name="" id=""></td>
										<td><input type="checkbox" name="" id=""></td>
										<td><input type="checkbox" name="" id=""></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>


				</div>
			</div>
		</div>
		<loading
			v-else
			color="#fff"
			:style="{'position': 'absolute', 'height': '100%', 'width': '100%'}"
			:key="loading"
			duration: 
		/>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import md5 from 'md5'
import loading from '../../loading/loading.vue'

export default {
	name: "openCloud",
	components: {
		loading
	},
	data(){
		return {
			status: 'running',
			name: 'test3',
			showPermissions: false,
			// updating: true
			modal: {
				reboot: false,
				shutdown: false
			},
			option: {
				reboot: 0,
				shutdown: 0
			}

		}
	},
	computed: {
		statusColor(){
			const color = this.$store.getters['cloud/getStateColor'](this.vmState);
			return color;
		},
		...mapGetters('cloud', {
			updating: 'isUpdating',
			SingleCloud: 'getOpenedCloud',
			vmState: 'getCloudState',
			isLoading: 'isLoading',
			permissions: 'permissions',
			singleLoading: 'singleLoading'
		})
	},
	created(){
		this.$store.dispatch('cloud/fetchSingleCloud', this.$route.params.pathMatch);
	},
	methods: {
		sendAction(action){
			switch (action.toLowerCase()){
				case 'start':
					if(this.permissions.start) return;
					break;
				case 'Poweroff':
				case 'PoweroffHard':
					if(this.permissions.shutdown) return;
					break;
				case 'reboot':
					if(this.permissions.reboot) return;
					break;
			}

			const user = this.$store.getters.getUser;
			const userid = user.id;
			const vmid = this.SingleCloud.ID;


			const close_your_eyes = md5('vmaction' + userid + user.secret);
			const url = `https://my.support.by/app_cloud_mobile/vmaction.php?userid=${userid}&action=${action}&vmid=${vmid}&secret=${close_your_eyes}`
			// console.log(action)
			// console.log(url);
			axios.get(url)
			.then(res => {
				// console.log(res);
				this.$store.dispatch('cloud/silentUpdate', this.$route.params.pathMatch);
				// this.$store.dispatch('cloud/fetchSingleCloud', this.$route.params.pathMatch);
			})

		},
		mbToGb(mb){
			const gb = Math.round(mb / 1024);
			return gb
		},
		handleOk(from){
			switch(from){

				case "reboot":
					if(this.option.reboot){
						this.sendAction('RebootHard')
						console.log("HARD REBOOT");
					} else {
						this.sendAction('Reboot')
						console.log("JUST REBOOT")
					}
					this.modal.reboot = false;
					break;

				case "shutdown":
					if(this.option.shutdown){
						this.sendAction('PoweroffHard')
						console.log("HARD SHUTDOWN");
					} else {
						this.sendAction('Poweroff')
						console.log("JUST SHUTDOWN")
					}
					this.modal.shutdown = false;
					break;
			}
		},
		openModal(name){

			switch (name.toLowerCase()){
				case 'start':
					if(this.permissions.start) return;
					break;
				case 'shutdown':
					if(this.permissions.shutdown) return;
					break;
				case 'reboot':
					if(this.permissions.reboot) return;
					break;
			}

			this.modal[name] = true;
			// console.log(this.permissions)
		}
	}
}
</script>

<style>

	.cloud__container{
		/* max-width: 850px; */
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.cloud__fullscreen{
		background: #468aff;
		display: flex;
	}

	.Fcloud {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.Fcloud__header{
		position: sticky;
		padding-top: 10px;
		color: #fff;
		top: 0;
		background-color: #468aff;
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		justify-items: center;
		align-items: center;
	}

	.Fcloud__header-title{
		position: relative;
		transition: transform .3s ease;
	}

	.Fcloud__title{
		font-weight: bold;
		font-size: 24px;
		line-height: 1;
	}

	.Fcloud__status{
		text-transform: uppercase;
		font-weight: bold;
		font-size: 14px;
		color: rgba(255,255,255,.7)
	}

	.Fcloud__status-color{
		position: absolute;
		height: 15px;
		width: 15px;
		background-color: #fff;
		border-radius: 50%;
		top: 50%;
		left: -25px;
		transform: translateY(-50%);
	}

	.Fcloud__buttons{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 20px;
	}

	.Fcloud__button{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: transform .1s ease;
	}

	.Fcloud__BTN-icon{
		padding: 10px;
		background: #f3f3f3;
		border-radius: 14px;
		height: 40px;
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
		transition:
			background-color .1s ease,
			box-shadow .1s ease;
	}

	.Fcloud__BTN-title{
		color: rgba(255,255,255,.8);
		font-weight: 600;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, .2);
		transition:
			color .1s ease,
			text-shadow .1s ease;
	}

	.Fcloud__button:hover .Fcloud__BTN-icon{
		background-color: #fff;
		box-shadow: 2px 2px 7px rgba(0, 0, 0, .2);
	}

	.Fcloud__button:hover .Fcloud__BTN-title{		
		text-shadow: 2px 2px 5px rgba(0, 0, 0, .2);
		color: rgba(255,255,255,1);
	}

	.Fcloud__button:active{
		transform: scale(1.05);
	}

	.Fcloud__button.disabled{
		opacity: 0.8;
		transform: scale(.8);
		color: #c9c9c9;
	}

	.Fcloud__button.disabled .Fcloud__BTN-title{
		color: rgba(255,255,255,.4)
	}

	.Fcloud__button.disabled:hover{
		transform: scale(0.81)
	}

	.Fcloud__info{
		background: #f0f3f6;
		flex: 1 0;
		border-radius: 35px 35px 0 0;
		margin-top: 30px;
		padding: 10px 30px 0;
	}

	.Fcloud__info-header{
		text-align: center;
	}

	.Fcloud__back{
		font-weight: bold;
		color: #fff;
		font-size: 1.4rem;
	}

	.Fcloud__info-title{
		font-weight: bold;
		text-align: center;
		font-size: 1.2rem;
	}

	.Fcloud__main-info{
		margin-top: 20px;
		background: #fff;
		border-radius: 15px;
		padding: 15px 0;
	}

	.Fcloud__table td{
		padding: 0 15px;
	}

	.Fcloud__table td:first-child{
		color: rgba(0,0,0,.5);
	}




	.block{
		margin-top: 10px;
	}
	
	.Fcloud__block-header{
		font-weight: 700;
		font-size: 1rem;
		color: #919392;
	}

	.Fcloud__block-content{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 8px;
		font-size: 1rem;
		background-color: #fff;
		border-radius: 20px;
		padding: 10px 0;
	}

	.block__column{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	.block__title{
		color: #919392;
	}

	/* .permissions *{
		border: 1px solid black;
	} */
	.permissions td:not(:first-child){
		text-align: center;
		width: 80px;
	}
	.permissions th{
		text-align: center;
		font-weight: 600;
	}
	.permissions td:first-child{
		color: #919392;
	}

	.glowing-animations {
		animation: glowing 1.5s ease infinite;
	}

	@keyframes glowing {
		from, to {
			opacity: 1;
		}
		50% {
			opacity: .5;
		}
	}

/* ANIMATIONS AFTER LOADING */

	.opencloud-enter-active, .opencloud-leave-active {
		transition: opacity .6s;
	}
	.opencloud-enter, .opencloud-leave-to /* .fade-leave-active до версии 2.1.8 */ {
		opacity: 0;
	}

	.opencloud-enter-active .Fcloud__header-title{
		transition: transform .2s .4s ease;
	}

	.opencloud-enter .Fcloud__header-title{
		transform-origin: center left;
		transform: translateY(-50px) rotate(10deg);
	}

	.opencloud-enter-active .Fcloud__info{
		transition:
			opacity .2s .2s ease,
			transform .2s .2s ease;
	}

	.opencloud-enter .Fcloud__info{
		transform: translateY(200px);
		opacity: 0;
	}

	.opencloud-enter-active .Fcloud__button{
		transition:
			opacity .2s .1s ease,
			transform .2s .1s ease;
	}

	.opencloud-enter .Fcloud__button{
		transform: scale(.5) rotate(15deg);
		opacity: 0;
	}

/* disabled button animation */

.disabled:active {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% {
    transform: translateX(-1px) scale(.85);
  }
  
  20%, 80% {
    transform: translateX(2px) scale(.85);
  }

  30%, 50%, 70% {
    transform: translateX(-4px) scale(.85);
  }

  40%, 60% {
    transform: translateX(4px) scale(.85);
  }
}








</style>