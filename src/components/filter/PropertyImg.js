import React, { useEffect, useRef, useState } from 'react';
import { Grid, Button, Img } from '..';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

function PropertyImg(){
    const [images, setImages] = useState([]);
    const [confirmVisible, setConfirmVisible] = useState(true); // 초기값을 true로 설정합니다.

    useEffect(() => {
        // 컴포넌트가 mount될 때 confirmVisible 상태를 초기화합니다.
        setConfirmVisible(true); // 페이지를 나갔다 들어왔을 때 confirmVisible를 true로 설정합니다.
    }, []);

    // 이미지 추가
    const handleImageUpload = (e) => {
        const uploadedImages = Array.from(e.target.files);

        // 이미지 파일 크기 및 개수 제한 확인
        const filteredImages = uploadedImages.filter(image => image.size <= 6 * 1024 * 1024); // 6MB 제한
        if (images.length + filteredImages.length > 15) {
            alert('이미지는 최대 15장까지 등록할 수 있습니다.');
            return;
        }

        setImages(prevImages => [...prevImages, ...filteredImages]);
    };

    // 이미지 삭제
    const handleImageDelete = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    // 확인 버튼 클릭 시 처리
    const handleConfirmClick = () => {
        setConfirmVisible(false);
    };

    return(
        <>
            <div style={PropertyOptionImg}>

                {!confirmVisible && (
                    <>
                        <div>
                            <h>매물 생성 완료</h>
                            <button>내 매물 확인하러가기</button>
                        </div>
                    </>
                )}

                {/* 이미지 업로드 관련 정보 */}
                {confirmVisible && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>이미지 업로드</div>
                        </div>
                       
                        <hr style={{ width: '100%', height: '1px', border: 'none', backgroundColor: '#D9D9D9' }} />
                        <div style={{ fontWeight: 'bold', marginLeft: '20px', marginTop: '20px', fontSize: '18px' }}>
                            1. 3장 이상의 사진을 업로드 해 주세요.<br />
                            2. 최대 15장까지 등록 가능하며, 한 장 당 6MB를 초과할 수 없습니다. <br />
                            3. 첫번째 사진이 대표 이미지로 결정됩니다.<br />
                            4. 매물과 관련 없는 이미지, 홍보성 이미지, 워터마크 이미지는 등록이 불가능합니다. <br />
                        </div>

                        {/* 업로드된 이미지 목록 */}
                        <div>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
                                    <button onClick={() => handleImageDelete(index)}>Delete</button>
                                </div>
                            ))}
                        </div>

                        {/* 이미지 업로드 버튼 */}
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            {/* Material-UI의 버튼 컴포넌트를 사용하여 이미지 업로드 버튼을 생성합니다. */}
                            <label htmlFor="image-upload">
                                <input id="image-upload" type="file" multiple onChange={handleImageUpload} style={{ display: 'flex' }} />
                            </label>
                        </div>
                        
                        <div>
                        <button onClick={handleConfirmClick}>확인</button>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

const PropertyOptionImg = {
    height: '100%',
};

export default PropertyImg;
