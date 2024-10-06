import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(
	config => {
	  // 쿠키에서 토큰을 파싱하는 함수
	  function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) {
		  const cookieValue = parts.pop().split(';').shift();
		  //console.log(`Extracted cookie value for ${name}:`, cookieValue); // 로그 추가
		  return cookieValue;
		}
		//console.log(`Cookie named ${name} not found`); // 로그 추가
		return null;
	  }
  
	  const token = getCookie('token'); // 쿠키에서 토큰을 가져옴
	  //console.log('Token from cookie:', token); // 토큰 값 로깅
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