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

	header_: {
		position: 'fixed',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: '20px 30px 0px 0px',
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
		maxWidth:'390px',
		backgroundColor : 'white',
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

	// 매물등록
	RegisFont: {
		position: 'fixed',
		top:20,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: '24px 30px 0px 145px',
		fontWeight: 'bold',
		fontSize: '24px',
		textAlign: 'center',
	},

	header__: {
		position: 'fixed',
  		top: 20,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: '20px 30px 0px 0px',
		maxWidth:'390px',
		backgroundColor : 'white',
	},
};

export const StyledGrid = styled(Grid)(({ theme }) => ({
	...(styles[theme] || {}),
}));