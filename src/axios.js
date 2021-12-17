import axios from 'axios';
import config from './appconfig.js'
import https from 'https';

const axiosConfig = {
	baseURL: config.WHMCSsiteurl + config.appFolder,
};

if(config.dangerModeNoSSLCheck){
	axiosConfig.httpsAgent = new https.Agent
	({
		rejectUnauthorized: false
	})
}

const ax = axios.create(axiosConfig);
export default ax;