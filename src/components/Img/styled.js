import { styled } from '@mui/material';

const styles = {};

export const StyledImg = styled('img')(({ theme }) => ({
	...(styles[theme] || {}),
}));