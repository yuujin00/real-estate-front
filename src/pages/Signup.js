import React, { useState } from 'react';
import instance from '../api/axios';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
    	age : Number,
    });

    const handleNameChange = (event) => {
        setSignupData({ ...signupData, name: event.target.value });
    };

    const handleEmailChange = (event) => { 
        setSignupData({ ...signupData, email: event.target.value }); 
        setEmailAlertMessage(''); // 새로운 이메일이 입력될 때마다 알림 메시지 초기화
    };

    const handleEmailCheck = async () => {
        try {
            const response = await instance.post('/realEstate/user/emailcheck', { email: signupData.email });
            if (response.data.resultCode === 'SUCCESS') {
                setEmailAlertSeverity('success');
                setEmailAlertMessage('The email is available.');
            } else {
                setEmailAlertSeverity('error');
                setEmailAlertMessage('The email already exists.');
            }
        } catch (error) {
            setEmailAlertSeverity('error');
            setEmailAlertMessage('The email already exists.');
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
            setPasswordAlertMessage('The password must be at least 8 characters long and include letters, numbers, and special characters.');
        } else {
            setPasswordAlertSeverity('success');
            setPasswordAlertMessage('The password is available.');
        }
    };

    const handleGenderChange = (event) => {
        setSignupData({ ...signupData, gender: event.target.value });
    };

    const handleAgeChange = (event) => {
        setSignupData({ ...signupData, age: parseInt(event.target.value) });
    };

    const handleCloseModal = () => {
        // 모달 닫기
        setModalOpen(false);
    };

    //회원가입 데이터 전송
    const postSignupData = async (event) => {
        event.preventDefault();
        try {
            const response = await instance.post('realEstate/user/join', signupData);

            if (response.status === 200) {
                alert('Registration is complete.');
                setSignupData({
					name: '',
					password: '',
					email: '',
					gender : '',
					age : Number,
                });
                navigate('/login');
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            alert('Registration failed.');
        }
    };

    const onClickArrow = () => {
        navigate('/login');
    };

    return (
        <>
            <div style={loginWrap}>
                <div style={{ height: '70px' }}></div>

                <Grid theme='onboardingSlide'>
                    <Grid theme='JoinFont'>Sign Up</Grid>
                    <br/>
                    <Grid theme='signForm'>
                    <form onSubmit={postSignupData}>
                        <Grid theme='registerForm'>
                            <TextField 
                                id='name' 
                                label='ID' 
                                variant='outlined' 
                                size='small' 
                                onChange={handleNameChange} 
                            />
                            
                            <TextField 
                                id='email'
								label='email' 
                                variant='outlined' 
                                size='small' 
                                onChange={handleEmailChange} 
                                />
                            <Grid container alignItems="center" spacing={1} theme='signupBtnContainer' >
                                <Grid item>
                                    <Button theme='signupBtn' onClick={handleEmailCheck} disabled={!signupData.email || !signupData.email.includes('@')}>사용 가능 여부 확인</Button>
                                </Grid>
                            </Grid>
                            <div style={{ display: emailAlertMessage ? 'block' : 'none' }}>
                                <Alert 
                                    severity={emailAlertSeverity} 
                                    size='small' 
                                    style={{ 
                                        fontSize: '12px',
                                        padding: '0px 5px 0px 10px',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {emailAlertMessage}
                                </Alert>
                            </div>
            
                            <TextField
                                id='password'
                                label='password'
                                variant='outlined'
                                size='small'
                                type='password'
                                onChange={handlePasswordChange}
                            />
                            <Grid container alignItems="center" spacing={1} theme='signupBtnContainer'>
                                <Grid item>
                                    <Button theme='signupBtn' onClick={handlePasswordCheck}>사용 가능 여부 확인</Button>
                                </Grid>
                            </Grid>
                            <div style={{ display: passwordAlertMessage ? 'block' : 'none' }}>
                                <Alert 
                                    severity={passwordAlertSeverity} 
                                    size='small' 
                                    style={{ 
                                        fontSize: '12px',
                                        padding: '0px 5px 0px 10px',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    {passwordAlertMessage}
                                </Alert>
                            </div>
                            <FormControl variant="outlined" size="small">
                                <InputLabel id="gender-label">gender</InputLabel>
                                <Select 
                                    id='gender' 
                                    label="성별"
                                    labelId="gender-label"
                                    value={signupData.gender} 
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value='MEN'>MEN</MenuItem>
                                    <MenuItem value='WOMEN'>WOMEN</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id='age'
                                label='나이'
                                inputProps={{ min: 14, max: 120 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                onChange={handleAgeChange}
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
