<template>
	<div class="balance">
		<span class="balance__item" @click="showModal" :class="{ clickable: clickable }">
			{{user.balance}} 
			<a-badge v-if="clickable" :count="'+'" :offset="[10, -8]">
				{{user.currency_code}}
			</a-badge>
			<template v-else>
				{{user.currency_code}}
			</template>
		</span>
		<addFunds :modalVisible="modalVisible" :hideModal="hideModal"/>
	</div>
</template>

<script>
import addFunds from "./addFunds.vue";
import md5 from 'md5'
export default {
	name: "balance_item",
	components: {
		addFunds
	},
	props: {
		clickable: {
			type: Boolean,
			default: true
		}
	},
  data() {
    return {
      modalVisible: false,
			confirmLoading: false,
			amount: 10,
			btns: [
				5, 10, 50, 100, 500, 1000
			],
			stay: false
    };
  },
	mounted(){
		let userinfo = {
			userid: this.user.id,
			secret: md5('getBalance' + this.user.id + this.user.secret)
		}
		this.$axios.get("getBalance.php?" + this.URLparameter(userinfo))
			.then( res => {
				// console.log(res);
				if(this.user.id == res.data.userid){
					this.$store.dispatch("updateBalance", res.data.balance);
					this.$store.dispatch("updateCurrency", res.data.currency_code);
				}
			})
			.catch( err => console.error(err));
	},
	computed:{
		user(){
			return this.$store.getters.getUser;
		},
	},
	methods: {
		URLparameter(obj, outer = ''){
			var str = "";
			for (var key in obj) {
				if(key == "price") continue;
				if (str != "") {
						str += "&";
				}
				if(typeof obj[key] == 'object') {
					str += this.URLparameter(obj[key], outer+key);
				} else {
					str += outer + key + "=" + encodeURIComponent(obj[key]);
				}
			}
			return str;
		},
		showModal() {
			if(this.clickable){
				this.modalVisible = true;
			}
    },
		hideModal() {
			this.modalVisible = false;
    },
    handleOk(e) {
      this.confirmLoading = true;
			let userinfo = {
				userid: this.user.id,
				amount: this.amount,
				secret: md5('addFunds' + this.user.id + this.user.secret),
			}
			this.$axios.get("addFunds.php?" + this.URLparameter(userinfo))
				.then( res => {
					this.modalVisible = false;
					this.confirmLoading = false;
					if(!this.stay){
						this.$router.push({path: `/invoice-${res.data.invoiceid}`});
					} else {
						this.$message.success(`Now look invoice#${res.data.invoiceid}`);
					}
				})
				.catch( err => {
					
					console.error(err)
				});
    },
    handleCancel(e) {
      this.modalVisible = false;
		},
		addAmount(amount){
			if(this.amount == "") this.amount = 0
			this.amount += amount;
		}
	}
}
</script>

<style>
.balance__item.clickable{
	cursor: pointer;
}

.balance__item .ant-badge-count{
	font-size: 1rem;
}
</style>