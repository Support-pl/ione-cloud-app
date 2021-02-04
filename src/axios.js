import axios from 'axios';
import config from './appconfig.js'

const ax = axios.create({
	baseURL: config.WHMCSsiteurl + 'back_app',
});

export default ax;