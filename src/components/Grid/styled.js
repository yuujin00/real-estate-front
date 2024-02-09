import { styled, Grid } from '@mui/material';

const styles = {
	//헤더
	
	main_background: {
		marginTop: '50px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
	},

	headerMain: {
		display: 'flex',
		justifyContent: 'left',
		margin: '20px 0px',
	},

	headerTitle: {
		flex: 0.9,
		marginTop: 6,
		color: '#88BDE7',
		textAlign: 'center',
		fontSize: '28px',
		fontWeight: 700,
		marginRight: '18px',
	},
	
	onboardingSlide: {
		padding: '20px',
	},

	onboardingButton: {
		display: 'flex',
		justifyContent: 'center',
		padding: '20px 0px',
	},
	onboardingContent: {
		padding: '0px 10px',
		lineHeight: 1.5,
		fontSize: '18px',
	},
};

export const StyledGrid = styled(Grid)(({ theme }) => ({
	...(styles[theme] || {}),
}));