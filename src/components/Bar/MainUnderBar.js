import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#D99E73",
    },
  }
});

function MainUnderBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (location.pathname === '/main') {
      setIndex(0);
    } else if (location.pathname === '/my') {
      setIndex(1);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setIndex(newValue);
    if (newValue === 0) {
      navigate('/home');
    } else if (newValue === 1) {
      navigate('/my');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: '198px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '100%',
            borderTop: '2px solid #DADADA',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Tabs
            value={index}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="Bottom navigation"
          >
            <Tab icon={<HomeIcon />} label="Home" />
            <Tab icon={<PersonIcon />} label="MY" />
          </Tabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MainUnderBar;
