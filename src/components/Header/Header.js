import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Modal, Box, Dialog } from '@mui/material';
import { Grid, Button, Img } from '..';
import budong from '../../assets/images/bg.png';

function Header({ onBackButtonClick }) {
	const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/main');
    };

	return (
		<>
			<Grid theme='header_'>
                <Button 
                    theme='headerTitle' 
                    children='budong' 
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