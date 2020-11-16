import axios from 'axios';
import config from './appconfig.js'
export default axios.create({
	baseURL: config.WHMCSsiteurl + 'app_cloud_mobile',
});