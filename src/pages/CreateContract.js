import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CreateContract() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {agreement, setagreement}=useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    section: "",
    propertyType:"",
    contractDateFrom: "",
    contractDateTo: "",
    contractPrice: "",
    contractPriceDate: "",
    Installment: "",
    InstallmentDate: "",
    balance: "",
    balanceDate: "",
    parkFeeDate: "",
    loanAmountDate: "",
    internet: false,
    utilities: false,
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `http://15.164.30.195:8080/realEstate/property/list`,
        {
          headers: headers,
        }
      );
      const item = response.data.result.content[id - 1];
      setSelectedItem(item);
      console.log(item);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === 'true' ? true : false,
    });
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert("계약 조건에 동의해야 계약서를 저장할 수 있습니다.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(`http://15.164.30.195:8080/realEstate/contract/create/${id}`, formData, {
        headers: headers,
      });
      alert("계약서가 성공적으로 생성되었습니다.");
      const contractId = response.data.result.id;
      navigate(`/contract/${id}?contractId=${contractId}`);
    } catch (error) {
      console.error("Error creating contract:", error);
      alert("계약서 생성에 실패했습니다.");
    }
  };

  return (
    <div>
      {step === 1 && selectedItem &&  (
        <div >
          <h2 style={styles.heading}>부동산 단기 월세 계약서</h2>
          <form onSubmit={e => e.preventDefault()} style={styles.form}>
            <div style={styles.scrollContainer}>
            <label style={styles.label_}>부동산 표시</label>
            <div style={styles.formGroup}>
              <label style={styles.label}>주소</label>
              {selectedItem.address.streetAddress}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>임대구분</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                style={styles.input}
                placeholder="임대구분"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>주택유형</label>
              <input
                type="text"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                style={styles.input}
                placeholder="주택유형"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>전용면적</label>
              {selectedItem.area2}
            </div>
            <label style={styles.label_}>계약조건</label>
            <div style={styles.formGroup}>
              <label style={styles.label}>사용기간 시작</label>
              <input
                type="date"
                name="contractDateFrom"
                value={formData.contractDateFrom}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>사용기간 종료</label>
              <input
                type="date"
                name="contractDateTo"
                value={formData.contractDateTo}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>보증금</label>
              {selectedItem && selectedItem.deposit ? selectedItem.depositFee : 0}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>주차임</label>
              {selectedItem.weeklyFee}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>관리비</label>
              {selectedItem && selectedItem.management ? selectedItem.managementFee : 0}
            </div>
            <label style={styles.label_}>대금 지불방식</label>
            <div style={styles.formGroup}>
              <label style={styles.label}>계약금</label>
              <input
                type='number'
                name="contractPrice"
                value={formData.contractPrice}
                onChange={handleChange}
                style={styles.input}
                placeholder="계약금"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>계약금 지불일</label>
              <input
                type="date"
                name="contractPriceDate"
                value={formData.contractPriceDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>중도금</label>
              <input
                type='number'
                name="Installment"
                value={formData.Installment}
                onChange={handleChange}
                style={styles.input}
                placeholder="중도금"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>중도금 지불일</label>
              <input
                type="date"
                name="InstallmentDate"
                value={formData.InstallmentDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>잔금</label>
              <input
                type='number'
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                style={styles.input}
                placeholder="잔금"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>잔금 지불일</label>
              <input
                type="date"
                name="balanceDate"
                value={formData.balanceDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>주차임</label>
              {selectedItem.weeklyFee}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>주차임 지불일</label>
              <input
                type="date"
                name="parkFeeDate"
                value={formData.parkFeeDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>관리비</label>
              {selectedItem && selectedItem.management ? selectedItem.managementFee : 0}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>관리비 지불일</label>
              <input
                type="date"
                name="loanAmountDate"
                value={formData.loanAmountDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <label style={styles.label_}>기타사항</label>
            <div style={styles.formGroup}>
              <label style={styles.label}>공과금</label>
              <label>
                    <input
                      type="radio"
                      name="utilities"
                      value="true"
                      checked={formData.utilities === true}
                      onChange={handleRadioChange}
                    />
                    포함
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="utilities"
                      value="false"
                      checked={formData.utilities === false}
                      onChange={handleRadioChange}
                    />
                    미포함
                  </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>인터넷</label>
              <label>
                    <input
                      type="radio"
                      name="internet"
                      value="true"
                      checked={formData.internet === true}
                      onChange={handleRadioChange}
                    />
                    포함
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="internet"
                      value="false"
                      checked={formData.internet === false}
                      onChange={handleRadioChange}
                    />
                    미포함
                  </label>
            </div>
            </div>
            <button type="button" onClick={handleNext} style={styles.button}>Next</button>
          </form>
        </div>
      )}
      {step === 2 && selectedItem && (
        <div>
          <h2 style={styles.heading}>부동산 특약사항</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ overflowY: 'auto', height: '500px', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              {/* 특약사항 내용 */}
              1. 본 계약의 임차인은 전입신고가 되어있는 본거주지가 있고, 일시적으로 단기 사용의 의사를 밝히고 단기 임대차 계약을 체결한다.
              <div style={{ margin: '4px' }}></div>
              2. 본 계약은 단기 사용을 위한 계약으로 임차인은 위 주소에 전입신고 하지 않기로 하며, 주택임대차보호법 제4조의 임대차 기간을 적용받지 아니한다.
              <div style={{ margin: '4px' }}></div>
              3. 임대인은 입실일 전에 해당 부동산의 상태가 양호한지 미리 확인하고 임차인에게 인도한다.
              <div style={{ margin: '4px' }}></div>
              4.임대인은 임차인이 사용기간동안 정상적 거주가 가능할 수 있도록 유지보수 하여야 한다 (수도, 보일러, 벽체, 지붕 등 주요 구조).
              <div style={{ margin: '4px' }}></div>
              5. 임차인은 사용기간 동안 해당 부동산을 유지관리 할 의무가 있다 (누수, 동파, 환기 관리 등). 또한, 소모품(건전지, 전등 등)은 임차인이 교체한다.
              <div style={{ margin: '4px' }}></div>
              6. 임차인은 퇴실시 입주상태와 다른 부분 (파손, 훼손, 망실 등)이 발생한 경우 원상회복하거나 또는 발생한 그 손해를 배상하여야 한다.
              <div style={{ margin: '4px' }}></div>
              7. 임차인은 이용기간 만료일까지 임차인 소유의 물건과 쓰레기를 깨끗이 치우고 임대인에게 주택을 명도하여야 한다.
              <div style={{ margin: '4px' }}></div>
              8. 임차인은 만기 1개월전부터 부동산에서 오피스텔을 볼 수 있도록 협조하기로 한다.
              <div style={{ margin: '4px' }}></div>
              9. 임차인은 해당 부동산에서 불법적인 행위(마약, 도박 및 유흥행위 등)을 금지하며, 이에 금지행위를 하는 경우 임대인은 본계약을 최고없이 해지하고 임차인의 출입통제 및 퇴실을 요구할 수 있다.
              <div style={{ margin: '4px' }}></div>
              10. 사용만료일 3일 이상이 경과하도록 퇴실하지 않으면, 임대인은 별도의 최고나 내용증명없이 열쇠, 비밀번호 등을 교체하고, 단전단수 조치할 수 있으며, 임차인은 이에 대한 민, 형사상 어떠한 주장도 할 수 없을 뿐 아니라, 임차인은 임대인이 입은 손해를 배상하여야 한다.
              <div style={{ margin: '4px' }}></div>
              11. 만료일까지 치우지 못한 임차인 소유의 물건은 임대인이 지정한 장소에 보관하기로 하며 이때 발생한 이전비용, 보관비용은 임차인이 지불하여야 한다.
              <div style={{ margin: '4px' }}></div>
              12. 만료일로부터 5일 이내에 해당 물품을 인수하지 않을시에는 해당 물품의 소유권을 포기하고 일체의 민, 형사상의 책임을 묻지 않기로 한다.
              <div style={{ margin: '4px' }}></div>
              13. 본부동산에 대한 임대차 계약은 임차인이 본임대물을 단기로 사용해야하는 필요함에 따라 체결된 계약이므로 향후 어떠한 경우에도 임대차보호법을 내세워 전대인의 재산권에 불이익이 되는일이 없도록 함을 확인하고 동의한다.
              <div style={{ margin: '4px' }}></div>
              14. 본 계약에 대하여 계약 당사자는 (1) 부동산 단기 월세 계약서 와  (2) 부동산 특약사항에 대해 이의 없음을 확인하고 동의한다.
            </div>
            <div>
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
              />
              <label htmlFor="agreement">상기 내용에 모두 동의합니다.</label>
            </div>
            <button type="submit" style={styles.button}>Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  scrollContainer: {
    overflowY: 'auto',
    height: '533px',
    padding: '10px',
    border: '1px solid #ccc',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label_: {
    display: 'block',
    marginBottom: '5px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    backgroundColor : '#E5E5E5',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default CreateContract;
