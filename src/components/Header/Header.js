import React, { useState } from 'react';
import { styled, Modal, Box, Dialog } from '@mui/material';
import { Grid, Button, Img } from '..';
import instance from '../../api/axios';

function Header({ onBackButtonClick }) {

	return (
		<>
			<Grid theme='header_'>
                <Button theme='headerTitle' children='부동맞춤' />
            </Grid>
		</>
	);
}

const buttonStyle = {
	background: '#fff',
	border: 'none',
	cursor: 'pointer',
};

export default Header;