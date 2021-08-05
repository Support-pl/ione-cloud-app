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
					title: 'Servers',
					icon: 'database',
					onclick: {
						function: this.routeTo,
						paramsArr: [{name: 'cloud', query: {type: 'PaaS'}}],
					}
				},
				{
					title: 'Cloud',
					icon: 'cloud-server',
					onclick: {
						function: this.routeTo,
						paramsArr: [{name: 'cloud', query: {type: 'IaaS'}}],
					}
				},
				{
					title: 'SSL',
					icon: 'lock',
					onclick: {
						// function: this.openNotification,
						// paramsArr: [{name: 'services'}],
						function: this.routeTo,
						paramsArr: [{name: 'products', query: {type: 'SSL'}}],
					}
				},
			],
		}
	},
	methods: {
		routeTo(param){
			this.$router.push(param);
		},
		openNotification() {
      this.$notification['info']({
				key: 'coming soon',
        message: 'Coming soon',
        // description:
        //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    },
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