import React, { useState } from 'react';
import ListItem from '../components/ListItem/ListItem';
import Map from '../components/Map/Map';
import ListItemApart from '../components/ListItem/ListItemApart';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function PropertyTransApart() {
  const [showFilters, setShowFilters] = useState(false);
  const [dealType, setDealType] = useState('전체');
  const [deposit, setDeposit] = useState([0, 1000]);
  const [monthlyRent, setMonthlyRent] = useState([0, 100]);
  const [includeMaintenance, setIncludeMaintenance] = useState(false);
  const [salesPrice, setSalesPrice] = useState([0, 1000000]);
  const [filtersApplied, setFiltersApplied] = useState(false); 
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleDealTypeChange = (type) => {
    setDealType(type);
  };

  const handleDepositChange = (event, newValue) => {
    setDeposit(newValue);
  };

  const handleMonthlyRentChange = (event, newValue) => {
    setMonthlyRent(newValue);
  };

  const handleMaintenanceToggle = () => {
    setIncludeMaintenance(!includeMaintenance);
  };

  const handleSalesPriceChange = (event, newValue) => {
    setSalesPrice(newValue);
  };

  const handleResetFilters = () => {
    setDeposit([0, 1000]);
    setMonthlyRent([0, 100]);
    setIncludeMaintenance(false);
    setSalesPrice([0, 1000000]);
  };

  const handleApplyFilters = () => {
    // 필터 적용하기 버튼 클릭 시 필터 적용 상태로 변경
    setFiltersApplied(true);
    setShowFilters(false); // 필터 바 숨기기
    // 필터 적용된 채로 검색될 수 있도록 추가적인 로직 구현
  };

  const handleSearch = () => {
    // 필터 적용된 상태인지 확인
    if (filtersApplied) {
      // 필터 적용된 상태라면 해당 필터를 사용하여 검색 실행
      const searchParams = {
        dealType,
        deposit,
        monthlyRent,
        includeMaintenance,
        salesPrice
      };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', position: 'relative' }}>
        <input type="text" placeholder="검색어를 입력하세요"></input>
        <button onClick={handleToggleFilters} style={{ position: 'absolute', right: '0' }}>
          필터
        </button>
        <button onClick={handleSearch}>검색</button>
      </div>
      {showFilters && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button>전월세/매매금액</button>
            <button>면적기타</button>
          </div>
          <hr />
          <div>거래 유형</div>
          <div>
            <button onClick={() => handleDealTypeChange('전체')}>전체</button>
            <button onClick={() => handleDealTypeChange('전세')}>전세</button>
            <button onClick={() => handleDealTypeChange('월세')}>월세</button>
            <button onClick={() => handleDealTypeChange('매매')}>매매</button>
          </div>
          <div>보증금</div>
          <div style={{ width: '200px' }}>
            <Slider
              value={deposit}
              onChange={handleDepositChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              marks={[
                { value: 0, label: '0' },
                { value: 500, label: '500' },
                { value: 1000, label: '1000' },
              ]}
            />
          </div>
          <div>월세</div>
          <div style={{ width: '200px' }}>
            <Slider
              value={monthlyRent}
              onChange={handleMonthlyRentChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              step={1}
              marks={[
                { value: 0, label: '0' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
            />
          </div>
          <div>관리비 포함</div>
          <FormControlLabel
            control={<Switch checked={includeMaintenance} onChange={handleMaintenanceToggle} />}
            label="관리비 포함"
          />
          <div>매매가</div>
          <div style={{ width: '200px' }}>
            <Slider
              value={salesPrice}
              onChange={handleSalesPriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000000}
              step={10000}
              marks={[
                { value: 0, label: '0' },
                { value: 500000, label: '500,000' },
                { value: 1000000, label: '1,000,000' },
              ]}
            />
          </div>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <Button variant="outlined" onClick={handleResetFilters}>초기화</Button>{' '}
            <Button variant="contained" onClick={handleApplyFilters}>적용하기</Button>
          </div>
        </div>
      )}
      <Map />
      <ListItemApart />
    </div>
  );
}
