import React, { useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, TextField, InputAdornment, Box, Checkbox, FormGroup } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { Grid, Button } from '..';
import instance from '../../api/axios';

function PropertyOption({ handleNext, addressId }) {

    const [currentSection, setCurrentSection] = useState('매물정보');
    const [formData, setFormData] = useState({
        price:'',
        weeklyFee: '', // 주차임
        deposit: false, // 보증금 여부
        depositFee: '', // 보증금
        structure: '', // 매물유형
        management: false, // 관리비 여부
        managementFee: '', // 관리비
        UsageFee: false, // 개별 사용료
        negotiationFee: false, // 가격 협의 가능
        loanFund: false, // 융자
        startDate: '', // 시작날짜
        endDate: '', // 마지막날짜
        minimum: '', // 최소계약기간
        roomCount: '', // 방개수
        bathroomCount: '', // 욕실
        area1: '', // 공급면적
        area2: '', // 전용면적
        floor: '', // 해당층
        wholeFloor: '', // 전체층
        parkingAvailable: false, // 주차가능여부
        washingmachine: false, // 세탁기
        airconditioner: false, // 에어컨
        refrigerator: false, // 냉장고
    });

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const validateSection = () => {
        const requiredFields = {
            매물정보:  ['structure', 'weeklyFee', 'roomCount', 'bathroomCount', 'area1', 'area2', 'floor', 'wholeFloor'],
        };

        const currentFields = requiredFields[currentSection];

        if (!Array.isArray(currentFields)) {
            console.warn(`유효하지 않은 currentSection: ${currentSection}`);
            return true; // 또는 false, 필요에 따라 다릅니다.
        }
        for (let field of currentFields) {
            if (!formData[field]) {
                return false;
            }
        }
        return true;
    };

    const handleNextSection = async (nextSection) => {
        if (!validateSection()) {
            alert("모든 필수 입력란을 입력해주세요.");
            return;
        }
        try {
            const dataToSend = {
                ...formData,
                price: parseInt(formData.price, 10) || 0,
                weeklyFee: Number(formData.weeklyFee, 10),
                depositFee: Number(formData.depositFee, 10) || 0,
                managementFee: Number(formData.managementFee, 10) || 0,
                minimum: Number(formData.minimum, 10),
                roomCount: Number(formData.roomCount, 10),
                bathroomCount: Number(formData.bathroomCount, 10),
                area1: Number(formData.area1, 10),
                area2: Number(formData.area2, 10),
                floor: Number(formData.floor, 10),
                wholeFloor: Number(formData.wholeFloor, 10),
                startDate: formData.startDate,
                endDate: formData.endDate
            };
            
            //console.log('Sending formData:', dataToSend); // formData 확인
            const response = await instance.post(`/realEstate/property/step2/${addressId}`, dataToSend);

            const propertyId = response.data.result.propertyId;
            handleNext(propertyId);
        } catch (error) {
            console.error('에러 발생:', error);
            alert('서버와의 통신 중 에러가 발생했습니다. 입력한 정보를 확인해주세요.');
        }
    };
    
    const convertToSquareMeters = (area) => (area * 3.3).toFixed(2);

    return (
        <>
            <div style={PropertyOptionWrap}>
                <>
                    <div style={{ display: 'flex' }}>
                                <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>매물 정보</div>
                                <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                                <div> 필수입력</div>
                    </div>
                    <hr style={sectionLineStyle} />

                    <div style={scrollableContentStyle}>
                    <Grid theme='registerForm'>

                {/* 매물유형 */}
                <FormControl>
                    <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div>매물유형</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                    </FormLabel>
                    <RadioGroup
                        name="structure"
                        value={formData.structure}
                        onChange={(e) => handleInputChange('structure', e.target.value)}
                        row
                    >
                        {/* 매물유형 value 이름 영어로 수정필요 */}
                        <FormControlLabel value="APART" control={<Radio />} label="아파트" />
                        <FormControlLabel value="VILLA" control={<Radio />} label="빌라/투룸+" />
                        <FormControlLabel value="OFFICETEL" control={<Radio />} label="오피스텔" />
                        <FormControlLabel value="ONE_ROOM" control={<Radio />} label="원룸" />
                        <FormControlLabel value="ETC" control={<Radio />} label="기타" />
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 계약형태 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <div >단기</div>
                </FormControl>
                <FormControl>
                    <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 금액 지불 형태 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <div>일시불</div>
                </FormControl>


                {/* 주차임 */}
                <FormControl>
                <FormLabel >
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 주차임 </div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                <TextField
                    label="주차임"
                    variant='outlined'
                    size='small'
                    type='number'
                    value={formData.weeklyFee}
                    onChange={(e) => handleInputChange('weeklyFee', e.target.value)}
                    InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
                />
                </FormControl>

                {/* 보증금 여부 */}
                <FormControl>
                    <FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <div>보증금</div>
                        <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        name="deposit"
                        value={formData.deposit.toString()}
                        onChange={(e) => handleInputChange('deposit', e.target.value === 'true')}
                        row
                    >
                        <FormControlLabel value="true" control={<Radio />} label="있음" />
                        <FormControlLabel value="false" control={<Radio />} label="없음" />
                    </RadioGroup>
                    {formData.deposit && (
                    <TextField
                        label="보증금"
                        variant='outlined'
                        size='small'
                        type='number'
                        value={formData.depositFee}
                        onChange={(e) => handleInputChange('depositFee', e.target.value)}
                        InputProps={{ endAdornment: <InputAdornment position="end">만원</InputAdornment> }}
                    />
                    )}
                </FormControl>

                {/* 관리비 여부 */}
                <FormControl>
                    <FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <div>관리비</div>
                        <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        name="management"
                        value={formData.management.toString()}
                        onChange={(e) => handleInputChange('management', e.target.value === 'true')}
                        row
                    >
                        <FormControlLabel value="true" control={<Radio />} label="있음" />
                        <FormControlLabel value="false" control={<Radio />} label="없음" />
                    </RadioGroup>
                    {formData.management && (
                    <TextField
                        label="관리비"
                        variant='outlined'
                        size='small'
                        type='number'
                        value={formData.managementFee}
                        onChange={(e) => handleInputChange('managementFee', e.target.value)}
                        InputProps={{ endAdornment: <InputAdornment position="end">만원</InputAdornment> }}
                    />
                    )}
                </FormControl>

                {/* 개별 사용료 */}
                <FormControl>
                    <FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <div>개별 사용료</div>
                        <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        name="UsageFee"
                        value={formData.UsageFee.toString()}
                        onChange={(e) => handleInputChange('UsageFee', e.target.value === 'true')}
                        row
                    >
                        <FormControlLabel value="true" control={<Radio />} label="있음" />
                        <FormControlLabel value="false" control={<Radio />} label="없음" />
                    </RadioGroup>
                </FormControl>

                {/* 가격 협의 가능 여부 */}
                <FormControl>
                    <FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <div>가격 협의 가능</div>
                        <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        name="negotiationFee"
                        value={formData.negotiationFee.toString()}
                        onChange={(e) => handleInputChange('negotiationFee', e.target.value === 'true')}
                        row
                    >
                        <FormControlLabel value="true" control={<Radio />} label="가능" />
                        <FormControlLabel value="false" control={<Radio />} label="불가능" />
                    </RadioGroup>
                </FormControl>

                {/* 융자 여부 */}
                <FormControl>
                    <FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <div>융자금</div>
                        <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        name="loanFund"
                        value={formData.loanFund.toString()}
                        onChange={(e) => handleInputChange('loanFund', e.target.value === 'true')}
                        row
                    >
                        <FormControlLabel value="true" control={<Radio />} label="있음" />
                        <FormControlLabel value="false" control={<Radio />} label="없음" />
                    </RadioGroup>
                </FormControl>

                {/* 계약 시작/종료 날짜 */}
                <FormControl>
                    <FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <div>계약 가능 날짜</div>
                        <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                        <TextField
                            label="시작 날짜"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <TextField
                            label="종료 날짜"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </FormControl>
                </FormControl>

                {/* 최소 계약 기간 */}
                <FormControl>
                    <FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <div>계약 가능 날짜</div>
                        <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <TextField
                        label="최소 계약 기간"
                        variant='outlined'
                        size='small'
                        type='number'
                        inputProps={{ min: 1 , max: 12}}
                        value={formData.minimum}
                        onChange={(e) => handleInputChange('minimum', e.target.value)}
                        InputProps={{ endAdornment: <InputAdornment position="end">주</InputAdornment> }}
                    />
                </FormControl>

                {/* 방/욕실 개수 */}
                <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FormControl style={{flexDirection: 'column'}}>
                <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 방 개수</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                <TextField
                    label="방 개수"
                    variant='outlined'
                    size='small'
                    type='number'
                    value={formData.roomCount}
                    onChange={(e) => handleInputChange('roomCount', e.target.value)}
                />
                </FormControl>
                <FormControl style={{flexDirection: 'column'}}>
                <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 욕실 개수</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                <TextField
                    label="욕실 개수"
                    variant='outlined'
                    size='small'
                    type='number'
                    value={formData.bathroomCount}
                    onChange={(e) => handleInputChange('bathroomCount', e.target.value)}
                />
                </FormControl>
                </FormControl>

                {/* 공급면적/전용면적 */}
                <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 공급면적</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                <TextField
                    label="공급면적 (평)"
                    variant='outlined'
                    size='small'
                    type='number'
                    value={formData.area1}
                    onChange={(e) => handleInputChange('area1', e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">평</InputAdornment>,
                    }}
                />
                <TextField
                    variant='outlined'
                    size='small'
                    type='text'
                    value={convertToSquareMeters(formData.area1)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">㎡</InputAdornment>,
                    }}

                />
                </FormControl>
                <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 전용면적</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                <TextField
                    label="전용면적 (평)"
                    variant='outlined'
                    size='small'
                    type='number'
                    value={formData.area2}
                    onChange={(e) => handleInputChange('area2', e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">평</InputAdornment>,
                    }}
                />
                <TextField
                    variant='outlined'
                    size='small'
                    type='text'
                    value={convertToSquareMeters(formData.area2)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">㎡</InputAdornment>,
                    }}
                />
                </FormControl>

                {/* 해당층/전체층 */}
                <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FormControl style={{flexDirection: 'column'}}>
                <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 해당층</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                <TextField
                    label="해당층"
                    variant='outlined'
                    size='small'
                    type='number'
                    value={formData.floor}
                    onChange={(e) => handleInputChange('floor', e.target.value)}
                />
                </FormControl>
                <FormControl style={{flexDirection: 'column'}}>
                <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 전체층</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                <TextField
                    label="전체층"
                    variant='outlined'
                    size='small'
                    type='number'
                    value={formData.wholeFloor}
                    onChange={(e) => handleInputChange('wholeFloor', e.target.value)}
                />
                </FormControl>
                </FormControl>

                {/* 주차 가능 여부 */}
                <FormControl>
                <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 세대당 주차</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                    <RadioGroup
                        name="parkingAvailable"
                        value={formData.parkingAvailable.toString()}
                        onChange={(e) => handleInputChange('parkingAvailable', e.target.value === 'true')}
                        row
                    >
                        <FormControlLabel value="true" control={<Radio />} label="가능" />
                        <FormControlLabel value="false" control={<Radio />} label="불가능" />
                    </RadioGroup>
                </FormControl>

                {/* 가전제품 여부 */}
                <FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div> 옵션 여부</div>
                    <div style={{ color: 'red' }}>*</div>
                    </div>
                </FormLabel>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.washingmachine}
                                onChange={() => handleCheckboxChange('washingmachine')}
                            />
                        }
                        label="세탁기"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.airconditioner}
                                onChange={() => handleCheckboxChange('airconditioner')}
                            />
                        }
                        label="에어컨"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.refrigerator}
                                onChange={() => handleCheckboxChange('refrigerator')}
                            />
                        }
                        label="냉장고"
                    />
                </FormGroup>
                </Grid>
                </div>
                {/* Next 버튼 */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button theme='nextB' onClick={() => handleNextSection('추가정보')}>Next: 추가 정보</Button>
                </Box>
                </>
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
    maxHeight: '450px', // Adjust height as needed
    overflowY: 'auto',
};

export default PropertyOption;
