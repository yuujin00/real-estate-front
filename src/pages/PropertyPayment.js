import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function PropertyPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [contractId, setContractId] = useState(null);
  const [contractDetails, setContractDetails] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    jquery.onload = () => {
      const iamport = document.createElement("script");
      iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
      iamport.onload = () => {
        console.log('Iamport script loaded');
      };
      document.head.appendChild(iamport);
    };
    document.head.appendChild(jquery);

    return () => {
      const loadedJquery = document.head.querySelector('script[src="https://code.jquery.com/jquery-1.12.4.min.js"]');
      if (loadedJquery) {
        document.head.removeChild(loadedJquery);
      }
      const loadedIamport = document.head.querySelector('script[src="https://cdn.iamport.kr/js/iamport.payment-1.1.7.js"]');
      if (loadedIamport) {
        document.head.removeChild(loadedIamport);
      }
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const contractIdFromQuery = queryParams.get('contractId');
    setContractId(contractIdFromQuery);
    fetchContractDetails(contractIdFromQuery);
  }, [id, location.search]);

  const fetchContractDetails = async (contractIdFromQuery) => {
      try {
        if (contractIdFromQuery) {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://15.164.30.195:8080/realEstate/contract/item/${contractIdFromQuery}`,{
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.resultCode === "SUCCESS") {
            setContractDetails(response.data.result);

            const installment = Number(response.data.result.installment) || 0;
            const contractPrice = Number(response.data.result.contractPrice) || 0;
            const balance = Number(response.data.result.balance) || 0;
            const total = installment + contractPrice + balance;
            setTotalAmount(total);
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

  const requestPay = () => {
    const { IMP } = window;
    if (!IMP) {
      alert('Iamport 라이브러리가 로드되지 않았습니다.');
      return;
    }
    IMP.init('imp65221673'); // 테스트용 imp_key

    IMP.request_pay({
      pg: 'html5_inicis.INIpayTest',
      pay_method: 'card',
      merchant_uid: `merchant_${new Date().getTime()}`,
      name: '테스트 상품',
      amount: totalAmount,
      buyer_email: 'test@naver.com',
      buyer_name: '코드쿡',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시',
      buyer_postcode: '123-456',
    }, async (rsp) => {
      if (rsp.success) {
        const token = localStorage.getItem("token");
        console.log('결제 ')
        // 서버단에서 결제정보 조회를 위해 jQuery ajax로 imp_uid 전달하기
        window.jQuery.ajax({
          url: `http://15.164.30.195:8080/realEstate/verify/${rsp.imp_uid}`, //cross-domain error가 발생하지 않도록 주의해주세요
          type: 'POST',
          dataType: 'json',
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            imp_uid: rsp.imp_uid
            //기타 필요한 데이터가 있으면 추가 전달
          }
        }).done(function(data) {
          // 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
          if ( data.response && rsp.paid_amount === data.response.amount) {
            var msg = '결제가 완료되었습니다.';
            msg += '\n고유ID : ' + rsp.imp_uid;
            msg += '\n상점 거래ID : ' + rsp.merchant_uid;
            msg += '\결제 금액 : ' + rsp.paid_amount;
            msg += '카드 승인번호 : ' + rsp.apply_num;
            
            alert(msg);
            // 성공적인 결제 및 서버 측 검증 후:
            navigate(`/contract/${id}?contractId=${contractId}?${rsp.merchant_uid}`, { state: { paymentCompleted: true } });
          } else {
            alert('결제 실패: 금액 불일치');
          }
        }).fail(function(error) {
          console.error('Error while verifying payment:', error);
          alert('결제 검증 실패');
        });
      } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
        alert(msg);
      }
    });
  };

  return (
    <div>
      {contractDetails && (
        <div>
          <h2>Contract Details</h2>
          <p>installment: ${contractDetails.installment}</p>
          <p>Contract Price: ${contractDetails.contractPrice}</p>
          <p>Balance: ${contractDetails.balance}</p>
          <h3>Total Amount: ${totalAmount}</h3>
        </div>
      )}
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
}

export default PropertyPayment;
