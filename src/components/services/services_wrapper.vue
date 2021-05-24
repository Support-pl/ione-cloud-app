<template>
	<div class="services__wrapper">
		<service-item
			v-for="service in services"
			:key="service.title"
			:service="service"
		/>
	</div>
</template>

<script>
import serviceItem from './service.vue';
export default {
	name: "services-wrapper",
	components: {
		serviceItem,
	},
	data(){
		return {
			services: [
				{
					title: 'PaaS',
					icon: 'database',
					onclick: {
						function: this.routeTo,
						paramsArr: [{name: 'newPaaS'}],
					}
				},
				{
					title: 'IaaS',
					icon: 'database',
					onclick: {
						function: this.routeTo,
						paramsArr: [{name: 'newVDC'}],
					}
				},
				{
					title: 'SSL',
					icon: 'database',
					onclick: {
						function: this.routeTo,
						paramsArr: [{name: 'services'}],
					}
				},
			],
		}
	},
	methods: {
		routeTo(param){
			this.$router.push(param);
		}
	}
}
</script>

<style>
.services__wrapper{
	/* background-color: red; */
	display: grid;
	grid-gap: 5px;
	grid-template-columns: repeat(3, 1fr);
}
</style>