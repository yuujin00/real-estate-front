import axios from 'axios';

const instance = axios.create({
	baseURL: "http://3.35.10.79:8080",
	headers: {
		'Content-Type': 'application/json',
	},
});
export default instance;