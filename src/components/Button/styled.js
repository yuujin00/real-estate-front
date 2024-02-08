import { styled } from '@mui/material';
import MuiButton from '@mui/material/Button';

const styles = {
    mainStartBtn: {
		display: 'flex',
		width: '280px',
		padding: '13px',
		margin: '20px 0px',
		justifyContent: 'center',
		textAlign: 'center',
		fontWeight: 'bold',
		borderRadius: '8px',
		background: '#A3C7F7',
		color: '#fff',
		'&:hover': {
			background: '#88BDE7',
		},
	},
};

export const StyledButton = styled(MuiButton)(({ theme }) => ({
	...(styles[theme] || {}),
}));