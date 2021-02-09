import axios from 'axios';
import config from './appconfig.js'

const ax = axios.create({
	baseURL: config.WHMCSsiteurl + 'app_back',
});

export default ax;