<template>
	<div class="cloud__fullscreen Fcloud">
		<div class="cloud__container">
		<div class="Fcloud">
			<div class="Fcloud__header">
				<div class="Fcloud__back-wrapper">
					<router-link class="Fcloud__back icon__wrapper" to="cloud">
						<a-icon type="left" />
					</router-link>
				</div>
				<div class="Fcloud__header-title">
					<div class="Fcloud__status-color" :style="{'background-color': statusColor}"></div>
					<div class="Fcloud__title">{{cloud.NAME}}</div>
					<div class="Fcloud__status">{{cloud.STATE}}</div>
				</div>
			</div>
			<div class="Fcloud__buttons">
				<div v-if="cloud.STATE.toLowerCase() == 'running'" class="Fcloud__button" @click="sendAction('Shutdown')">
					<div class="Fcloud__BTN-icon">
						<a-icon type="pause" />
					</div>
					<div class="Fcloud__BTN-title">Stop</div>
				</div>
				<div v-else class="Fcloud__button" @click='sendAction("Start")'>
					<div class="Fcloud__BTN-icon">
						<a-icon type="caret-right" />
					</div>
					<div class="Fcloud__BTN-title">Start</div>
				</div>
				<div class="Fcloud__button" @click='sendAction("Restart")'>
					<div class="Fcloud__BTN-icon">
						<a-icon type="redo" />
					</div>
					<div class="Fcloud__BTN-title">Restart</div>
				</div>
				<div class="Fcloud__button" @click='sendAction("Shutdown")'>
					<div class="Fcloud__BTN-icon">
						<a-icon type="stop" />
					</div>
					<div class="Fcloud__BTN-title">Shutdown</div>
				</div>
			</div>

			
			<div class="Fcloud__info">
				<div class="Fcloud__info-header">
					<div class="Fcloud__info-title">Infomation</div>
				</div>

				<div class="Fcloud__main-info">
					<table class="Fcloud__table">
						<tbody>
							<tr>
								<td>Start time</td>
								<td>1593171442</td> <!-- change to dynamic data -->
							</tr>
							<tr>
								<td>Host</td>
								<td>{{cloud.HOST}}</td> <!-- change to dynamic data -->
							</tr>
							<tr>
								<td>IP</td>
								<td>{{cloud.IP}}</td> <!-- change to dynamic data -->
							</tr>
						</tbody>
					</table>
				</div>

				<div class="Fcloud__info-block block">
					<div class="Fcloud__block-header">
						<a-icon type="setting" theme="filled" />
						Capacity
					</div>
					<div class="Fcloud__block-content">
						<div class="block__column">
							<div class="block__title">CPU</div>
							<div class="block__value">{{cloud.CPU}}</div>
						</div>
						<div class="block__column">
							<div class="block__title">VCPU</div>
							<div class="block__value">2 no in date</div>
						</div>
						<div class="block__column">
							<div class="block__title">Memory</div>
							<div class="block__value">{{cloud.RAM}} MB</div>
						</div>
					</div>
				</div>

				<div class="Fcloud__info-block block">
					<div class="Fcloud__block-header">
						<a-icon type="database" theme="filled" />
						Storage
					</div>
					<div class="Fcloud__block-content">
						<div class="block__column">
							<div class="block__title">Type</div>
							<div class="block__value">{{cloud.DS_TYPE}}</div>
						</div>
						<div class="block__column">
							<div class="block__title">Size</div>
							<div class="block__value">10 GB no in date</div>
						</div>
					</div>
				</div>

				<div v-if="permissions" class="Fcloud__info-block block">
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
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
	name: "openCloud",
	data(){
		return {
			status: 'running',
			name: 'test3',
			permissions: false,
		}
	},
	computed: {
		statusColor(){
			let color = '';
			switch (this.status) {
				case 'running':
					color = '#0fd058';
					break;
				case 'poweroff':
					color = '#919191';
					break;
				case 'suspend':
					color = '#f9f038';
					break;
				default:
					color = '#f9f038';
					break;
			}
			return color;
		},
		cloud(){
			return this.$store.getters['cloud/getCloudById'](this.$route.params.pathMatch);
		}
	},
	created(){
		this.$store.dispatch('cloud/fetchClouds');
	},
	methods: {
		sendAction(action){
			const userid = this.$store.getters.getUser.id;
			const vmid = this.cloud.ID;
			axios.get(`https://devwhmcs.support.by/app_cloud_mobile/vmaction.php?userid=${userid}&action=${action}&vmid=${vmid}`)
			.then(res => {
				console.log(res);
				this.$store.dispatch('cloud/fetchClouds');
			})
			console.log(action)

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

	.Fcloud__button:hover{
		transform: scale(1.1);
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
</style>