import { styled } from '@mui/material';

const styles = {

	//온보딩
	onboardingImg: {
		width: '200px',
		height: 'auto',
		margin: '20px auto 0',
		display: 'block'
	},
};

export const StyledImg = styled('img')(({ theme }) => ({
	...(styles[theme] || {}),
}));