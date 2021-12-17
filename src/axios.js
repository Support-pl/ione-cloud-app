import axios from 'axios';
import config from './appconfig.js';

import store from '@/store';

const ax = axios.create({
	baseURL: config.WHMCSsiteurl + config.appFolder,
});

ax.interceptors.response.use(response => {
	if (response.data.maintenance) {
		console.log(response, 'maintanance mode');
		store.commit('app/setMaintananceMode', true);
	}
	return response
}, error => {
	return Promise.reject(error);
});

export default ax;