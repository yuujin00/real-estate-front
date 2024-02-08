import { styled, Grid } from '@mui/material';

const styles = {
    main: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: '80px',
		margin: '0px 20px',
	},
	introTagLine: {
		marginLeft: '10px',
		fontWeight: 600,
	},
    description: {
		marginTop: '10px',
		fontSize: '14px',
		marginLeft: '10px',
	},
	main_background: {
		marginTop: '30px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
	},
};

export const StyledGrid = styled(Grid)(({ theme }) => ({
	...(styles[theme] || {}),
}));