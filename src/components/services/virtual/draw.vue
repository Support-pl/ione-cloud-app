<template>
	<div class="module">
		<a-row :gutter='[10, 10]'>
			<a-col :md="12" :xs="12" :sm="12">
				<div class="service-page__info">
					<div class="service-page__info-title">{{$t('virtual_product.used space') | capitalize}}:</div>

					<div class="service-page__info-value">{{service.diskusage}}MB / {{service.disklimit}}MB ({{service.diskusage / service.disklimit * 100}}%)</div>
   				<a-progress :percent="service.diskusage / service.disklimit * 100" :show-info="false" />
				</div>
			</a-col>

			<a-col :md="12" :xs="12" :sm="12">
				<div class="service-page__info">
					<div class="service-page__info-title">{{$t('virtual_product.bw') | capitalize}}:</div>

					<div class="service-page__info-value">{{service.bwusage}}MB / {{service.bwlimit ? service.bwlimit + 'MB' + ' (' + service.bwusage / service.bwlimit * 100 + '%)' : $t('virtual_product.unlimited')}}</div>
   				<a-progress :percent="service.bwusage / service.bwlimit * 100" :show-info="false" />
				</div>
			</a-col>
		</a-row>

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