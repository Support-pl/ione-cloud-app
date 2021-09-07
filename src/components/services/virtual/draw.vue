<template>
	<div class="module">
		<!-- <div class="module__row-title">
			Control buttons:
		</div> -->
		<a-row :gutter='[10, 10]'>
			<a-col :md="12" :xs="24" :sm="12">
				<a-button size="large" type="primary" @click="logIntoCpanel" :loading="loginLoading">{{$t('enter') | capitalize}}</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<script>
// import md5 from "md5";
import api from "@/api.js"

export default {
	name: 'virtual-draw',
	props: {
		service: {
			required: true
		}
	},
	data(){
		return {
			loginLoading: false
		}
	},
	methods: {
		logIntoCpanel(){
			this.loginLoading = true;
			api.sendAsUser('cpanel.createSession', {
				serviceid: this.service.id
			})
			.then(res => {
				if(res.result == 'error')
					throw res;
				window.open(res.data.url);
			})
			.catch(err => {
				console.error(err);
				if(err.message){
					this.$message.error(err.message);
				} else {
					this.$message.error('can\'t open cpanel');
				}
			})
			.finally(res => {
				this.loginLoading = false;
			})
		}
	}
}
</script>

<style>

.module__row-title{
	font-weight: bold;
	margin-top: 10px;
	margin-bottom: 5px;
}
</style>