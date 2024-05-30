import React, { useState, useEffect } from "react";
import MapPropertyRegis from "../components/Map/MapPropertyRegis.js";
import PropertyOption from "../components/filter/PropertyOption.js";
import PropertyAdd from "../components/filter/PropertyAdd.js";
import PropertyImg from "../components/filter/PropertyImg.js";
import styled from "styled-components";

const PropertyRegis = () => {
  const [address, setAddress] = useState("");
  const [showArrow, setShowArrow] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [btn, setBtn] = useState("매물옵션");

  const handleButtonClick = (address) => {
    setAddress(address);
    setShowArrow(true);
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

  // 페이지 초기 로드 시 기본 버튼 색상 설정
  useEffect(() => {
    const initialBtn = document.getElementById("매물옵션");
    if (initialBtn) {
      initialBtn.style.color = "#D99E73";
      initialBtn.style.borderBottomColor = "#D99E73";
    }
  }, []);

  return (
    <>
      <PropertyRegisWrap>
        {showMap && (
          <>
            <MapPropertyRegis ertyRegis handleButtonClick={handleButtonClick} />
          </>
        )}

        {showArrow && (
          <>
            <ButtonContainer>
              <StyledButton id="매물옵션" active={btn === "매물옵션"}>
                매물옵션
              </StyledButton>
              <StyledButton id="추가정보" active={btn === "추가정보"}>
                추가정보
              </StyledButton>
              <StyledButton id="이미지업로드" active={btn === "이미지업로드"}>
                이미지업로드
              </StyledButton>
            </ButtonContainer>
            <ContentContainer>
              {btn === "매물옵션" && <PropertyOption address={address} />}
              {btn === "추가정보" && <PropertyAdd address={address} />}
              {btn === "이미지업로드" && <PropertyImg address={address} />}
            </ContentContainer>
          </>
        )}
      </PropertyRegisWrap>
    </>
  );
};

const PropertyRegisWrap = styled.div`
  margin-top: 80px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  top: 80px; /* Adjust this value based on your header height */
  width: 100%;
  max-width: 390px; /* Ensure total width does not exceed 390px */
  display: flex;
  flex-direction: row;
  background-color: white;
`;

const ContentContainer = styled.div`
  margin-top: 150px; /* Adjust this value based on ButtonContainer height */
  background-color: white;
`;

const StyledButton = styled.button`
  color: ${(props) => (props.active ? "#D99E73" : "#979797")};
  background-color: white;
  border: none;
  border-bottom: 3px solid ${(props) => (props.active ? "#D99E73" : "#979797")};
  padding: 5px;
  width: 130px; /* Ensure each button width does not exceed 130px */
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease;

  &:hover {
    border-bottom-color: #d99e73;
    color: #d99e73;
  }
`;

export default PropertyRegis;
