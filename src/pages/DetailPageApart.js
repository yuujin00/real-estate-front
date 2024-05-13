import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import ListItem from "../components/ListItem/ListItemApart";

const DetailPageApart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://3.35.10.79:8080/realEstate/property/list`);
      setSelectedItem(response.data.result.content[0]); // API에서 받아온 데이터의 첫 번째 항목으로 상태 업데이트
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 문의하기 버튼 클릭 처리 함수
  const handleInquiry = () => {
    navigate(`/chatroom?id=${selectedItem.id}`, { state: { createMember: selectedItem.id } });
  };

  // 계약하기 버튼 클릭 처리 함수
  const handleContract = () => {
    navigate(`/contract?id=${selectedItem.id}`);
  };

  if (!selectedItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={selectedItem.image} alt="Property" />

      <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
        <div className="info" style={{ marginRight: "10px" }}>
          <p style={{ margin: 0 }}>{selectedItem.title}</p>
          <h1 style={{ margin: 0 }}>{selectedItem.price}</h1>
          <p style={{ margin: 0 }}>{selectedItem.content}</p>
        </div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "auto", marginRight: "20px" }}
        >
          <path
            d="M15 27.5C15 27.5 25 22.5 25 15V6.25L15 2.5L5 6.25V15C5 22.5 15 27.5 15 27.5Z"
            stroke="#FF0707"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 10V15"
            stroke="#FF0707"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 20H15.0125"
            stroke="#FF0707"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ marginLeft: "10px" }}></div>
      </div>

      <hr />

      {/* 매물 정보 */}
      <div className="property-info" style={{ marginLeft: "20px" }}>
        <h3>매물 정보</h3>
        <p>평수: {selectedItem.area}평</p>
        <p>방/욕실: {selectedItem.rooms}개/{selectedItem.bathrooms}개</p>
        <p>층수: {selectedItem.floor}</p>
        <p>주차: {selectedItem.parkingAvailable ? "가능" : "불가능"}</p>
        <p>입주 가능 날짜: {selectedItem.moveInDate}</p>
        <p>방향: {selectedItem.direction}</p>
        <p>엘리베이터 유무: {selectedItem.hasElevator ? "있음" : "없음"}</p>
        <p>준공날짜: {selectedItem.completionDate}</p>
        <p>단지규모: {selectedItem.scale}</p>
        <p>난방정보: {selectedItem.heating}</p>
        <p>건설회사: {selectedItem.builder}</p>
      </div>

      <hr />

      {/* 상세 설명 */}
      <div className="description" style={{ marginLeft: "20px" }}>
        <h3>상세 설명</h3>
 
      </div>

      <hr />
      <div className="realtrans" style={{ marginLeft: "20px" }}>
        <h3>시세 / 실거래</h3>
        {/* 실거래 내용 */}
      </div>
      <hr />

      {/* 주변 생활 시설 */}
      <div className="nearby-facilities" style={{ marginLeft: "20px" }}>
        <h3>주변 생활 시설</h3>
        {/* 주변 생활 시설 내용 */}
      </div>

      <hr />

      {/* 위치 지도 */}
      <div className="location-map" style={{ marginLeft: "20px" }}>
        <h3>위치</h3>
        <div
          style={{
            width: "300px",
            height: "150px",
            backgroundColor: "grey",
            marginLeft: "25px",
            marginBottom: "15px",
          }}
        ></div>
        {/* 지도 렌더링 */}
      </div>

      <hr />

      {/* 비슷한 매물 더보기 */}
      <div className="similar-listings" style={{ marginLeft: "20px" }}>
        <h3>비슷한 매물 더보기</h3>
        {/* 비슷한 매물 목록 렌더링 */}
        <ListItem></ListItem>
      </div>

      <hr />

      {/* 문의하기, 계약하기 버튼 */}
      <InquiryContractContainer style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}></div>
        {/* 하트 버튼 !!!!!!!!!!!!!!*/}
        <FaHeart
          style={{
            fontSize: "24px",
            color: "red",
            marginRight: "8px",
            marginTop: "4px",
            marginLeft: "5px",
          }}
        />
        <InquiryButton style={{ marginRight: "10px" }}>
          <StyledButton1 onClick={handleInquiry}>
            문의하기
          </StyledButton1>
        </InquiryButton>
        <ContractButton style={{ marginRight: "10px" }}>
          <StyledButton2 onClick={handleContract}>
            계약하기
          </StyledButton2>
        </ContractButton>
      </InquiryContractContainer>
    </div>
  );
};

export default DetailPageApart;

const InquiryContractContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const InquiryButton = styled.div`
  width: 48%;
`;

const ContractButton = styled.div`
  width: 48%;
`;

const StyledButton1 = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #d99e73;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledButton2 = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #5e4017;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
