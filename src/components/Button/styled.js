import { styled } from '@mui/material';
import MuiButton from '@mui/material/Button';

const styles = {
	headerTitle: {
		marginTop: 6,
		color: '#D99E73',
		textAlign: 'left',
		fontSize: '28px',
		fontWeight: 700,
		width: '100px',
	},

	mainStartBtn: {
		display: 'flex',
		width: '280px',
		padding: '18px',
		margin: '10px 20px',
		justifyContent: 'center',
		textAlign: 'center',
		fontWeight: 'bold',
		borderRadius: '25px',
		background: '#D99E73',
		boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		color: '#fff',
		'&:hover': {
			background: '#ECCCB1',
		},
	},
	

	//로그인
	// 회원가입
	signupBtn: {
		color: '#5E4017',
		cursor: 'pointer',
		textDecorationLine: 'underline',
		background: '#fff',
		border: 'none',
		padding: '3px 5px 1px',
	},

	signupBtn_: {
		color: 'Black',
		cursor: 'pointer',
		background: '#fff',
		border: 'none',
		paddingTop: '7px',
	},

	startBtn: {
		display: 'flex',
		width: '260px',
		padding: '8px',
		margin: '10px 20px',
		justifyContent: 'center',
		textAlign: 'center',
		fontWeight: 'bold',
		borderRadius: '25px',
		background: '#D99E73', 
		fontSize: '20px',
		color: '#fff',
		'&:hover': {
			background: '#ECCCB1',
		},
	},

	emailcheckBtn: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 'px 10px',
		backgroundColor: '#88bde7',
		color: '#fff',
		'&:hover': {
			background: '#88BDE7',
		},
	},

	loginBtn: {
		borderRadius: '10px',
		padding: '11.5px 5.5px',
		display: 'flex',
		alignItems: 'center',
		border: '1px solid rgba(0, 0, 0, 0.2)',
	},

};

export const StyledButton = styled(MuiButton)(({ theme }) => ({
	...(styles[theme] || {}),
}));