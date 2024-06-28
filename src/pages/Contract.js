import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import '../components/ListItem/style.css';
import SignContractModal from '../components/Bar/SignContractModal.js';

function Contract() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showProceedButton, setShowProceedButton] = useState(true);  // 절차진행 버튼 표시 여부 관리
  const [showSignButton, setShowSignButton] = useState(false);  // 서명 버튼 표시 여부 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [isSigned, setIsSigned] = useState(false);  // 서명 완료 상태 추가
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
        `/realEstate/property/list`,
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
          `/realEstate/contract/item/${contractIdFromQuery}`,
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
      setShowReceiveButton(false);
    }
  }, [contractId, location.pathname]);

  useEffect(() => {
    const state = location.state || {};
    if (state.paymentCompleted) {
      setShowReceiveButton(true);
      setShowSignButton(false);
      setShowProceedButton(false);
    }

    // 기존 fetchData 로직 유지...
  }, [location, id]);


  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleNavigateToDetail = () => {
    if (selectedItem && selectedItem.propertyId) {
      navigate(`/detailapart/${selectedItem.propertyId}`);
    }
  };

  const handleProceed = () => {
    setShowProceedButton(false);  // 절차진행 버튼을 숨기고 계약서 작성 버튼을 표시
  };

  const handleCreateContract = () => {
    console.log("Navigating with ID:", id);
    navigate(`/create-contract/${id}`);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleSignContract = () => {
    console.log("Signing contract with ID:", contractId);
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePaymentContract = () => {
    console.log("Payment contract with ID:", contractId);
    navigate(`/PropertyPayment/${id}?contractId=${contractId}`);
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
      {/*<nav style={navBar}>
        <div style={navItemIcon} onClick={handleBack}>&lt;</div>
        <div style={navItem}>전자계약</div>
        <div style={navItemIcon}>ℹ️</div>
      </nav>*/}
      <div className='list' style={{border: '1px solid #ccc'}}>
        <div className='list-item'>
        <div className="list-image">
        <img
          src={selectedItem.imageUrls}
          alt="Property"
          style={{ width: "80px", height: "auto" }}
        />
        </div>
        <div
          className="list-details"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="list-title">{selectedItem.address.streetAddress}</div>
          <div
          className="info"
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <div className="list-price">{selectedItem.weeklyFee}</div>
          <p style={{ margin: 0, marginLeft: "5px" }}> 원/1주 </p>
        </div>
        <div
          className="list-deta"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="list-location">{selectedItem.propertyCondition.lineMemo}</div>
            </div>
          </div>
          <button
            style={{
              position:"flex",
              right: "10px",
              borderRadius: "10px",
              backgroundColor: "#D99E73",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={handleNavigateToDetail}
          >
            상세보기
          </button>
          </div>
        </div>
        <div>  
        <div style={styles.scrollContainer}>
        {showProceedButton && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#666666' }}>
            <p style={{ margin: '10px', flex: 1, color:'white' }}>계약 단계를 확인하고<br></br>
              [절차 진행]을 눌러주세요.</p>
            <button 
              style={{ margin: '20px', borderRadius: '10px', padding: "10px 10px", backgroundColor: '#724E1C', color: 'white', border: 'none' }}
              onClick={handleProceed}
            >절차진행</button>
          </div>
        )}
        <div >
        <h2>계약서 작성하기 </h2>
          {showProceedButton && (
            <div>
              <h3 style={{ margin: '5px 15px',color:'#724E1C' }}>사용자 작성을 최소화한 계약서</h3>
            <p style={{ margin: '0 30px',color:'#979797' }}>부동산 단기 월세 계약서 작성</p>
            <p style={{ margin: '0 30px',color:'#979797' }}>결제방식 및 결제일 확인</p>
            </div>
          )}
        { !showProceedButton && !showSignButton && !showReceiveButton && (
          <div>
            <p style={{ margin: '0 30px',color:'#979797' }}>거래 당사자간 입력/수정이 가능합니다.</p>
            <button 
              style={{  margin: '15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#D99E73', color: 'white', border: 'none' }}
              onClick={handleCreateContract}
            >계약서 작성</button>
          </div>
        )}
        { (showReceiveButton || showSignButton) &&(
          <div>
          <p style={{ margin: '0 30px',color:'#979797' }}>거래 당사자간 입력/수정이 가능합니다.</p>
          <button 
            style={{  margin: '15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#D99E73', color: 'white', border: 'none' }}
          >계약서 작성 완료</button>
        </div>
        )}
        <h2>서명/날인 및 결제</h2>
          {showProceedButton && (
            <div>
              <h3 style={{ margin: '5px 15px',color:'#724E1C' }}>얼굴인식 AI로 비대면 본인확인</h3>
                <p style={{ margin: '0 30px',color:'#979797' }}>· 신분증 / 본인명의 핸드폰 준비</p>
                <p style={{ margin: '0 30px',color:'#979797' }}>· 본인인증</p>
                <p style={{ margin: '0 30px',color:'#979797' }}>· 수기서명/지문서명</p>
            </div>
          )}
          {!showProceedButton && !showSignButton && !showReceiveButton &&(
          <div>
          <button 
            style={{ margin:'15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#B9B9B9', color: 'white', border: 'none' }}
          >서명하기</button>
          <button 
            style={{  margin: '15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#B9B9B9', color: 'white', border: 'none' }}
          >결제하기</button>
        </div>
          )}
        {showSignButton && (
          <div>
            <p style={{ margin: '0 30px',color:'#979797' }}>서명 후에는 계약서 수정이 불가능합니다.</p>
            <button 
              style={{ margin: '15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#D99E73', color: 'white', border: 'none' }}
              onClick={handleSignContract}
            >서명하기</button>
            <SignContractModal open={modalOpen} handleClose={handleCloseModal} setIsSigned={setIsSigned} />
            <button 
              style={{ margin: '15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: isSigned ? '#D99E73' : '#B9B9B9', color: 'white', border: 'none' }}
              onClick={handlePaymentContract} disabled={!isSigned}
            >결제하기</button>
          </div>
        )}
        {showReceiveButton && (
          <div>
          <p style={{ margin: '0 30px',color:'#979797' }}>서명 후에는 계약서 수정이 불가능합니다.</p>
          <button 
            style={{ margin:'15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#D99E73', color: 'white', border: 'none' }}
          >서명완료</button>
          <button 
            style={{  margin: '15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#D99E73', color: 'white', border: 'none' }}
          >결제완료</button>
        </div>
        )}
        <h2>계약서 수령</h2>
          {showProceedButton && (
            <div>
              <h3 style={{ margin: '5px 15px',color:'#724E1C' }}>문서 위·변조 방지 타임스탬프 생성</h3>
                <p style={{ margin: '0 30px',color:'#979797' }}>· 계약 승인 후 열람 가능</p>
            </div>
          )}
          {!showProceedButton && !showSignButton && !showReceiveButton && (
          <div>
          <button 
              style={{ margin: '15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#B9B9B9', color: 'white', border: 'none' }}
            >계약서 수령</button>
        </div>
          )}
        {showReceiveButton && (
          <div>
            <p style={{ margin: '0 30px',color:'#979797' }}>계약성사가 완료되었습니다.</p>
            <button 
              style={{ margin: '15px 30px', borderRadius: '10px', padding: "5px 10px", backgroundColor: '#D99E73', color: 'white', border: 'none' }}
              onClick={handleReceiveContract}
            >계약서 수령</button>
          </div>
        )}
        </div>
      </div>
      </div>
      </div>
  );
}

const contractWrap = {
  height: '100%',
  margin: 0,
};

const navBar = {
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  borderBottom: '1px solid #ccc', /* 하단 테두리 추가 */
  backgroundColor: 'white',
};

const navItem = {
  fontSize: '16px',
  cursor: 'pointer',
};

const navItemIcon = {
  margin : '0 10px',
  fontSize: '24px', // Separate style for first and last child with icon size
};

const styles = {
  scrollContainer: {
    overflowY: 'auto',
    height: '500px',
    padding: '10px',
    border: '1px solid #ccc',
  },
};

export default Contract;