<template>
	<div class="cloud__fullscreen Fcloud">
		<div class="Fcloud__header">
			<div class="Fcloud__status-color" :style="{'background-color': statusColor}"></div>
			<div class="Fcloud__title">{{name}}</div>
			<div class="Fcloud__status">{{status}}</div>
		</div>
		<div class="Fcloud__buttons">
			<div class="Fcloud__button">
				<div class="Fcloud__BTN-icon">
					<a-icon v-if="status=='running'" type="pause" />
					<a-icon v-else type="caret-right" />
				</div>
				<div v-if="status=='running'" class="Fcloud__BTN-title">Stop</div>
				<div v-else class="Fcloud__BTN-title">Start</div>
			</div>
			<div class="Fcloud__button">
				<div class="Fcloud__BTN-icon">
					<a-icon type="redo" />
				</div>
				<div class="Fcloud__BTN-title">Restart</div>
			</div>
			<div class="Fcloud__button">
				<div class="Fcloud__BTN-icon">
					<a-icon type="sync" />
				</div>
				<div class="Fcloud__BTN-title">Recovery</div>
			</div>
		</div>

		
		<div class="Fcloud__info">
			<div class="Fcloud__info-header">
				<router-link class="Fcloud__back" to="cloud">Back</router-link>
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
							<td>MBClouD</td> <!-- change to dynamic data -->
						</tr>
						<tr>
							<td>IP</td>
							<td>185.66.71.140</td> <!-- change to dynamic data -->
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
						<div class="block__value">2</div>
					</div>
					<div class="block__column">
						<div class="block__title">VCPU</div>
						<div class="block__value">2</div>
					</div>
					<div class="block__column">
						<div class="block__title">Memory</div>
						<div class="block__value">2.0 GB</div>
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
						<div class="block__value">SSD</div>
					</div>
					<div class="block__column">
						<div class="block__title">Size</div>
						<div class="block__value">10.0 GB</div>
					</div>
				</div>
			</div>

			<div class="Fcloud__info-block block">
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
</template>

<script>
export default {
	name: "kek",
	data(){
		return {
			status: 'running',
			name: 'test3'
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
		}
	}
}
</script>

<style>
	.cloud__fullscreen{
		background: #468aff;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.Fcloud__header{
		position: sticky;
		padding: 10px 0 0 40px;
		color: #fff;
		top: 0;
		background-color: #468aff;
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
		left: 15px;
		transform: translateY(-50%);
	}

	.Fcloud__buttons{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 10px;
	}

	.Fcloud__button{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.Fcloud__BTN-icon{
		padding: 10px;
		background: #fff;
		border-radius: 14px;
		height: 40px;
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
	}

	.Fcloud__BTN-title{
		color: rgba(255,255,255,.8);
		font-weight: 600;
	}

	.Fcloud__info{
		background: #f0f3f6;
		flex: 1 0;
		border-radius: 35px 35px 0 0;
		margin-top: 60px;
		padding: 10px 30px 0;
	}

	.Fcloud__info-header{
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		align-items: center;
	}

	.Fcloud__back{
		font-weight: bold;
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

	.permissions *{
		/* border: 1px solid black; */
	}
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