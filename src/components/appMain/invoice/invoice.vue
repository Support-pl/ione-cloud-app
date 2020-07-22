<template>
	<div class="invoices">
		<loading v-if="isLoading" />

		<template v-else>
			<empty v-if="invoices.length == 0"/>
			<div class="invoices__wrapper">
				<singleInvoice v-for='(invoice, index) in invoices' :key='index' :invoice='invoice'/>
			</div>
		</template>
	</div>
</template>

<script>
import axios from "axios";
import md5 from "md5";
import singleInvoice from "./singleInvoice.vue";
import loading from '../../loading/loading.vue';
import empty from '../../empty/empty.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'invoices',
	components: {
		singleInvoice,
		loading,
		empty
	},
	computed: {
		user(){
			return this.$store.getters.getUser;
		},
		...mapGetters('invoices', {
			isLoading: 'isLoading',
			invoices: 'getInvoices'
		})
	},
	mounted(){
		this.$store.dispatch('invoices/fetchInvoices');
	}
}
</script>

<style>
	.invoices{
		padding: 20px 10px 0;
		overflow: auto;
		height: 100%;
	}
</style>