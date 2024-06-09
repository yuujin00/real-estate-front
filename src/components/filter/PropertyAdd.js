import React, { useState ,useEffect } from 'react';
import { Grid, Button } from '..';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FormControl, TextField, InputAdornment, Box } from '@mui/material';
import instance from '../../api/axios';

function PropertyAdd({handleNext, propertyId}) {
    const [currentSection, setCurrentSection] = useState('추가정보');
    const [formData, setFormData] = useState({
        lineMemo: '',
        memo: '',
        street: '',
        streetR: '',
        streetPaving: true,
        busStation: '',
        busWalk: true,
        busTime: '',
        subwayStation: '',
        subwayWalk:true,
        subwayTime: '',
        parkingOption: '',
    });

    const validateSection = () => {
        const requiredFields = {
            추가정보: ['lineMemo', 'memo', 'street', 'streetR', 'streetPaving', 'busStation', 'busWalk', 'busTime', 'subwayStation', 'subwayWalk', 'subwayTime', 'parkingOption'],
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
                street: parseInt(formData.street, 10),
                streetR: parseInt(formData.streetR, 10),
                busTime: parseInt(formData.busTime, 10),
                subwayTime: parseInt(formData.subwayTime, 10),
            };
            
            //console.log('Sending formData:', dataToSend); // formData 확인
            const response = await instance.post(`/realEstate/property/step3/${propertyId}`, dataToSend);

            handleNext(propertyId);
        } catch (error) {
            console.error('에러 발생:', error);
            alert('서버와의 통신 중 에러가 발생했습니다. 입력한 정보를 확인해주세요.');
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <>
            <div style={PropertyOptionAdd}>
                    <>
                        <div style={{ display: 'flex' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>추가 정보</div>
                            <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                            <div> 필수입력</div>
                        </div>
                        <hr style={sectionLineStyle} />

                        <div style={scrollableContentStyle}>
                            <Grid theme="registerForm">

                                <FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 한 문장으로 정리 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <FormControl variant="outlined" size="small">
                                    <TextField
                                        label="한 마디로 정리해 주세요."
                                        variant="outlined"
                                        size="large"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.lineMemo}
                                        onChange={(e) => handleInputChange('lineMemo', e.target.value)}
                                    />
                                </FormControl>

                                <FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 상세 설명 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <FormControl variant="outlined" size="small">
                                    <TextField
                                        label="상세 설명을 입력해 주세요."
                                        variant="outlined"
                                        size="large"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.memo}
                                        onChange={(e) => handleInputChange('memo', e.target.value)}
                                    />
                                </FormControl>
                                <FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 도로와의 관계 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <FormControl style={{ flexDirection: 'row', display: 'flex' }}>
                                    <TextField
                                        label=""
                                        inputProps={{ min: 0 }}
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        value={formData.street}
                                        onChange={(e) => handleInputChange('street', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }}
                                    />
                                    <div style={{ fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>X</div>
                                    <TextField
                                        label=""
                                        inputProps={{ min: 0 }}
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        value={formData.streetR}
                                        onChange={(e) => handleInputChange('streetR', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }}
                                    />
                                </FormControl>
                                <RadioGroup
                                    name="streetPaving"
                                    value={formData.streetPaving}
                                    onChange={(e) => handleInputChange('streetPaving', e.target.value)}
                                    style={{ flexDirection: 'row', display: 'flex' }}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="포장" />
                                    <FormControlLabel value="false" control={<Radio />} label="비포장" />
                                </RadioGroup>
                                

                                <FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 대중교통 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>버스</FormLabel>
                                    <TextField
                                        label="버스"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.busStation}
                                        onChange={(e) => handleInputChange('busStation', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">정류장</InputAdornment> }}
                                    />
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>소요시간</FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <RadioGroup
                                        name="busWalk"
                                        value={formData.busWalk}
                                        onChange={(e) => handleInputChange('busWalk', e.target.value)}
                                        style={{ flexDirection: 'row', display: 'flex' }}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="도보" />
                                        <FormControlLabel value="false" control={<Radio />} label="차량" />
                                    </RadioGroup>
                                        <TextField
                                            variant="outlined"
                                            inputProps={{ min: 0 }}
                                            size="small"
                                            type="number"
                                            value={formData.busTime}
                                            onChange={(e) => handleInputChange('busTime', e.target.value)}
                                            InputProps={{ endAdornment: <InputAdornment position="end">분</InputAdornment> }}
                                        />
                                    </div>
                                </FormControl>

                                <FormControl variant="outlined" size="small">
                                    <FormLabel>지하철</FormLabel>
                                    <TextField
                                        label="지하철"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.subwayStation}
                                        onChange={(e) => handleInputChange('subwayStation', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">역</InputAdornment> }}
                                    />
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>소요시간</FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <RadioGroup
                                        name="subwayWalk"
                                        value={formData.subwayWalk}
                                        onChange={(e) => handleInputChange('subwayWalk', e.target.value)}
                                        style={{ flexDirection: 'row', display: 'flex' }}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="도보" />
                                        <FormControlLabel value="false" control={<Radio />} label="차량" />
                                    </RadioGroup>

                                        <TextField
                                            variant="outlined"
                                            inputProps={{ min: 0 }}
                                            size="small"
                                            type="number"
                                            value={formData.subwayTime}
                                            onChange={(e) => handleInputChange('subwayTime', e.target.value)}
                                            InputProps={{ endAdornment: <InputAdornment position="end">분</InputAdornment> }}
                                        />
                                    </div>
                                </FormControl>
                                <FormControl>
                                <FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 주차장 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                {/* 주차시설 value 이름 영어로 수정필요 */}
                                <RadioGroup
                                    name="parkingOption"
                                    value={formData.parkingOption}
                                    onChange={(e) =>{ 
                                        handleInputChange('parkingOption', e.target.value)}}
                                    style={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="없음" control={<Radio />} label="없음" />
                                    <FormControlLabel value="전용주차시설" control={<Radio />} label="전용주차시설" />
                                    <FormControlLabel value="SHARED" control={<Radio />} label="공용주차시설" />
                                    <FormControlLabel value="그 외 주차시설" control={<Radio />} label="그 외 주차시설" />
                                    {formData.parkingOption === '그 외 주차시설' && (
                                        <TextField
                                            label="그 외 주차시설 입력"
                                            variant="outlined"
                                            size="small"
                                            value={formData.otherParking}
                                            onChange={(e) => handleInputChange('otherParking', e.target.value)}
                                        />
                                    )}
                                </RadioGroup>
                                
                               </FormControl>
                            </Grid>
                        </div>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button onClick={() => handleNextSection('이미지업로드')}>Next: 이미지업로드</Button>
                        </Box>
                    </>

            </div>
        </>
    );
}

const PropertyOptionAdd = {
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

export default PropertyAdd;
