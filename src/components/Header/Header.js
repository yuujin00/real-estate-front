import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Modal, Box, Dialog } from '@mui/material';
import { Grid, Button, Img } from '..';
import budong from '../../assets/images/부동맞춤 로고_v2_without txt.svg';

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