import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import '../components/ListItem/style.css';

function Contract() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showProceedButton, setShowProceedButton] = useState(true);  // 절차진행 버튼 표시 여부 관리
  const [showSignButton, setShowSignButton] = useState(false);  // 서명 버튼 표시 여부 관리
  const [contractId, setContractId] = useState(null);
  const [showReceiveButton, setShowReceiveButton] = useState(false); // 계약서 수령 버튼 표시 여부 관리

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const contractIdFromQuery = queryParams.get('contractId');
    setContractId(contractIdFromQuery);
    fetchData(contractIdFromQuery);
  }, [id, location.search]);

  const fetchData = async (contractIdFromQuery) => {
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
      const item = response.data.result.content[id - 1];
      setSelectedItem(item);
      localStorage.setItem("userInfo", item.user.userId);

      // 계약이 이미 생성되었는지 확인
      if (contractIdFromQuery) {
        const contractResponse = await axios.get(
          `http://3.35.10.79:8080/realEstate/contract/item/${contractIdFromQuery}`,
          {
            headers: headers,
          }
        );
        if (contractResponse.data.result) {
          setShowProceedButton(false);
          setShowSignButton(true);
        }
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/contract/') && contractId) {
      setShowProceedButton(false);
      setShowSignButton(false);
      setShowReceiveButton(true);
    }
  }, [contractId, location.pathname]);

  const handleProceed = () => {
    setShowProceedButton(false);  // 절차진행 버튼을 숨기고 계약서 작성 버튼을 표시
  };

  const handleCreateContract = () => {
    console.log("Navigating with ID:", id);
    navigate(`/create-contract/${id}`);
  };

  const handleSignContract = () => {
    console.log("Signing contract with ID:", id);
    // 서명 로직 추가
  };

  const handlePaymentContract = () => {
    console.log("Payment contract with ID:", contractId);
    navigate(`/PropertyPayment/${contractId}`);
  };

  const handleReceiveContract = () => {
    console.log("Receiving contract with ID:", contractId);
    // 계약서 수령 로직 추가
  };

  if (!selectedItem) {
    return <div>Loading...</div>;
  }

  return (
    <div style={contractWrap}>
      <div className='list'>
        <div className='list-item'>
          <div className='list-image'>
            <div className='placeholder-box'></div>
          </div>
          <div className='list-details'>
            <div className='list-title'>
              {selectedItem.address.streetAddress}
            </div>
            <div className='list-price'>
              {selectedItem.weeklyFee} 원
            </div>
            <div className='list-deta'>
              <div className='list-location'>
                {selectedItem.propertyCondition.lineMemo}
              </div>
              <div className='list-button-container'>
              </div>
            </div>
          </div>
        </div>
        {showProceedButton && (
          <div>
            <p>계약 단계를 확인하고<br></br>
              [절차 진행]을 눌러주세요.</p>
            <button 
              style={{ borderRadius: '10px', backgroundColor: '#D99E73', color: 'white', border: 'none' }}
              onClick={handleProceed}
            >절차진행</button>
          </div>
        )}
        {!showProceedButton && !showSignButton && (
          <div>
            <h2>사용자 작성을 최소화한 계약서</h2>
            <p>부동산 단기 월세 계약서 작성</p>
            <p>결제방식 및 결제일 확인</p>
            <button 
              style={{ borderRadius: '10px', backgroundColor: '#D99E73', color: 'white', border: 'none' }}
              onClick={handleCreateContract}
            >계약서 작성</button>
          </div>
        )}
        {showSignButton && (
          <div>
            <button 
              style={{ borderRadius: '10px', backgroundColor: '#D99E73', color: 'white', border: 'none' }}
              onClick={handleSignContract}
            >서명하기</button>
            <button 
              style={{ borderRadius: '10px', backgroundColor: '#D99E73', color: 'white', border: 'none' }}
              onClick={handlePaymentContract}
            >결제하기</button>
          </div>
        )}
        {showReceiveButton && (
          <div>
            <button 
              style={{ borderRadius: '10px', backgroundColor: '#D99E73', color: 'white', border: 'none' }}
              onClick={handleReceiveContract}
            >계약서 수령</button>
          </div>
        )}
      </div>
    </div>
  );
}

const contractWrap = {
  height: '100%',
  margin: 0,
};

export default Contract;
