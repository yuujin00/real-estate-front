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
		margin: '10px 10px',
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

	//로그인
	registerForm: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: '0px 10px',
		gap: 15,
	},

	header: {
		position: 'fixed',
  		top: 20,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: '20px 30px 0px 0px',
	},

	signupFont: {
		margin: '10px',
		paddingLeft: '60px',
		fontSize: '18px',
	},
	
	loginFont: {
		margin: '10px',
		paddingLeft: '60px',
		fontSize: '18px',
	},

	JoinFont: {
		width: '100%',
		margin: '0 auto',
		fontWeight: 'bold',
		fontSize: '30px',
		textAlign: 'center',
	},

	sloginFont: {
		width: '100%',
		margin: '0 auto',
		marginBottom: '10px',
		fontSize: '15px',
		textAlign: 'center',
	},

	loginForm: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: '0px 30px',
		gap: 15,
	},
	signForm: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: '0px 30px',
		gap: 15,
	},
	loginOption: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 5,
		fontSize: '14px',
	},
	loginOption_: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 12,
		fontSize: '14px',
	},
	startGrid: {
		display: 'flex',
		justifyContent: 'center',
		padding: '20px 0px 10px 0px',
	},
	error: {
		textAlign: 'center',
		fontSize: '12px',
		color: '#E7735A',
	},
};

export const StyledGrid = styled(Grid)(({ theme }) => ({
	...(styles[theme] || {}),
}));