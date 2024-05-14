import React, { useState, useEffect } from 'react';
import MapPropertyRegis from '../components/Map/MapPropertyRegis.js';
import PropertyOption from '../components/filter/PropertyOption.js';
import PropertyAdd from '../components/filter/PropertyAdd.js';
import PropertyImg from '../components/filter/PropertyImg.js';
import { useNavigate } from 'react-router-dom';
import { Grid, Img, Button } from '../components/index.js';
import arrow from '../assets/images/arrow.png';
import styled from "styled-components";

const PropertyRegis = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [showArrow, setShowArrow] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [btn, setBtn] = useState("매물옵션");

  const handleButtonClick = (address) => {
    setAddress(address);
    setShowArrow(true);
  };

  const onClickArrow = () => {
    navigate('/main');
  };

  const onClick = (event) => {
    const {
      currentTarget: { id },
    } = event;
    setBtn(id);
  };

  useEffect(() => {
    const allBtnArr = ["매물옵션", "추가정보", "이미지업로드"];
    const nonTargetedBtnArr = allBtnArr.filter((item) => item !== btn);
    const targetBtn = document.getElementById(btn);
    if (targetBtn) {
      targetBtn.style.color = "#D99E73";
      targetBtn.style.borderBottomColor = "#D99E73"; // 선택된 버튼의 아래쪽 줄 색상 변경
    }
    nonTargetedBtnArr.forEach((item) => {
      const nonTargetedBtn = document.getElementById(item);
      if (nonTargetedBtn) {
        nonTargetedBtn.style.color = "#979797";
        nonTargetedBtn.style.borderBottomColor = "#979797"; // 선택되지 않은 버튼의 아래쪽 줄 색상 변경
      }
    });
  }, [btn]);

  return (
    <>
    <PropertyRegisWrap>
      {showMap && (
        <>
        <MapPropertyRegis handleButtonClick={handleButtonClick} />
        </>
      )}
      
      {showArrow && (
        <>
          <ButtonContainer>
              <StyledButton onClick={onClick} id="매물옵션">
                매물옵션
              </StyledButton>
              <StyledButton onClick={onClick} id="추가정보">
                추가정보
              </StyledButton>
              <StyledButton onClick={onClick} id="이미지업로드">
                이미지업로드
              </StyledButton>
            </ButtonContainer>
          {/* 버튼에 따라 다른 컴포넌트를 렌더링 */}
          {btn === "매물옵션" && <PropertyOption  address={address} />}
          {btn === "추가정보" && <PropertyAdd  address={address}/>}
          {btn === "이미지업로드" && <PropertyImg  address={address}/>}
        </>
      )}
    </PropertyRegisWrap>
    </>
  );
};



const PropertyRegisWrap = styled.div`
  margin-top : 80px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 100px;
  margin-bottom: 50px;
  padding: 10px;
`;

const StyledButton = styled.button`
  color: black;
  background-color: white;
  border: none;
  border-bottom: 3px solid transparent; /* 아래쪽에만 줄 보이도록 설정 */
  padding: 5px;
  width: 100px; /* 각 버튼의 너비 조절 */
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease; /* 색상 변화에 대한 전환 효과 추가 */

  &:hover {
    border-bottom-color: #D99E73; /* 호버 시 아래쪽 줄 색상 변경 */
    color: #D99E73; /* 호버 시 글자 색상 변경 */}
`;

export default PropertyRegis;
