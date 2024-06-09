import React, { useState } from 'react';
import instance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Alert, AlertTitle } from '@mui/material';
import { Grid, Button, Img } from '../components';
import arrow from '../assets/images/arrow.png';
import email1 from '../assets/images/email.png';
import password1 from '../assets/images/password.png';
import naver from '../assets/images/naver.png';
import kakao from '../assets/images/kakao.png';
import google from '../assets/images/google.png';

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successLogin, setSuccessLogin] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const onClickSignup = () => {
        navigate('/signup');
    };

    const onClickArrow = () => {
        navigate('/');
    };

    const handleClick = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000); // Hide the message after 2 seconds
    };

    // Function to handle changes in the email input field
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Function to handle changes in the password input field
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await instance.post(
                '/realEstate/user/login',
                {
                    email: email,
                    password: password,
                },
            );

            console.log(response);
            // Extracting token from the new response structure
            const token = response.data.result.token;
            const userEmail = response.data.userEmail;
            // Store the token in LocalStorage
            localStorage.setItem('token', token);
            // Store the user email in LocalStorage
            localStorage.setItem('userEmail', userEmail);

            // Handle successful login
            console.log('로그인 성공:');

            // Navigate to main
            navigate('/main');
        } catch (error) {
            // Handle login failure
            setSuccessLogin(false);
            console.error('로그인 실패:', error);
        }
        sessionStorage.setItem('email', email);
    };

    return (
        <>
            <div style={loginWrap}>
                <div style={{ height: '70px' }}></div>
                <Grid theme='onboardingSlide'>
                    <Grid theme='JoinFont'>로그인</Grid>
                    <br/>
                    <form onSubmit={handleFormSubmit}>
                        <Grid theme='loginForm'>
                            <Grid theme='loginOption'>
                                <Img theme='loginImage' src={email1} />
                                <TextField 
                                    id='email' 
                                    type='email' 
                                    label='이메일' 
                                    variant='outlined' 
                                    size='small' 
                                    onChange={handleEmailChange} 
                                />
                            </Grid>
                            <Grid theme='loginOption'>
                                <Img theme='loginImage' src={password1} />
                                <TextField
                                    id='password'
                                    type='password'
                                    label='패스워드'
                                    variant='outlined'
                                    size='small'
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid theme='startGrid'>
                            <Button theme='startBtn' children='로그인' type='submit' />
                        </Grid>
                        {successLogin ? null : (
                            <div style={{
                                width: '70%', // Adjust width to fit the content
                                margin: 'auto', // Center align
                                padding: '0px 0px 10px',
                            }}>
                                <Alert 
                                    severity='error' 
                                    style={{ 
                                        fontSize: '12px',
                                        padding: '0px 5px 0px 10px',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    <AlertTitle>로그인 실패</AlertTitle>
                                    <strong>아이디</strong>와 <strong>비밀번호</strong>를 확인해보세요.
                                </Alert>
                            </div>
                        )}
                        <Grid theme='loginForm'>
                            <hr style={{ width: '50%', height: '3px', backgroundColor: '#ccc', border: 'none' }} />
                            <Grid theme='sloginFont'>소셜 로그인하기</Grid>
                            <Grid theme='loginOption_'>
                                <Button theme='loginBtn' onClick={handleClick}>
                                    <Img theme='loginImage_' src={naver} />
                                </Button>
                                <Button theme='loginBtn' onClick={handleClick}>
                                    <Img theme='loginImage_' src={google} />
                                </Button>
                                <Button theme='loginBtn' onClick={handleClick}>
                                    <Img theme='loginImage__' src={kakao} />
                                </Button>
                            </Grid>
                            <Grid theme='loginOption'>
                                <div style={{ marginTop: '5px', color: '#757575' }}>계정이 없으신가요?
                                    <Button theme='signupBtn' children='회원가입' onClick={onClickSignup} />
                                </div>
                            </Grid>
                            <Grid theme='loginOption'>
                                <Button theme='signupBtn_' children='아이디 찾기' onClick={handleClick} /> 
                                <div style={{ marginTop: '10px', color: '#757575' }}>|</div>
                                <Button theme='signupBtn_' children='비밀번호 찾기' onClick={handleClick} />
                            </Grid>
                            {showMessage && <div style={{fontSize:'14px'}}><center>현재 개발 진행 중에 있습니다.<br />빠른 시일 내에 제공하도록 하겠습니다.</center></div>}
                        </Grid>
                    </form>
                </Grid>
            </div>
        </>
    );
};

const loginWrap = {
    height: '100%',
};

export default Login;
