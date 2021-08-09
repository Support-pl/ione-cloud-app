export default {
	colors: {
		main: '#427cf7',
		success: '#0fd058',
		warn: '#f9f038',
		err: '#f9383b',
		gray: '#919191',
		bright_font: '#fff',
		bright_bg: '#f7f7f7',
	},
	languages: ['en', 'ru'],
	WHMCSsiteurl: 'https://my.support.by/',
	appFolder: 'app_back/v1',
	services: {
		virtual: {
			groupname: ['Виртуальный хостинг'],
			creationRouteName: "service-virtual",
			icon: 'solution',
		},
		SSL: {
			groupname: ['GoGet SSL 2.5.6', 'SSL', 'SSL сертификаты'],
			creationRouteName: "service-SSL",
			icon: 'lock',
			additionalRoutes: [
				{
					path: 'SSL/generator/:id',
					name: `generator-SSL`,
					meta: {
						footerTile: 'services',
						isNeedBackButton: true,
						headerTitle: 'CSR generator',
					},
					componentName: 'generator'
				}
			]
		},
		VM: {
			groupname: ['Self-Service VDS (2018)', 'Self-Service VDS SSD HC', 'Self-Service VDS SSD (2018)'],
			creationRouteName: "newPaaS",
			icon: 'database',
		},
		IaaS: {
			groupname: ['IaaS'],
			creationRouteName: "newVDC",
			icon: 'cloud-server',
		},
	},
	getServiceType(groupname){
		const services = this.services;
		for(let service in services){
			const serviceGroup = services[service].groupname;
			if(typeof serviceGroup == 'object'){
				const indexOf = serviceGroup.map(el=>el.toLowerCase()).indexOf(groupname.toLowerCase())
				if(indexOf != -1) return service;
			} else {
				if(serviceGroup.toLowerCase() == groupname.toLowerCase()) return service;
			}
		}
		return null;
	}
}