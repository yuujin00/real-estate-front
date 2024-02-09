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
		color: '#fff',
		'&:hover': {
			background: '#ECCCB1',
		},
	},
};

export const StyledButton = styled(MuiButton)(({ theme }) => ({
	...(styles[theme] || {}),
}));