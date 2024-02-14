import React, { useState } from 'react';
import instance from '../api/axios';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/images/arrow.png';
import { TextField, Select, MenuItem } from '@mui/material';
import { Grid, Button, Img } from '../components';
import JoinConsentModal from '../components/Join/JoinConsentModal';

function Signup() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(true);
    const [emailAlertSeverity, setEmailAlertSeverity] = useState('info');
    const [emailAlertMessage, setEmailAlertMessage] = useState('');
    const [passwordAlertSeverity, setPasswordAlertSeverity] = useState('info');
    const [passwordAlertMessage, setPasswordAlertMessage] = useState('');
    const [signupData, setSignupData] = useState({
        name: '',
        password: '',
		email: '',
		gender : '',
    	age : '',
    });

    const handleNameChange = (event) => {
        setSignupData({ ...signupData, name: event.target.value });
    };

    const handleEmailChange = (event) => { 
        setSignupData({ ...signupData, email: event.target.value }); 
        setEmailAlertMessage(''); // 새로운 이메일이 입력될 때마다 알림 메시지 초기화
    };

    const handleEmailCheck = async () => {
        if (!signupData.email || !signupData.email.includes('@')) {
            setEmailAlertSeverity('error');
            setEmailAlertMessage('이메일을 입력해주세요.');
            return;
        }

        try {
            const response = await instance.post('/user/emailcheck', { email: signupData.email });
            if (response.data) {
                setEmailAlertSeverity('success');
                setEmailAlertMessage('사용 가능한 이메일입니다.');
            }
        } catch (error) {
            setEmailAlertSeverity('error');
            setEmailAlertMessage('이미 존재하는 이메일입니다.');
        }
    };

    const handlePasswordChange = (event) => {
        setSignupData({ ...signupData, password: event.target.value });
        setPasswordAlertMessage('');
    };

    const handlePasswordCheck = () => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(signupData.password)) {
            setPasswordAlertSeverity('error');
            setPasswordAlertMessage('비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
        } else {
            setPasswordAlertSeverity('success');
            setPasswordAlertMessage('사용 가능한 비밀번호입니다.');
        }
    };

    const handleGenderChange = (event) => {
        setSignupData({ ...signupData, gender: event.target.value });
    };

    const handleAgeChange = (event) => {
        setSignupData({ ...signupData, age: event.target.value });
    };

    const handleCloseModal = () => {
        // 모달 닫기
        setModalOpen(false);
    };

    //회원가입 데이터 전송
    const postSignupData = async (event) => {
        event.preventDefault();
        try {
            const response = await instance.post('/user/join', signupData);

            if (response.status === 200) {
                alert('회원가입이 완료되었습니다.');
                setSignupData({
					name: '',
					password: '',
					email: '',
					gender : '',
					age : '',
                });
                navigate('/login');
            } else if (response.data.message === '회원 가입을 실패했습니다. 이메일이 이미 존재합니다.') {
                alert('회원 가입을 실패했습니다. 이메일이 이미 존재합니다.');
            }
        } catch (error) {
            console.log('회원가입 실패 ', error);
            alert('회원가입 실패 ');
        }
    };

    const onClickArrow = () => {
        navigate('/login');
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
                    <Grid theme='JoinFont'>회원가입</Grid>
                    <Grid theme='signForm'>
                    <form onSubmit={postSignupData}>
                        <Grid theme='registerForm'>
                            <div style={{ marginTop: '2px', color: 'black' }}>이름</div>
                            <TextField 
                                id='name' 
                                placeholder='이름' 
                                variant='outlined' 
                                size='small' 
                                onChange={handleNameChange} 
                                InputLabelProps={{ shrink: false }} 
                                sx={{ '& .MuiInputBase-input': { width: '260px' }, backgroundColor: '#EDEDED' }}/>
                            
                            <div style={{ marginTop: '2px', color: 'black' }}>이메일</div>
                            <TextField 
                                id='email' 
                                type='email' 
                                placeholder='이메일' 
                                variant='outlined' 
                                size='small' 
                                onChange={handleEmailChange} 
                                InputLabelProps={{ shrink: false }} 
                                sx={{ '& .MuiInputBase-input': { width: '260px' }, backgroundColor: '#EDEDED' }}/>
                            <Button theme='signupBtn' onClick={handleEmailCheck} disabled={!signupData.email || !signupData.email.includes('@')}>사용 가능 여부 확인</Button>
                            <div style={{ display: emailAlertMessage ? 'block' : 'none' }}>
                                <Alert 
                                    severity={emailAlertSeverity} 
                                    size='small' 
                                    style={{ 
                                        fontSize: '12px',
                                        padding: '2px 2px',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    {emailAlertMessage}
                                </Alert>
                            </div>
                            
                            <div style={{ marginTop: '2px', color: 'black' }}>비밀번호</div>
                            <TextField
                                id='password'
                                placeholder='비밀번호'
                                variant='outlined'
                                size='small'
                                type='password'
                                onChange={handlePasswordChange}
                                InputLabelProps={{ shrink: false }}
                                sx={{ '& .MuiInputBase-input': { width: '260px' }, backgroundColor: '#EDEDED' }}
                            />
                            <Button theme='signupBtn' onClick={handlePasswordCheck}>사용 가능 여부 확인</Button>
                            <div style={{ display: passwordAlertMessage ? 'block' : 'none' }}>
                                <Alert 
                                    severity={passwordAlertSeverity} 
                                    size='small' 
                                    style={{ 
                                        fontSize: '12px',
                                        padding: '2px 2px',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    {passwordAlertMessage}
                                </Alert>
                            </div>
                            
                            <div style={{ marginTop: '2px', color: 'black' }}>성별</div>
                            <Select 
                                id='gender' 
                                placeholder='성별'  
                                variant='outlined' 
                                size='small' 
                                value={signupData.gender} 
                                onChange={handleGenderChange}
                                sx={{ '& .MuiSelect-outlined': { width: '242px', height: '40px' },  backgroundColor: '#EDEDED' }} >
                                <MenuItem value='man'>남성</MenuItem>
                                <MenuItem value='woman'>여성</MenuItem>
                            </Select>

                            <div style={{ marginTop: '2px', color: 'black' }}>나이</div>
                            <TextField
                                id='age'
                                placeholder='나이'
                                inputProps={{ min: 14, max: 120 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                onChange={handleAgeChange}
                                InputLabelProps={{ shrink: false }}
                                sx={{ '& .MuiInputBase-input': { width: '260px' }, backgroundColor: '#EDEDED' }}
                            />
                        </Grid>

                        <Grid theme='startGrid'>
                            <Button theme='startBtn' children='회원가입' type='submit' onClick={postSignupData} />
                        </Grid>
                    </form>
                    </Grid>

                    <Grid theme='cardGrid'>
                            <JoinConsentModal open={modalOpen} handleClose={handleCloseModal} />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

const loginWrap = {
    height: '100%',
};

export default Signup;
