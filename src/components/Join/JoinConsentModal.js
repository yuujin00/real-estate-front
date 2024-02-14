import React, { useState } from 'react';
import { Modal, Checkbox } from '@mui/material';
import { Button } from '..';
import { useNavigate } from 'react-router-dom';

const JoinConsentModal = ({ open, handleClose }) => {
    const [consents, setConsents] = useState({
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
    });

    const navigate = useNavigate();

    const onClickClose = () => {
		navigate('/login');
	};

    const handleCheckboxChange = (event, number) => {
        const { checked } = event.target;
        setConsents({ ...consents, ['agree' + number]: checked });
    };

    const isAllChecked = () => {
        return consents.agree1 && consents.agree2 && consents.agree3 && consents.agree4;
    };

    const handleNext = () => {
        if (isAllChecked()) {
            handleClose();
        } else {
            alert('모든 동의서에 동의해야 합니다.');
        }
    };

    return (
        <div style={loginWrap}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="join-consent-modal"
                aria-describedby="join-consent-modal-description"
                BackdropProps={{
                    style: {
                        pointerEvents: 'none' // 모달 외부 클릭 이벤트를 무시합니다.
                    }
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ width: '300px', backgroundColor: 'white', padding: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <Button theme='signupBtn_' children='X' onClick={onClickClose}  />
                    </div>
                    <div style={{ marginBottom: '3px' }}>
                        <Checkbox
                            checked={consents.agree1}
                            onChange={(e) => handleCheckboxChange(e, 1)}
                            color="primary"
                            sx={{ '& .MuiSvgIcon-root': { color: '#5E4017' } }} // 체크박스 색상 변경
                        />
                        <label style={{ fontSize: '14px', color: '#666' }}>[필수] 이용약관 동의</label>
                    </div>
                    <div style={{ marginBottom: '3px' }}>
                        <Checkbox
                            checked={consents.agree2}
                            onChange={(e) => handleCheckboxChange(e, 2)}
                            color="primary"
                            sx={{ '& .MuiSvgIcon-root': { color: '#5E4017' } }} // 체크박스 색상 변경
                        />
                        <label style={{ fontSize: '14px', color: '#666' }}>[필수] 개인정보 수집 및 이용 동의 </label>
                    </div>
                    <div style={{ marginBottom: '3px' }}>
                        <Checkbox
                            checked={consents.agree3}
                            onChange={(e) => handleCheckboxChange(e, 3)}
                            color="primary"
                            sx={{ '& .MuiSvgIcon-root': { color: '#5E4017' } }} // 체크박스 색상 변경
                        />
                        <label style={{ fontSize: '14px', color: '#666' }}>[필수] 개인정보 제 3자 제공동의</label>
                    </div>
                    <div style={{ marginBottom: '3px' }}>
                        <Checkbox
                            checked={consents.agree4}
                            onChange={(e) => handleCheckboxChange(e, 4)}
                            color="primary"
                            sx={{ '& .MuiSvgIcon-root': { color: '#5E4017' } }} // 체크박스 색상 변경
                        />
                        <label style={{ fontSize: '14px', color: '#666' }}>[필수] 만 14세 이상입니다.</label>
                    </div>
                    <Button theme='startBtn' children='다음'type='submit' onClick={handleNext} disabled={!isAllChecked()}/>
                </div>
            </Modal>
        </div>
    );
};

const loginWrap = {
    height: '100%',
};

export default JoinConsentModal;
