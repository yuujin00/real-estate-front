//DetailPageApart
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import ListItem from "../components/ListItem/ListItemApart";

const DetailPageApart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `http://3.35.10.79:8080/realEstate/property/list`,
        {
          headers: headers,
        }
      );
      console.log("선택한 아파트", response.data.result.content[0]);
      const item = response.data.result.content[0];
      setSelectedItem(item);
      localStorage.setItem("userInfo", item.user.userId);
      setIsLiked(item.isLiked);
    } catch (error) {
      console.error("데이터를 가져오는 중x 오류 발생:", error);
    }
  };

  const handleInquiry = () => {
    if (!selectedItem) return;
    navigate(`/chatroom?id=${selectedItem.address.addressId}`, {
      state: { createMember: selectedItem.id },
    });
  };

  const handleContract = () => {
    if (!selectedItem) return;
    navigate(`/contract?id=${selectedItem.id}`);
  };

  const handleToggleLike = async () => {
    if (!selectedItem || !selectedItem.propertyId) {
      console.error("선택된 항목이 올바르게 정의되지 않았습니다.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = `http://3.35.10.79:8080/realEstate/property/wish/${selectedItem.propertyId}`;
      console.log("좋아요 상태 토글을 위한 URL:", url);

      if (!isLiked) {
        await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 상태를 토글하는 중 오류 발생:", error);
    }
  };

  if (!selectedItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={selectedItem.imageUrls} alt="Property" />

      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
      >
        <div className="info" style={{ marginRight: "10px" }}>
          <p style={{ margin: 0 }}>{selectedItem.title}</p>
          <h1 style={{ margin: 0 }}>{selectedItem.price}</h1>
          <p style={{ margin: 0 }}>{selectedItem.content}</p>
        </div>
      </div>

      <hr />

      <div className="property-info" style={{ marginLeft: "20px" }}>
        <h3>매물 정보</h3>
        <p>평수: {selectedItem.area1}평</p>
        <p>
          방/욕실: {selectedItem.roomCount}개/{selectedItem.bathroomCount}개
        </p>
        <p>층수: {selectedItem.floor}</p>
        <p>주차: {selectedItem.parkingAvailable ? "가능" : "불가능"}</p>
        <p>입주 가능 날짜: {selectedItem.startDate}</p>
        <p>엘리베이터 유무: {selectedItem.hasElevator ? "있음" : "없음"}</p>
      </div>

      <hr />

      <div className="description" style={{ marginLeft: "20px" }}>
        <h3>상세 설명</h3>
      </div>

      <hr />

      <div className="nearby-facilities" style={{ marginLeft: "20px" }}>
        <h3>주변 생활 시설</h3>
        <svg
          width="37"
          height="50"
          viewBox="0 0 37 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18.5" cy="16.5" r="16.5" fill="#ECCCB1" />
          <path
            d="M2.73156 40.09H3.79156V41.13C3.79156 43.27 2.92156 45.36 1.18156 46.15L0.431562 45.1C1.98156 44.41 2.73156 42.7 2.73156 41.13V40.09ZM3.03156 40.09H4.08156V41.13C4.08156 42.63 4.82156 44.23 6.37156 44.87L5.65156 45.92C3.89156 45.16 3.03156 43.19 3.03156 41.13V40.09ZM0.801563 39.52H5.99156V40.61H0.801563V39.52ZM6.85156 38.63H8.19156V47.89H6.85156V38.63ZM15.6408 38.63H16.9608V47.89H15.6408V38.63ZM16.6608 42.24H18.3008V43.35H16.6608V42.24ZM9.66078 40H15.0508V41.06H9.66078V40ZM12.3708 41.58C13.7208 41.58 14.7208 42.5 14.7208 43.79C14.7208 45.08 13.7208 46 12.3708 46C11.0208 46 10.0208 45.08 10.0208 43.79C10.0208 42.5 11.0208 41.58 12.3708 41.58ZM12.3708 42.66C11.7408 42.66 11.2908 43.08 11.2908 43.79C11.2908 44.5 11.7408 44.92 12.3708 44.92C13.0008 44.92 13.4508 44.5 13.4508 43.79C13.4508 43.08 13.0008 42.66 12.3708 42.66ZM11.7008 38.78H13.0308V40.4H11.7008V38.78ZM20.98 40.13H22.05V40.46C22.05 41.92 21.19 43.17 19.39 43.58L18.82 42.56C20.32 42.22 20.98 41.35 20.98 40.46V40.13ZM21.24 40.13H22.31V40.46C22.31 41.28 22.99 42.11 24.47 42.41L23.91 43.42C22.12 43.04 21.24 41.85 21.24 40.46V40.13ZM19.16 39.39H24.13V40.44H19.16V39.39ZM20.98 38.6H22.31V39.98H20.98V38.6ZM23.9 40.78H26.19V41.84H23.9V40.78ZM25.32 38.63H26.65V43.42H25.32V38.63ZM20.53 43.77H26.65V46.26H21.86V47.41H20.54V45.31H25.33V44.78H20.53V43.77ZM20.54 46.82H26.91V47.83H20.54V46.82ZM32.1992 39.87H34.9392V40.94H32.1992V39.87ZM32.1992 41.88H34.9392V42.95H32.1992V41.88ZM29.5392 44.53H35.8492V47.89H34.5192V45.58H29.5392V44.53ZM34.5192 38.63H35.8492V44.11H34.5192V38.63ZM30.6592 39.11C32.0392 39.11 33.0992 40.07 33.0992 41.4C33.0992 42.74 32.0392 43.7 30.6592 43.7C29.2692 43.7 28.2092 42.74 28.2092 41.4C28.2092 40.07 29.2692 39.11 30.6592 39.11ZM30.6592 40.24C29.9792 40.24 29.4792 40.67 29.4792 41.4C29.4792 42.14 29.9792 42.57 30.6592 42.57C31.3292 42.57 31.8392 42.14 31.8392 41.4C31.8392 40.67 31.3292 40.24 30.6592 40.24Z"
            fill="#ECCCB1"
          />
        </svg>
      </div>

      <hr />

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
      </div>

      <hr />

      <div className="similar-listings" style={{ marginLeft: "20px" }}>
        <h3>비슷한 매물 더보기</h3>
        <ListItem />
      </div>

      <hr />

      <InquiryContractContainer
        style={{ marginBottom: "20px", marginLeft: "20px" }}
      >
        <FaHeart
          style={{
            fontSize: "24px",
            color: isLiked ? "red" : "gray",
            marginRight: "8px",
            marginTop: "4px",
            cursor: "pointer",
          }}
          onClick={handleToggleLike}
        />
        <InquiryButton style={{ marginRight: "10px" }}>
          <StyledButton1 onClick={handleInquiry}>문의하기</StyledButton1>
        </InquiryButton>
        <ContractButton style={{ marginRight: "10px" }}>
          <StyledButton2 onClick={handleContract}>계약하기</StyledButton2>
        </ContractButton>
      </InquiryContractContainer>
    </div>
  );
};

export default DetailPageApart;

const InquiryContractContainer = styled.div`
  display: flex;
  align-items: center;
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
