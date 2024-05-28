import React, { useState ,useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, Select, MenuItem, InputLabel, TextField, InputAdornment, Box } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { Grid, Button } from '..';
import { useNavigate } from 'react-router-dom';
import PropertyAdd from './PropertyAdd.js';

function PropertyOption({ address }) {
    const [btn, setBtn] = useState("매물옵션");
    const navigate = useNavigate();
    const [managementCost, setManagementCost] = useState('있음');
    const [otherPropertyType, setOtherPropertyType] = useState('');
    const [currentSection, setCurrentSection] = useState('매물정보');
    const [formData, setFormData] = useState({
        propertyType: '',
        buildingType: '',
        contractType: '',
        paymentType: '',
        managementCostAmount: '',
        individualUsageFee: '',
        roomCount: '',
        bathroomCount: '',
        supplyAreaPyeong: '',
        supplyAreaSquareMeter: '',
        exclusiveAreaPyeong: '',
        exclusiveAreaSquareMeter: '',
        currentFloor: '',
        totalFloor: '',
        parking: ''
    });

    const requiredFields = {
        매물정보: ['propertyType', 'buildingType'],
        거래정보: ['contractType', 'paymentType', 'managementCost', 'individualUsageFee'],
        상세정보: ['roomCount', 'bathroomCount', 'supplyAreaPyeong','supplyAreaSquareMeter', 'exclusiveAreaPyeong', 'exclusiveAreaSquareMeter', 'currentFloor', 'totalFloor', 'parking']
    };

    const validateSection = () => {
        const currentFields = requiredFields[currentSection];
        for (let field of currentFields) {
            if (!formData[field]) {
                return false;
            }
        }
        return true;
    };

    const handleNextSection = (nextSection) => {
        if (validateSection()) {
            setCurrentSection(nextSection);
        } else {
            alert("모든 필수 입력란을 입력해주세요.");
        }
    };

    const handleInputChange = (field, value) => {
        if (field === 'supplyAreaPyeong') {
            setFormData(prevState => ({
                ...prevState,
                [field]: value,
                supplyAreaSquareMeter: (value * 3.3).toFixed(2)
            }));
        } else if (field === 'supplyAreaSquareMeter') {
            setFormData(prevState => ({
                ...prevState,
                [field]: value,
                supplyAreaPyeong: (value / 3.3).toFixed(2)
            }));
        } else if (field === 'exclusiveAreaPyeong') {
            setFormData(prevState => ({
                ...prevState,
                [field]: value,
                exclusiveAreaSquareMeter: (value * 3.3).toFixed(2)
            }));
        } else if (field === 'exclusiveAreaSquareMeter') {
            setFormData(prevState => ({
                ...prevState,
                [field]: value,
                exclusiveAreaPyeong: (value / 3.3).toFixed(2)
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [field]: value
            }));
        }
    };

      useEffect(() => {
        const initialBtn = document.getElementById("매물옵션");
        if (initialBtn) {
          initialBtn.style.color = "#D99E73";
          initialBtn.style.borderBottomColor = "#D99E73";
        }
      }, []);
    

    return (
        <>
            <div style={PropertyOptionWrap}>
                {currentSection === '매물정보' && (
                    <>
                        <div style={{ display: 'flex', margin: '10px 0' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>매물 정보</div>
                            <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                            <div> 필수입력</div>
                        </div>
                        <hr style={sectionLineStyle} />
                        <div style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0' }}>{address}</div>

                        <div style={scrollableContentStyle}>
                        {/*매물정보*/}
                        <Grid theme='registerForm'>
                            <FormControl>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 매물유형 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <RadioGroup
                                    name="propertyType"
                                    style={{ flexDirection: 'row' }}
                                    value={formData.propertyType}
                                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                                >
                                    <FormControlLabel value="아파트" control={<Radio />} label="아파트" />
                                    <FormControlLabel value="빌라/투룸+" control={<Radio />} label="빌라/투룸+" />
                                    <FormControlLabel value="오피스텔" control={<Radio />} label="오피스텔" />
                                    <FormControlLabel value="원룸" control={<Radio />} label="원룸" />
                                    <FormControlLabel value="기타" control={<Radio />} label="기타" />
                                    {formData.propertyType === '기타' && (
                                        <FormControl variant="outlined" size="small">
                                            <InputLabel >기타매물유형선택</InputLabel>
                                            <Select
                                                label="기타"
                                                value={otherPropertyType}
                                                onChange={(e) => setOtherPropertyType(e.target.value)}
                                            >
                                                <MenuItem value='man'>1.........</MenuItem>
                                                <MenuItem value='woman'>2.........</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                </RadioGroup>
                            </FormControl>
                            <FormLabel >
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <div> 건물유형 </div>
                                    <div style={{ color: 'red' }}>*</div>
                                </div>
                            </FormLabel>
                            <FormControl variant="outlined" size="small">
                                <InputLabel >건물유형선택</InputLabel>
                                <Select
                                    label="건물유형"
                                    value={formData.buildingType}
                                    onChange={(e) => handleInputChange('buildingType', e.target.value)}
                                >
                                    <MenuItem value='1'>1.........</MenuItem>
                                    <MenuItem value='2'>2.......</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        </div>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button onClick={() => handleNextSection('거래정보')}>Next: 거래 정보</Button>
                        </Box>
                    </>
                )}

                {currentSection === '거래정보' && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>거래 정보</div>
                            <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                            <div> 필수입력</div>
                        </div>
                        <hr style={sectionLineStyle} />
                        <div style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0' }}>{address}</div>

                        <div style={scrollableContentStyle}>
                        <Grid theme='registerForm'>
                            <FormControl>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 계약형태 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <RadioGroup
                                    name="contractType"
                                    value={formData.contractType}
                                    onChange={(e) => handleInputChange('contractType', e.target.value)}
                                    style={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="단기" control={<Radio />} label="단기" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 금액 지불 형태 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <RadioGroup
                                    name="paymentType"
                                    value={formData.paymentType}
                                    onChange={(e) => handleInputChange('paymentType', e.target.value)}
                                    style={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="일시불" control={<Radio />} label="일시불" />
                                    <FormControlLabel value="월세" control={<Radio />} label="월세" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 공용관리비 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <RadioGroup
                                    name="managementCost"
                                    value={formData.managementCost}
                                    onChange={(e) => {
                                        setManagementCost(e.target.value);
                                        handleInputChange('managementCost', e.target.value);
                                    }}
                                    style={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="있음" control={<Radio />} label="있음" />
                                    <FormControlLabel value="없음" control={<Radio />} label="없음" />
                                    {formData.managementCost === '있음' && (
                                        <TextField
                                        label="관리비"
                                        variant='outlined'
                                        size='small'
                                        type='number'
                                        value={formData.managementCostAmount}
                                        onChange={(e) => handleInputChange('managementCostAmount', e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                                        }}
                                        />
                                    )}
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 개별 사용료 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <RadioGroup
                                    name="individualUsageFee"
                                    value={formData.individualUsageFee}
                                    onChange={(e) => {
                                        handleInputChange('individualUsageFee', e.target.value);
                                    }}
                                    style={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="있음" control={<Radio />} label="있음" />
                                    <FormControlLabel value="없음" control={<Radio />} label="없음" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        </div>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button onClick={() => setCurrentSection('매물정보')}>Previous: 매물 정보</Button>
                            <Button onClick={() => handleNextSection('상세정보')}>Next: 상세 정보</Button>
                        </Box>
                    </>
                )}

                {currentSection === '상세정보' && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>상세 정보</div>
                            <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                            <div> 필수입력</div>
                        </div>
                        <hr style={sectionLineStyle} />
                        <div style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0' }}>{address}</div>

                        <div style={scrollableContentStyle}>
                        <Grid theme='registerForm'>
                            <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px' }}>
                                <FormControl style={{flexDirection: 'column'}}>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 방 개수 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <TextField
                                    label="방 개수"
                                    inputProps={{ min: 0 }}
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={formData.roomCount}
                                    onChange={(e) => handleInputChange('roomCount', e.target.value)}
                                />
                                </FormControl>
                                <FormControl style={{flexDirection: 'column'}}>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 욕실 개수 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <TextField
                                    label="욕실 개수"
                                    inputProps={{ min: 0 }}
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={formData.bathroomCount}
                                    onChange={(e) => handleInputChange('bathroomCount', e.target.value)}
                                />
                                </FormControl>
                            </FormControl>
                            <FormControl>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 공급면적 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                                <TextField
                                    label="공급면적"
                                    inputProps={{ min: 0 }}
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={formData.supplyAreaPyeong}
                                    onChange={(e) => handleInputChange('supplyAreaPyeong', e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">평</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    label="공급면적"
                                    inputProps={{ min: 0 }}
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={formData.supplyAreaSquareMeter}
                                    onChange={(e) => handleInputChange('supplyAreaSquareMeter', e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">㎡</InputAdornment>,
                                    }}
                                />
                                </FormControl>
                            </FormControl>
                            <FormControl>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 전용면적 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                                <TextField
                                    label="전용면적"
                                    inputProps={{ min: 0 }}
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={formData.exclusiveAreaPyeong}
                                    onChange={(e) => handleInputChange('exclusiveAreaPyeong', e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">평</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    label="전용면적"
                                    inputProps={{ min: 0 }}
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={formData.exclusiveAreaSquareMeter}
                                    onChange={(e) => handleInputChange('exclusiveAreaSquareMeter', e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">㎡</InputAdornment>,
                                    }}
                                />
                            </FormControl>
                            </FormControl>
                            <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px' }}>
                                <FormControl style={{flexDirection: 'column'}}>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 해당 층 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <TextField
                                    label="해당 층"
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={formData.currentFloor}
                                    onChange={(e) => handleInputChange('currentFloor', e.target.value)}
                                />
                                </FormControl>
                                <FormControl style={{flexDirection: 'column'}}>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 전체 층 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <TextField
                                    label="전체 층"
                                    inputProps={{ min: 1 }}
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    value={formData.totalFloor}
                                    onChange={(e) => handleInputChange('totalFloor', e.target.value)}
                                />
                                </FormControl>
                            </FormControl>
                            <FormControl>
                                <FormLabel >
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 세대당 주차 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                 <RadioGroup
                                    name="parking"
                                    value={formData.parking}
                                    onChange={(e) => {
                                        handleInputChange('parking', e.target.value);
                                    }}
                                    style={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="가능" control={<Radio />} label="가능" />
                                    <FormControlLabel value="불가능" control={<Radio />} label="불가능" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        </div>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button onClick={() => handleNextSection('거래정보')}>Previous: 거래 정보</Button>
                            <Button onClick={() => handleNextSection('추가정보')}>Next: 추가 정보</Button>
                        </Box>
                    </>
                )}

                {currentSection === '추가정보' && (
                    <PropertyAdd
                        setCurrentSection={setCurrentSection}
                        handleNextSection={handleNextSection}
                    />
                )}
                
            </div>
        </>
    );
}

const PropertyOptionWrap = {
    height: '100%',
};

const sectionLineStyle = {
    width: '100%',
    height: '1px',
    border: 'none',
    backgroundColor: '#D9D9D9',
};

const scrollableContentStyle = {
    maxHeight: '400px', // Adjust height as needed
    overflowY: 'auto',
};

export default PropertyOption;
