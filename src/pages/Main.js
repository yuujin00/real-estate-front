import { useNavigate } from 'react-router-dom';
import { Grid, Button, Img } from '../components/index.js';
import { createTheme,ThemeProvider } from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import checkmark from '../assets/images/checkmark.png';
import arrow from '../assets/images/arrow.png';
import a from '../assets/images/a.png';
import b from '../assets/images/b.png';
import c from '../assets/images/c.png';
import d from '../assets/images/d.png';
import message from '../assets/images/message.png';
import UnderBar from '../components/Bar/MainUnderBar.js';

export const theme = createTheme({
	palette: {
      primary: {
        main: "#ECCCB1",
        // light: main값을 통해 계산됨
  	    // dark: main값을 통해 계산됨
        // contrastText: main값을 통해 계산됨
      },
    }
});

function Main(){
    const navigate = useNavigate();

    const onClickPropertyRegis = () => {
        navigate('/propertyRegis');
    }

    const onClickPropertyTrans = () => {
        navigate('/propertyTrans');
    }

    const onClickPropertyTransApart = () => {
        navigate('/propertyTransApart');
    }

    const onClickChat = () => {
        navigate('/chat');
    }
    
    return(
        <>  
            <div style={mainWrap}>

            <div style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '30px', color: 'black' }}>부동산 원스톱 전자계약</div>
            <br/>
            <div style={{ fontSize: '15px', marginTop: '3px', marginLeft: '30px', marginBottom: '3px', color: '#757575' }}>수수료 없이 <br></br> 종이·날인 없이</div>
            <br/>
            
                <Grid theme='loginForm' >
                    <Button theme='RegisStart' onClick={onClickPropertyRegis} >
                        <Img theme='checkmark' src={checkmark} alt='checkmark' />
                        <span style={{fontSize:'20px', color:'Black',  textAlign: 'left'}}> 매물 등록하기
                        <div style={{ marginTop:'0px', fontSize:'12px',color:'#828282',lineHeight: '1.2' }}>가장 빠르고 좋은 가격으로<br></br>거래를 시작하세요.</div></span>
                        <Img theme='arrow_' src={arrow} alt='arrow' />
                    </Button>

                    <Grid theme='loginOption'>
                        <Button theme='TransStart' onClick={onClickPropertyTransApart} >
                            <div style={{fontSize:'20px', color:'Black',  textAlign: 'center'}}> 
                            <Img src={a} alt='a' />
                            <br></br>아파트</div>
                        </Button>
                        <Button theme='TransStart' onClick={onClickPropertyTrans} >
                            <div style={{fontSize:'20px', color:'Black',  textAlign: 'center'}}> 
                            <Img src={b} alt='b' />
                            <br></br>빌라/투룸+</div>
                        </Button>
                    </Grid>
                    <Grid theme='loginOption'>
                    <Button theme='TransStart' onClick={onClickPropertyTrans} >
                            <div style={{fontSize:'20px', color:'Black',  textAlign: 'center'}}> 
                            <Img src={c} alt='c' />
                            <br></br>원룸</div>
                        </Button>
                        <Button theme='TransStart' onClick={onClickPropertyTrans} >
                            <div style={{fontSize:'20px', color:'Black',  textAlign: 'center'}}> 
                            <Img src={d} alt='d' />
                            <br></br>오피스텔</div>
                        </Button>
                    </Grid>
                    
                    <ThemeProvider theme={theme}>
                        <Fab color="primary" style={{ position: 'fixed', right: '10%', top: '60%'}} onClick={onClickChat}>
                            <div style={{ fontSize: '7px', color: 'Black', textAlign: 'center' }}>
                                <Img src={message} alt='message' />
                            </div>
                        </Fab>
                    </ThemeProvider>
                </Grid>
                <br/>
                <UnderBar />
            </div>
            
        </>
    );
};

const mainWrap = {
    height: '640px',
    margin: 0,
};

export default Main;