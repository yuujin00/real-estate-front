import React from 'react';
import { StyledButton } from './styled';

const Button = ({ theme, onClick, children, clicked, type }) => {
  return (
    <StyledButton theme={theme} onClick={onClick} clicked={clicked} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;