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
	const [name, setName] = useState('');
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
        }, 2000); // 2초 후에 메시지가 사라짐
      };

      
    // email input 값 변경 시 실행되는 함수
	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	// password input 값 변경 시 실행되는 함수
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

    const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await instance.post(
				'/user/login',
				{
					name: name,
					password: password,
				},
				{
					withCredentials: true,
				},
			);

			console.log(response);
            // 토큰 값을 가져옴
			const token = response.data.accessToken;
			const userName = response.data.userName;
			// 토큰을 LocalStorage에 저장
			localStorage.setItem('token', token);
			// 유저 이름을 LocalStorage에 저장
			localStorage.setItem('userName', userName);

			// 로그인 성공 처리
			console.log('로그인 성공:');

			// 메인으로 이동
			navigate('/main');
		} catch (error) {
			// 로그인 실패 처리
			setSuccessLogin(false);
			console.error('로그인 실패:');
		}
		sessionStorage.setItem('name', name);
	};

    return (
		<>
            <div style={loginWrap}>
			<Grid theme='header'>
				<Button onClick={onClickArrow}>
					<Img theme='arrow' src={arrow} alt='arrow' />
				</Button>
			</Grid>

			<div style={{ height: '70px' }}></div>
			
			<Grid theme='onboardingSlide'>
				<Grid theme='JoinFont'>로그인</Grid>
				<br/>
				<form onSubmit={handleFormSubmit}>

					<Grid theme='loginForm'>
                        <Grid theme='loginOption'>
                            <Img theme='loginImage'src={email1} />
						    <TextField 
								id='name' 
								type='name' 
								label='아이디' 
								variant='outlined' 
								size='small' 
								onChange={handleNameChange} />
                        </Grid>
                        
                        <Grid theme='loginOption'>
                            <Img theme='loginImage'src={password1} />
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
								width: '70%', // 너비를 내용에 맞게 조절
								margin: 'auto',       // 가운데 정렬
								padding:'0px 0px 10px',
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

						<hr style={{ width: '50%', height: '3px', backgroundColor: '#ccc', border: 'none'}} />

						<Grid theme='sloginFont'>소셜 로그인하기</Grid>
                        <Grid theme='loginOption_'>
                            <Button theme='loginBtn' onClick={handleClick}>
                                <Img theme='loginImage_'src={naver} />
                            </Button>
                            <Button theme='loginBtn' onClick={handleClick}>
                                <Img theme='loginImage_'src={google} />
                            </Button>
                            <Button theme='loginBtn' onClick={handleClick}>
                                <Img theme='loginImage__'src={kakao} />
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
                        {showMessage && <div style={{fontSize:'14px'}}><center>현재 개발 진행 중에 있습니다.<br></br>빠른 시일 내에 제공하도록 하겠습니다.</center></div>}
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