<template>
	<div class="user__settings">
		<div class="container">
			<div class="content__wrapper">
				<div class="content__title">
					Personal Area
					<span class="content__small">
						#{{user.id}}
					</span>
				</div>

				<div class="content__fields-wrapper">
					<a-form-model layout="vertical" :model="form" v-if="form.firstname">

						<a-form-model-item v-for="(item, key) in form" :key="key" :label="$t('clientinfo.'+key) | capitalize">
							<a-input v-model="form[key]" placeholder="input placeholder" />
						</a-form-model-item>

						<a-form-model-item>
							<!-- <a-button-group> -->
								<a-button class="user__button user__button--submit" type="primary" @click="sendInfo" :disabled="Object.keys(deltaInfo).length == 0" :loading="isSendingInfo">
									{{$t('Submit')}}
								</a-button>
								<a-button class="user__button user__button--cancel" @click="installDataToBuffer">
									{{$t('Cancel')}}
								</a-button>
							<!-- </a-button-group> -->
						</a-form-model-item>
						
					</a-form-model>

					<loading v-else/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from "@/api.js";
import loading from "@/components/loading/loading";

export default {
	name: 'userSettings-view',
	components: {
		loading
	},
	data(){
		return {
			form: {

			},
			isSendingInfo: false
		}
	},
	methods: {
		installDataToBuffer(){
			const interestedKeys = ['firstname', 'lastname', 'companyname', 'email', 'address1', 'address2', 'city', 'state', 'postcode', 'countryname', 'phonenumber'];
			interestedKeys.forEach(key => {
				this.$set(this.form, key, this.userData[key]);
			});
		},
		fetchInfo(){
			api.sendAsUser('clientDetails')
			.then(res => {
				this.$store.commit('setUserData', res);
				this.installDataToBuffer();
			})
			.catch(res => {
				console.error(res);
			})

		},
		sendInfo(){
			if(Object.keys(this.deltaInfo).length == 0) {
				return
			}

			this.isSendingInfo = true;

			api.sendAsUser('user.update', this.deltaInfo)
			.then(res=>{
				this.$message.success('success');		
				this.fetchInfo();
			})
			.catch(err => {
				console.error(err);
				this.$message.error('Something went wrong');
			})
			.finally(()=>{
				this.isSendingInfo = false; 
			})
		}
	},
	computed: {
		...mapGetters({
			user: 'getUser',
			userData: 'getUserData'
		}),
		deltaInfo(){
			const info = {...this.form};
			for(let key in info){
				if(info[key] == this.userData[key]){
					delete info[key];
				}
			}
			return info;
		}
	},
	mounted(){
		this.fetchInfo();
	}
}
</script>

<style>
.user__settings{
	padding-top: 10px;
}


.content__wrapper{
	background: var(--main);
	border-radius: 10px;
	padding: 10px 10px 15px 10px;
	color: #fff;
}

.content__title{
	font-size: 1.6rem;
}

.content__small{
	font-size: .7em;
	opacity: .5;
}

.ant-form-item-label label {
	color: #fff;
}

.ant-form-item-children input {
	background: var(--main);
	color: #fff;
}

.user__button {
	color: #fff;
	border: 2px solid #7F7FEC;
	box-sizing: border-box;
	border-radius: 5px;
}

.user__button--submit {
	background: var(--main);
}

.user__button--cancel {
	margin-left: 10px;
	background: var(--gradient);
	border: none;
}
</style>