import React, { useEffect, useState } from 'react';
import { Button } from '..';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

function PropertyImg({ address }) {
    const [btn, setBtn] = useState("이미지업로드");
    const [images, setImages] = useState([]);
    const [confirmVisible, setConfirmVisible] = useState(true);
    const [canProceed, setCanProceed] = useState(false); // State to track whether it's possible to proceed

    useEffect(() => {
        setConfirmVisible(true);
    }, []);

    const handleImageUpload = (e) => {
        const uploadedImages = Array.from(e.target.files);
        const filteredImages = uploadedImages.filter(image => image.size <= 6 * 1024 * 1024);
        if (images.length + filteredImages.length > 15) {
            alert('이미지는 최대 15장까지 등록할 수 있습니다.');
            return;
        }
        setImages(prevImages => [...prevImages, ...filteredImages]);
    };

    const handleImageDelete = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleConfirmClick = () => {
        if (images.length > 0) {
            setConfirmVisible(false);
        } else {
            alert('사진을 업로드해야 합니다.');
        }
    };

    const Input = styled('input')({
        display: 'none',
    });

    const UploadButton = styled(Button)({
        margin: '10px 0',
    });

    const CenteredContainer = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    });

    const ImageContainer = styled('div')({
        display: 'flex',
        overflowX: 'auto',
        maxWidth: '100%',
    });

    const Image = styled('img')({
        width: '150px',
        height: '150px',
        marginRight: '10px',
    });

    useEffect(() => {
        // Enable or disable the "Next: 제출" button based on whether images are uploaded
        setCanProceed(images.length > 0);
    }, [images]);

    useEffect(() => {
        const initialBtn = document.getElementById("이미지업로드");
        if (initialBtn) {
          initialBtn.style.color = "#D99E73";
          initialBtn.style.borderBottomColor = "#D99E73";
        }
      }, []);

    return (
        <>
            <div style={PropertyOptionImg}>
                {!confirmVisible && (
                    <>
                        <div>
                            <center><h1>매물 생성 완료</h1></center>
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button>내 매물 확인하러가기</Button>
                            </Box>
                        </div>
                    </>
                )}

                {confirmVisible && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>이미지 업로드</div>
                            <div style={{ color: 'red', marginLeft: '191px' }}>*</div>
                            <div> 필수입력</div>
                        </div>

                        <hr style={{ width: '100%', height: '1px', border: 'none', backgroundColor: '#D9D9D9' }} />
                        <div style={{ fontWeight: 'bold', marginLeft: '20px', marginTop: '20px', marginBottom: '20px', fontSize: '18px' }}>
                            <div style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0' }}>{address}</div>
                            1. 3장 이상의 사진을 업로드 해 주세요.<br />
                            2. 최대 15장까지 등록 가능하며,
                            <br /> &nbsp; &nbsp;한 장 당 6MB를 초과할 수 없습니다. <br />
                            3. 첫번째 사진이 대표 이미지로 결정됩니다.<br />
                            4. 매물과 관련 없는 이미지, 홍보성 이미지, <br /> &nbsp; &nbsp;워터마크 이미지는 등록이 불가능합니다. <br />
                        </div>

                        <hr style={sectionLineStyle} />

                        <ImageContainer>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <Image src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
                                    <Button variant="outlined" onClick={() => handleImageDelete(index)}>Delete</Button>
                                </div>
                            ))}
                        </ImageContainer>

                        <CenteredContainer>
                            <label htmlFor="image-upload">
                                <Input id="image-upload" type="file" multiple onChange={handleImageUpload} />
                                <UploadButton variant="contained" component="span" onClick={() => document.getElementById('image-upload').click()}>
                                    Upload Images
                                </UploadButton>
                            </label>
                        </CenteredContainer>

                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="contained" onClick={handleConfirmClick} disabled={!canProceed}>Next: 제출</Button>
                        </Box>
                    </>
                )}
            </div>
        </>
    );
}

const PropertyOptionImg = {
    height: '100%',
};

const sectionLineStyle = {
    width: '100%',
    height: '1px',
    border: 'none',
    backgroundColor: '#D9D9D9',
};

export default PropertyImg;
