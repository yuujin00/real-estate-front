import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ComplaintIcon from "../components/Img/ComplaintIcon";
import { FaHeart } from "react-icons/fa";
import ListItem from "../components/ListItem/ListItem";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mockData = [
    {
      id: 1,
      title: "두호SK뷰푸르지오1단지 103동 2층",
      price: "전세 3억 7천",
      content: "영일대 15분, 학군 밀집지역",
      image: "https://via.placeholder.com/400",
      description: "리모델링 한 지 1년 돼서 고칠 게 없습니다.",
      amenities: ["주차장", "엘리베이터", "헬스장"],
      location: "서울 강남구 어딘가",
    },
    {
      id: 2,
      title: "임페리얼",
      price: "전세 1억",
      content: "일이삼사오육칠팔구십일일일",
      image: "https://via.placeholder.com/400",
      description: "또 다른 멋진 집입니다. 풍경이 정말 멋져요.",
      amenities: ["주차장", "보안 시스템", "수영장"],
      location: "서울 강서구 어딘가",
    },
  ];

  // id에 해당하는 데이터 가져오기
  const selectedItem = mockData.find((item) => item.id.toString() === id);

  // id에 해당하는 데이터가 없을 시 예외 처리
  if (!selectedItem) {
    return <div>해당 상품이 존재하지 않습니다.</div>;
  }
  // 문의하기 버튼 클릭 처리 함수
  const handleInquiry = (item) => {
    navigate(`/inquiry/${item.id}`);
  };

  // 계약하기 버튼 클릭 처리 함수
  const handleContract = (item) => {
    navigate(`/contract/${item.id}`);
  };
  return (
    <div>
      <img src={selectedItem.image} alt="Property" />

      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
      >
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 10V15"
            stroke="#FF0707"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 20H15.0125"
            stroke="#FF0707"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div style={{ marginLeft: "10px" }}></div>
      </div>

      <hr />

      {/* 매물 정보 */}
      <div className="property-info" style={{ marginLeft: "20px" }}>
        <h3>매물 정보</h3>
        <p>평수</p>
        <p>방/ 욕실</p>
        <p>층수</p>
        <p>주차</p>
        <p>입주 가능 날짜</p>
        <p>방향</p>
        <p>엘리베이터 유무</p>
        <p>준공날짜</p>
        {/* 매물 정보 내용 */}
      </div>

      <hr />

      {/* 관리비 */}
      <div className="management-fee" style={{ marginLeft: "20px" }}>
        <h3>관리비</h3>
        {/* 관리비 내용 */}
      </div>

      <hr />

      {/* 상세 설명 */}
      <div className="description" style={{ marginLeft: "20px" }}>
        <h3>상세 설명</h3>
        <p>{selectedItem.description}</p>
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

        {/* 비슷한 매물 목록 렌더링 아래는 임시*/}
        <ListItem></ListItem>
      </div>

      <hr />

      {/* 문의하기, 계약하기 버튼 */}
      <InquiryContractContainer style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}></div>
        {/* 하트 버튼 */}
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
          <StyledButton1 onClick={() => handleInquiry(selectedItem)}>
            문의하기
          </StyledButton1>
        </InquiryButton>
        <ContractButton style={{ marginRight: "10px" }}>
          <StyledButton2 onClick={() => handleContract(selectedItem)}>
            계약하기
          </StyledButton2>
        </ContractButton>
      </InquiryContractContainer>
    </div>
  );
};

export default DetailPage;

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
