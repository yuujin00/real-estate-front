import React, { useState } from 'react';
import ListItem from '../components/ListItem/ListItem';
import Map from '../components/Map/Map';
import ListItemApart from '../components/ListItem/ListItemApart';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import instance from '../api/axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5E4017',
        },
    },
    components: {
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: '#5E4017',
                },
                root: {
                    '&.Mui-checked': {
                        color: '#5E4017',
                        '& + .MuiSwitch-track': {
                            backgroundColor: '#5E4017',
                            opacity: 0.5,
                        },
                    },
                },
                track: {
                    backgroundColor: '#5E4017',
                    opacity: 0.2,
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#5E4017',
                },
                thumb: {
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: '0px 0px 0px 8px rgba(94, 64, 23, 0.16)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: 'white',
                    '&.Mui-selected': {
                        color: 'white',
                    },
                },
                outlined: {
                    borderColor: '#5E4017',
                    color: '#5E4017',
                    '&.Mui-selected': {
                        backgroundColor: '#5E4017',
                        color: 'white',
                    },
                },
            },
        },
    },
});

export default function PropertyTransApart() {
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [dealType, setDealType] = useState('전체');
    const [deposit, setDeposit] = useState([0, 50000]);
    const [weeklyRent, setWeeklyRent] = useState([0, 5000]);
    const [includeMaintenance, setIncludeMaintenance] = useState(false);
    const [salesPrice, setSalesPrice] = useState([0, 1000000]);
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [showAreaAndParking, setShowAreaAndParking] = useState(false);
    const [selectedArea, setSelectedArea] = useState('전체');
    const [parkingAvailable, setParkingAvailable] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [options, setOptions] = useState({
        airConditioner: false,
        refrigerator: false,
        washingMachine: false,
    });
    const [filteredData, setFilteredData] = useState(null);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleDealTypeChange = (type) => {
        setDealType(type);
    };

    const handleDepositChange = (event, newValue) => {
        setDeposit(newValue);
    };

    const handleWeeklyRentChange = (event, newValue) => {
        setWeeklyRent(newValue);
    };

    const handleMaintenanceToggle = () => {
        setIncludeMaintenance(!includeMaintenance);
    };

    const handleSalesPriceChange = (event, newValue) => {
        setSalesPrice(newValue);
    };

    const handleAreaButtonClick = (area) => {
        setSelectedArea(area);
    };

    const handleParkingToggle = () => {
        setParkingAvailable(!parkingAvailable);
    };

    const handleOptionToggle = (option) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
    };

    const handleResetFilters = () => {
        setDeposit([0, 50000]);
        setWeeklyRent([0, 5000]);
        setIncludeMaintenance(false);
        setSalesPrice([0, 1000000]);
        setSelectedArea('전체');
        setParkingAvailable(false);
        setOptions({
            airConditioner: false,
            refrigerator: false,
            washingMachine: false,
        });
    };

    const handleApplyFilters = () => {
        setFiltersApplied(true);
        setShowFilters(false);
    };

    function formatDateString(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
        const day = String(date.getDate()).padStart(2, '0'); // 일자를 2자리로 맞춤
        return `${year}-${month}-${day}`;
    }
    const handleSearch = async () => {
      let url = '/realEstate/property/search';

      if (filtersApplied) {
          const searchParams = {
              dealType,
              deposit,
              weeklyRent,
              includeMaintenance,
              salesPrice,
              selectedArea,
              parkingAvailable,
              options,
              startDate,
              endDate
          };

          const params = new URLSearchParams({
              minPrice: searchParams.deposit[0],
              maxPrice: searchParams.deposit[1],
              minWeeklyFee: searchParams.weeklyRent[0],
              maxWeeklyFee: searchParams.weeklyRent[1],
              includeManagementFee: searchParams.includeMaintenance,
              parkingAvailable: searchParams.parkingAvailable,
              areaOptions: searchParams.selectedArea,
              contractStartDate : searchParams.StartDate,
              contractEndDate : searchParams.EndDate,
              airConditioner: searchParams.options.airConditioner,
              washingMachine: searchParams.options.washingMachine,
              refrigerator: searchParams.options.refrigerator,
          }).toString();

          url += `?${params}`;
      }

      setIsFilterApplied(false);

      try {
            const { data } = await instance.get(url);
            setFilteredData(data);
            setIsFilterApplied(true);
            console.log(data);
        } catch (error) {
            console.error('데이터 가져오는 중 오류 발생:', error);
            setFilteredData(null);
            setIsFilterApplied(false);
        }
    };
    const filterButtonStyle = {
        backgroundColor: '#5E4017',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    };

    const tabButtonStyle = {
        flex: '1',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        margin: '5px',
        cursor: 'pointer',
    };

    const selectedTabButtonStyle = {
        ...tabButtonStyle,
        backgroundColor: '#5E4017',
        color: 'white',
    };

    const optionButtonStyle = {
        margin: '0 5px',
        color: '#5E4017',
        borderColor: '#5E4017',
    };

    const filtersBarStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        marginTop: '10px',
        backgroundColor: '#f7f7f7',
    };

    const applyButtonStyle = {
        backgroundColor: '#5E4017',
        color: 'white',
        marginRight: '10px',
    };

    const areaButtonStyle = {
        margin: '0 5px',
        color: '#5E4017',
        borderColor: '#5E4017',
    };

    const selectedAreaButtonStyle = {
        ...areaButtonStyle,
        backgroundColor: '#5E4017',
        color: 'white',
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <input
                        type="text"
                        placeholder="매물검색"
                        style={{
                            padding: '10px',
                            fontSize: '10px',
                            border: '2px solid #ccc',
                            borderRadius: '5px',
                            marginRight: '10px',
                            flex: '1',
                        }}
                        onChange={handleChangeSearch}
                    />
                    <button onClick={handleToggleFilters} style={filterButtonStyle}>
                        필터
                    </button>
                    <button onClick={handleSearch} style={filterButtonStyle}>
                        검색
                    </button>
                </div>
                {showFilters && (
                    <div style={filtersBarStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                onClick={() => {
                                    setShowAreaAndParking(false);
                                    setShowOptions(false);
                                }}
                                style={!showAreaAndParking && !showOptions ? selectedTabButtonStyle : tabButtonStyle}
                            >
                                기간/금액
                            </button>
                            <button
                                onClick={() => {
                                    setShowAreaAndParking(true);
                                    setShowOptions(false);
                                }}
                                style={showAreaAndParking && !showOptions ? selectedTabButtonStyle : tabButtonStyle}
                            >
                                면적
                            </button>
                            <button
                                onClick={() => {
                                    setShowOptions(true);
                                    setShowAreaAndParking(false);
                                }}
                                style={showOptions ? selectedTabButtonStyle : tabButtonStyle}
                            >
                                옵션
                            </button>
                        </div>
                        <hr />
                        {!showAreaAndParking && !showOptions ? (
                            <>
                                <div
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        marginTop: '10px',
                                        backgroundColor: '#f7f7f7',
                                    }}
                                >
                                    <DatePickerContainer>
                                        <DateLabel style={{ fontSize: '14px' }}>시작일</DateLabel>
                                        <TextField
                                            type="datetime-local"
                                            value={startDate.toISOString().slice(0, 16)}
                                            onChange={(e) => setStartDate(new Date(e.target.value))}
                                            inputProps={{ style: { fontSize: 14 } }}
                                        />
                                    </DatePickerContainer>

                                    <DatePickerContainer>
                                        <DateLabel style={{ fontSize: '14px' }}>종료일</DateLabel>
                                        <TextField
                                            type="datetime-local"
                                            value={endDate.toISOString().slice(0, 16)}
                                            onChange={(e) => setEndDate(new Date(e.target.value))}
                                            inputProps={{ style: { fontSize: 14 } }}
                                        />
                                    </DatePickerContainer>
                                </div>
                                <div>보증금</div>
                                <div style={{ width: '200px' }}>
                                    <Slider
                                        value={deposit}
                                        onChange={handleDepositChange}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={50000}
                                        step={10}
                                        marks={[
                                            { value: 0, label: '0' },
                                            { value: 500, label: '500' },
                                            { value: 50000, label: '50000' },
                                        ]}
                                    />
                                </div>
                                <div>금액(1주)</div>
                                <div style={{ width: '200px' }}>
                                    <Slider
                                        value={weeklyRent}
                                        onChange={handleWeeklyRentChange}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={5000}
                                        step={10}
                                        marks={[
                                            { value: 0, label: '0' },
                                            { value: 500, label: '500' },
                                            { value: 5000, label: '5000' },
                                        ]}
                                    />
                                </div>

                                <FormControlLabel
                                    control={<Switch checked={includeMaintenance} onChange={handleMaintenanceToggle} />}
                                    label="관리비 포함"
                                />
                            </>
                        ) : showAreaAndParking && !showOptions ? (
                            <>
                                <div>전용면적</div>
                                <div>
                                    <Button
                                        variant={selectedArea === '전체' ? 'contained' : 'outlined'}
                                        style={
                                            selectedArea === '전체'
                                                ? {
                                                      ...areaButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : areaButtonStyle
                                        }
                                        onClick={() => handleAreaButtonClick('전체')}
                                    >
                                        전체
                                    </Button>
                                    <Button
                                        variant={selectedArea === '10평이하' ? 'contained' : 'outlined'}
                                        style={
                                            selectedArea === '10평이하'
                                                ? {
                                                      ...areaButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : areaButtonStyle
                                        }
                                        onClick={() => handleAreaButtonClick('10평이하')}
                                    >
                                        10평이하
                                    </Button>
                                    <Button
                                        variant={selectedArea === '10평대' ? 'contained' : 'outlined'}
                                        style={
                                            selectedArea === '10평대'
                                                ? {
                                                      ...areaButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : areaButtonStyle
                                        }
                                        onClick={() => handleAreaButtonClick('10평대')}
                                    >
                                        10평대
                                    </Button>
                                    <Button
                                        variant={selectedArea === '20평대' ? 'contained' : 'outlined'}
                                        style={
                                            selectedArea === '20평대'
                                                ? {
                                                      ...areaButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : areaButtonStyle
                                        }
                                        onClick={() => handleAreaButtonClick('20평대')}
                                    >
                                        20평대
                                    </Button>
                                    <Button
                                        variant={selectedArea === '30평대' ? 'contained' : 'outlined'}
                                        style={
                                            selectedArea === '30평대'
                                                ? {
                                                      ...areaButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : areaButtonStyle
                                        }
                                        onClick={() => handleAreaButtonClick('30평대')}
                                    >
                                        30평대
                                    </Button>
                                    <Button
                                        variant={selectedArea === '40평대' ? 'contained' : 'outlined'}
                                        style={
                                            selectedArea === '40평대'
                                                ? {
                                                      ...areaButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : areaButtonStyle
                                        }
                                        onClick={() => handleAreaButtonClick('40평대')}
                                    >
                                        40평대
                                    </Button>
                                    <Button
                                        variant={selectedArea === '50평대' ? 'contained' : 'outlined'}
                                        style={
                                            selectedArea === '50평대'
                                                ? {
                                                      ...areaButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : areaButtonStyle
                                        }
                                        onClick={() => handleAreaButtonClick('50평대')}
                                    >
                                        50평대
                                    </Button>
                                    <Button
                                        variant={selectedArea === '60평이상' ? 'contained' : 'outlined'}
                                        style={
                                            selectedArea === '60평이상'
                                                ? {
                                                      ...areaButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : areaButtonStyle
                                        }
                                        onClick={() => handleAreaButtonClick('60평이상')}
                                    >
                                        60평이상
                                    </Button>
                                </div>

                                <FormControlLabel
                                    control={<Switch checked={parkingAvailable} onChange={handleParkingToggle} />}
                                    label="주차 가능"
                                />
                            </>
                        ) : (
                            <>
                                <div>매물 옵션</div>
                                <div>
                                    <Button
                                        variant={options.airConditioner ? 'contained' : 'outlined'}
                                        style={
                                            options.airConditioner
                                                ? {
                                                      ...optionButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : optionButtonStyle
                                        }
                                        onClick={() => handleOptionToggle('airConditioner')}
                                    >
                                        에어컨
                                    </Button>{' '}
                                    <Button
                                        variant={options.refrigerator ? 'contained' : 'outlined'}
                                        style={
                                            options.refrigerator
                                                ? {
                                                      ...optionButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : optionButtonStyle
                                        }
                                        onClick={() => handleOptionToggle('refrigerator')}
                                    >
                                        냉장고
                                    </Button>{' '}
                                    <Button
                                        variant={options.washingMachine ? 'contained' : 'outlined'}
                                        style={
                                            options.washingMachine
                                                ? {
                                                      ...optionButtonStyle,
                                                      backgroundColor: '#5E4017',
                                                      color: 'white',
                                                  }
                                                : optionButtonStyle
                                        }
                                        onClick={() => handleOptionToggle('washingMachine')}
                                    >
                                        세탁기
                                    </Button>
                                </div>
                            </>
                        )}
                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                            <Button variant="outlined" style={optionButtonStyle} onClick={handleResetFilters}>
                                초기화
                            </Button>{' '}
                            <Button variant="contained" style={applyButtonStyle} onClick={handleApplyFilters}>
                                적용하기
                            </Button>
                        </div>
                    </div>
                )}
                {/* 조건부 렌더링 */}
                {isFilterApplied ? (
                    filteredData && filteredData.length > 0 ? (
                        // 필터링된 데이터 렌더링
                        <div>
                            {filteredData.map((item, index) => (
                                <ListItemApart key={index} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div>검색 결과가 없습니다</div>
                    )
                ) : (
                    // 기존 데이터 렌더링 (Map과 ListItemApart 컴포넌트)
                    <div>
                        
                <Map />
                <ListItemApart />
            </div>
            )}
        </div>
        </ThemeProvider>
    );
}

const DatePickerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const DateLabel = styled.div`
    margin-right: 10px;
`;