import axios from 'axios';

const instance = axios.create({
	baseURL: "https://15.164.30.195.nip.io",
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(
	config => {
	  const token = localStorage.getItem('token'); // 로컬스토리지에서 토큰을 가져옴
	  if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	  }
	  return config;
	},
	error => {
	  return Promise.reject(error);
	}
  );
  
export default instance;