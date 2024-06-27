import React, { useState, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

function SignContractModal({ open, handleClose, setIsSigned }) {
  const sigCanvas = useRef({});

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const saveSignature = () => {
    const image = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    console.log(image); // 이 이미지 URL을 서버에 저장하거나 다른 동작을 할 수 있습니다.
    alert('서명이 저장되었습니다.');
    setIsSigned(true); // 서명 완료 상태 업데이트
    handleClose(); // 모달 닫기
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">서명</DialogTitle>
      <DialogContent>
        <SignatureCanvas
          penColor='black'
          canvasProps={{
            width: 300,
            height: 200,
            className: 'sigCanvas',
            style: { border: '2px solid black' } // 스타일 추가
          }}
          ref={sigCanvas}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={clearSignature} color="primary">
          서명 지우기
        </Button>
        <Button onClick={saveSignature} color="primary">
          서명 저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignContractModal;
