<template>
	<div class='vnc__page'>
		<header class='vnc__header'>
			
			<div class='header__back'>
				<router-link :to="{path: `/cloud-${$route.params.pathMatch}`}">
					<a-icon type="left"></a-icon>
				</router-link>
			</div>

			<div class="header__title">VNC for VM: {{$route.params.pathMatch}} status: {{status}}</div>
			
			<div class="header__btns">
				<button v-if='false'>
					show keyboard
				</button>
				<button @click='sendCtrlAltDel'>
					send ctrl+alt+del
				</button>
			</div>


		</header>

		<main>
			<h2>now there test VMs with ids 4394 и 4364 from vcloud</h2>
			<div id="vnc-screen" ref='vncscreen'></div>
		</main>

	</div>
</template>

<script>
import md5 from 'md5'
import RFB from '../../../libs/noVNC/core/rfb.js';

export default {
	name: 'vnc',
	data(){
		return {
			status: '',
			desktopName: '',
			rfb: null,

			curTok: 0,
			token: '',
			url: '',
		}
	},
	created(){
		this.getToken();
	},
	mounted(){
	},
	methods:{
		getToken(){
			const user = this.$store.getters.getUser;
			const userid = user.id;

			const vmid = this.$route.params.pathMatch

			let close_your_eyes = md5('getVNCtoken' + vmid + userid + user.secret);
			let url = `/getVNCtoken.php?userid=${userid}&vmid=${vmid}&secret=${close_your_eyes}`

			this.$axios.get(url)
				.then( res => {
					this.token = res.data.response.token;
					this.desktopName = res.data.response.vm_name;
					this.url = res.data.response.url;
					this.connect(this.token);
				})
				.catch( err => console.error(err));
		},
		connect(token){
			this.$refs.vncscreen.innerHTML = '';
			this.make_status("Connecting");
			let host = this.url;
			let path = 'websockify';
			let proxy_port = 29876;
			let password = '';
			let _is_encrypted = '';
			let url = '';			

			if (window.location.protocol === "https:" || ~window.location.host.search(/localhost/)) {
				url = "wss";
				_is_encrypted ="encrypted";
			} else {
				url = "ws";
				_is_encrypted ="unencrypted";
			}

			url += "://" + host;
			url += ":" + proxy_port;
			url += '/' + path;
			url += `?token=${token}`;

			this.rfb = new RFB(document.getElementById('vnc-screen'), url,
				{
					credentials: { password: password },
					wsProtocols: ['binary', 'base64'],
				}
			);

			this.rfb.addEventListener("connect",  this.connectedToServer);
			this.rfb.addEventListener("disconnect", this.disconnectedFromServer);
			this.rfb.addEventListener("credentialsrequired", this.credentialsAreRequired);
			this.rfb.addEventListener("desktopname", this.updateDesktopName);

			// this.rfb.scaleViewport = true;
		},
		connectedToServer(e){
			this.make_status("Connected to " + this.desktopName);
		},
		disconnectedFromServer(e) {
			if (e.detail.clean) {
				this.make_status("Disconnected");
			} else {
				this.make_status("Something went wrong, connection is closed");
			}
		},
		credentialsAreRequired(e) {
			const password = prompt("Password Required:");
			this.rfb.sendCredentials({ password: password });
		},
		updateDesktopName(e) {
			this.desktopName = e.detail.name;
		},
		sendCtrlAltDel() {
			console.log('ctrlaltdel sended')
			this.rfb.sendCtrlAltDel();
			return false;
		},
		make_status(text) {
			this.status = text;
		}
	}
}
</script>

<style>
.vnc__header{
	display: flex;
	justify-content: space-around;
}
</style>