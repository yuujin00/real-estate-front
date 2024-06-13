import React, { useEffect, useState } from 'react';
import { Button, Img } from '..';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import structure from '../../assets/images/image 39.png';
import instance from '../../api/axios';

function PropertyImg({ propertyId }) {
    const [images, setImages] = useState([]);
    const [confirmVisible, setConfirmVisible] = useState(true);
    const [canProceed, setCanProceed] = useState(false); // 진행 가능 여부를 추적하는 상태

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

    const handleConfirmClick = async () => { // 이 함수를 async로 변경
        if (images.length > 0) {
            try {
                const formData = new FormData();
                images.forEach((image, index) => {
                    formData.append('images', image, image.name);
                });

                // 디버깅용: FormData의 내용을 출력
                /*for (const pair of formData.entries()) {
                    console.log(`${pair[0]}, ${pair[1]}`);
                }*/

                const response = await instance.post(`/realEstate/property/step4/${propertyId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.resultCode === 'Success') {
                    setConfirmVisible(false);
                    console.log('Images uploaded successfully');
                } else {
                    console.log(response.data); // 서버 응답 내용을 출력
                    alert('이미지 업로드 실패');
                }
            } catch (error) {
                console.error('Error uploading images:', error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
            }
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
        // 이미지가 업로드되었는지 여부에 따라 "Next: 제출" 버튼을 활성화 또는 비활성화
        setCanProceed(images.length > 0);
    }, [images]);

    return (
        <>
            <div style={PropertyOptionImg}>
                {!confirmVisible && (
                    <>
                        <div>
                            <center><Img  src={structure} />
                            <h1>매물 생성 완료</h1></center>
                            <Box display="flex" justifyContent="center" mt={2}>
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
                        <div style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px', marginBottom: '20px', fontSize: '18px' }}>
                            1. 3장 이상의 사진을 업로드 해 주세요.
                            <div style={{ margin: '4px' }}></div>
                            2. 최대 15장까지 등록 가능하며,한 장 당 6MB를 초과할 수 없습니다.
                            <div style={{ margin: '4px' }}></div>
                            3. 첫번째 사진이 대표 이미지로 결정됩니다.
                            <div style={{ margin: '4px' }}></div>
                            4. 매물과 관련 없는 이미지, 홍보성 이미지, 워터마크 이미지는 등록이 불가능합니다. 
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
                            <Button theme='nextB' variant="contained" onClick={handleConfirmClick} disabled={!canProceed}>Next: 제출</Button>
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
