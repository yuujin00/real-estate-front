import { styled } from '@mui/material';

const styles = {

	//온보딩
	onboardingImg: {
		width: '200px',
		height: 'auto',
		margin: '20px auto 0',
		display: 'block'
	},

	//로그인
	loginImage : {
		margin: '8px'
	},

	loginImage_ : {
		width: '20px', 
        height: '20px', 
	},

	loginImage__ : {
		width: '28px', 
        height: '28px', 
	},
};

export const StyledImg = styled('img')(({ theme }) => ({
	...(styles[theme] || {}),
}));