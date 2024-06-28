import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from '../api/axios';

function PropertyPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [contractId, setContractId] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [contractDetails, setContractDetails] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    const loadExternalScripts = () => {
      const jqueryScript = document.createElement("script");
      jqueryScript.src = "https://code.jquery.com/jquery-1.12.4.min.js";
      jqueryScript.onload = () => {
        const iamportScript = document.createElement("script");
        iamportScript.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        iamportScript.onload = () => console.log('Iamport script loaded');
        document.head.appendChild(iamportScript);
      };
      document.head.appendChild(jqueryScript);
    };

    loadExternalScripts();

    return () => {
      const loadedJquery = document.head.querySelector('script[src="https://code.jquery.com/jquery-1.12.4.min.js"]');
      if (loadedJquery) {
        document.head.removeChild(loadedJquery);
      }
      const loadedIamport = document.head.querySelector('script[src="https://cdn.iamport.kr/js/iamport.payment-1.1.7.js"]');
      if (loadedIamport) {
        document.head.removeChild(loadedIamport);
      }
      
      /*setPaymentSuccess(true);*/
    };
  }, []);
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const contractIdFromQuery = queryParams.get('contractId');
    setContractId(contractIdFromQuery);
    fetchContractDetails(contractIdFromQuery);
  }, [id, location.search]);

  useEffect(() => {
    if (selectedItem.weeklyFee !== undefined && selectedItem.depositFee !== undefined) {
      const installment = Number(contractDetails.installment) || 0;
      const contractPrice = Number(contractDetails.contractPrice) || 0;
      const balance = Number(contractDetails.balance) || 0;
      const weeklyFee = Number(selectedItem.weeklyFee) || 0;
      const depositFee = Number(selectedItem.depositFee) || 0;
      const total = installment + contractPrice + balance /*+ weeklyFee*/ + depositFee;
      setTotalAmount(total);
    }
  }, [contractDetails, selectedItem]);

  const fetchPropertyDetails = async () => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.get(`/realEstate/property/list`, { headers });
      const item = response.data.result.content[id - 1];
      setSelectedItem(item);
      localStorage.setItem("userInfo", item.user.userId);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchContractDetails = async (contractIdFromQuery) => {
    try {
      if (contractIdFromQuery) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        const response = await axios.get(`/realEstate/contract/item/${contractIdFromQuery}`, { headers });
        if (response.data.resultCode === "SUCCESS") {
          setContractDetails(response.data.result);
        } else {
          alert('Failed to fetch contract details');
        }
      } else {
        console.error("Contract ID is undefined");
      }
    } catch (error) {
      console.error("Error fetching contract details:", error);
    }
  };

  const handleButtonClick = () => {
    navigate(`/contract/${id}?contractId=${contractId}/SUCCESS`, { state: { paymentCompleted: true } });
    console.log(paymentCompleted);
  };

  const requestPay = () => {
    const { IMP } = window;
    if (!IMP) {
      alert('Iamport library is not loaded.');
      return;
    }
    IMP.init('imp65221673'); // Replace this with your actual IMP key

    IMP.request_pay({
      pg: 'html5_inicis.INIpayTest',
      pay_method: 'card',
      merchant_uid: `merchant_${new Date().getTime()}`,
      name: 'Test Product',
      amount: totalAmount,
      buyer_email: 'test@naver.com',
      buyer_name: 'CodeCook',
      buyer_tel: '010-1234-5678',
      buyer_addr: 'Seoul',
      buyer_postcode: '123-456',
    }, async (rsp) => {
      try {
        if (rsp.success) {
          const data = await axios.post(`/realEstate/verify/${rsp.imp_uid}`);
          alert('Payment successful');
          setPaymentSuccess(true);
        } else {
          alert(`Payment failed: ${rsp.error_msg}`);
        }
      } catch (error) {
        console.error('Error while verifying payment:', error);
        alert('Payment verification failed');
      }
    });
  };

  return (
    <div style={{
      margin: '140px 30px ',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      {contractDetails && (
        <div >
          <h2 style={{
            borderBottom: '2px solid #eee',
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>결제금액</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '16px'
          }}>
            <span>중도금</span>
            <span>{contractDetails.installment}원</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '16px'
          }}>
            <span>계약금</span>
            <span>{contractDetails.contractPrice}원</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            fontSize: '16px'
          }}>
            <span>잔금</span>
            <span>{contractDetails.balance}원</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '2px solid #333',
            fontWeight: 'bold',
            marginBottom: '20px',
            fontSize: '18px'
          }}>
            <span>주차임</span>
            <span>{selectedItem.weeklyFee}원</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            fontSize: '16px'
          }}>
            <span>보증금</span>
            <span>{selectedItem.depositFee}원</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '2px solid #333',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            <strong>총 금액</strong>
            <strong>{totalAmount}원</strong>
          </div>
        </div>
      )}
      {paymentSuccess ? (
      <button style={{
        width: '100%',
        backgroundColor: '#4CAF50', // 성공 시 녹색 버튼
        color: 'white',
        padding: '15px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        marginTop: '20px',
        cursor: 'pointer'
      }} onClick={handleButtonClick}> 
        결제 완료되었습니다
      </button>
    ) : (
      <button style={{
        width: '100%',
        backgroundColor: '#5E4017',
        color: 'white',
        padding: '15px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        marginTop: '20px',
        cursor: 'pointer'
      }} onClick={requestPay}>
        결제하기
      </button>
    )}
    </div>
  );
  
}

export default PropertyPayment;
