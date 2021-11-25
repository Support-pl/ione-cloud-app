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
import serviceItem from './service_min.vue';
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
					translatable: true,
					icon: 'database',
					onclick: {
						function: this.routeTo,
						paramsArr: [{name: 'cloud'}],
					}
				},
				// {
				// 	title: 'Cloud',
				// 	translatable: true,
				// 	icon: 'cloud-server',
				// 	onclick: {
				// 		function: this.routeTo,
				// 		paramsArr: [{name: 'cloud', query: {type: 'IaaS'}}],
				// 	}
				// },
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
				{
					title: 'Virtual',
					translatable: true,
					icon: 'solution',
					onclick: {
						function: this.routeTo,
						paramsArr: [{name: 'products', query: {type: 'virtual'}}],
					}
				},
			],
		}
	},
	methods: {
		routeTo(param){
			if(this.user){
				this.$router.push(param);
				return
			}
			const config = this.$config;
			let type = param.query.type;
			type = type == 'PaaS' ? 'VM' : type;
			const service = config.services[type]
			console.log(service);
			if(service.creationRouteName){
				this.$router.push({name: service.creationRouteName});
			} else {
				this.$router.push({name: `service-${type}`});
			}
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
	},
	computed: {
		user(){
			return this.$store.getters.getUser;
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