import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Modal, Box, Dialog } from '@mui/material';
import { Grid, Button, Img } from '..';
import instance from '../../api/axios';

function Header({ onBackButtonClick }) {
	const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/PropertyPayment');
    };

	return (
		<>
			<Grid theme='header_'>
                <Button 
                    theme='headerTitle' 
                    children='부동맞춤' 
                    onClick={handleButtonClick}
                    style={buttonStyle} 
                />
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