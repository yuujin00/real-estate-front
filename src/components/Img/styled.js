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
		width: '30px', // 이미지의 너비
        height: '32px', // 이미지의 높이
		marginTop: '4px', 
	},

	loginImage_ : {
		width: '20px', // 이미지의 너비
        height: '20px', // 이미지의 높이
	},
};

export const StyledImg = styled('img')(({ theme }) => ({
	...(styles[theme] || {}),
}));