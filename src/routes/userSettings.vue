<template>
	<div class="user__settings">
		<div class="container">
			<div class="content__wrapper">
				<div class="content__title">
					Личный кабинет
					<span class="content__small">
						#{{user.id}}
					</span>
				</div>

				<div class="content__fields-wrapper">
					<a-form-model layout="vertical" :model="form" >
							<a-form-model-item v-for="(item, key) in form" :key="key" :label="key">
								<a-input v-model="form[key]" placeholder="input placeholder" />
							</a-form-model-item>
							<a-form-model-item>
								<a-button-group>
									<a-button type="primary">
										Submit
									</a-button>
									<a-button @click="installDataToBuffer">
										Cancel
									</a-button>
								</a-button-group>
							</a-form-model-item>
						</a-form-model>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from "@/api.js";

export default {
	name: 'userSettings-view',
	data(){
		return {
			form: {

			}
		}
	},
	methods: {
		installDataToBuffer(){
			const interestedKeys = ['firstname', 'lastname', 'companyname', 'email', 'address1', 'address2', 'city', 'state', 'postcode', 'countryname', 'phonecc', 'phonenumber'];
			interestedKeys.forEach(key => {
				this.$set(this.form, key, this.userData[key]);
			});
		}
	},
	computed: {
		...mapGetters({
			user: 'getUser',
			userData: 'getUserData'
		})
	},
	mounted(){
		api.sendAsUser('clientDetails')
		.then(res => {
			console.log(res);
			this.$store.commit('setUserData', res);
			this.installDataToBuffer();
		})
		.catch(res => {
			console.error(res);
		})
	}
}
</script>

<style>
.user__settings{
	padding-top: 10px;
}


.content__wrapper{
	background: #fff;
	border-radius: 10px;
	padding: 10px 10px 15px 10px;
}

.content__title{
	font-size: 1.6rem;
}

.content__small{
	font-size: .7em;
	opacity: .5;
}
</style>