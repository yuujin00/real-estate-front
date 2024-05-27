import React, { useState } from 'react';
import { Grid, Button } from '..';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FormControl, TextField, InputAdornment, Box } from '@mui/material';

function PropertyAdd({ address }) {
    const [parkingType, setparkingType] = useState('그 외 주차시설');
    const [currentSection, setCurrentSection] = useState('추가정보');
    const [formData, setFormData] = useState({
        summary: '',
        description: '',
        roadRelationX: '',
        roadRelationY: '',
        roadType: '',
        busStopDistance: '',
        busTravelTime: '',
        subwayStationDistance: '',
        subwayTravelTime: '',
        otherParking:'',
        mallDistance: '',
        mallTravelTime: '',
        medicalFacilityDistance: '',
        medicalTravelTime: '',
    });

    const requiredFields = {
        추가정보: ['summary', 'description'],
        상세정보: [
            'roadRelationX', 'roadRelationY', 'roadType', 'busStopDistance', 'busTravelTime', 
            'subwayStationDistance', 'subwayTravelTime', 'parkingType',
            'mallDistance', 'mallTravelTime', 'medicalFacilityDistance', 'medicalTravelTime'
        ],
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
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <>
            <div style={PropertyOptionAdd}>
                {currentSection === '추가정보' && (
                    <>
                        <div style={{ display: 'flex', margin: '10px 0' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>추가 정보</div>
                            <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                            <div> 필수입력</div>
                        </div>
                        <hr style={sectionLineStyle} />
                        <div style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0' }}>{address}</div>

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
                                        id="summary"
                                        label="한 마디로 정리해 주세요."
                                        variant="outlined"
                                        size="large"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.summary}
                                        onChange={(e) => handleInputChange('summary', e.target.value)}
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
                                        id="description"
                                        label="상세 설명을 입력해 주세요."
                                        variant="outlined"
                                        size="large"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                        </div>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button onClick={() => handleNextSection('상세정보')}>Next: 상세 정보</Button>
                        </Box>
                    </>
                )}

                {currentSection === '상세정보' && (
                    <>
                        <div style={{ display: 'flex', margin: '10px 0' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>상세 정보</div>
                            <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                            <div> 필수입력</div>
                        </div>
                        <hr style={sectionLineStyle} />
                        <div style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0' }}>{address}</div>

                        <div style={scrollableContentStyle}>
                            <Grid theme="registerForm">
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
                                        value={formData.roadRelationX}
                                        onChange={(e) => handleInputChange('roadRelationX', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }}
                                    />
                                    <div style={{ fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>X</div>
                                    <TextField
                                        label=""
                                        inputProps={{ min: 0 }}
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        value={formData.roadRelationY}
                                        onChange={(e) => handleInputChange('roadRelationY', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }}
                                    />
                                </FormControl>
                                <RadioGroup
                                    name="roadType"
                                    value={formData.roadType}
                                    onChange={(e) => handleInputChange('roadType', e.target.value)}
                                    style={{ flexDirection: 'row', display: 'flex' }}
                                >
                                    <FormControlLabel value="포장" control={<Radio />} label="포장" />
                                    <FormControlLabel value="비포장" control={<Radio />} label="비포장" />
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
                                        id="busStopDistance"
                                        label="버스"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.busStopDistance}
                                        onChange={(e) => handleInputChange('busStopDistance', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">정류장</InputAdornment> }}
                                    />
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>소요시간</FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <RadioGroup
                                        name="busTravelMode"
                                        value={formData.busTravelMode}
                                        onChange={(e) => handleInputChange('busTravelMode', e.target.value)}
                                        style={{ flexDirection: 'row', display: 'flex' }}
                                    >
                                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                                    </RadioGroup>
                                        <TextField
                                            label=""
                                            variant="outlined"
                                            inputProps={{ min: 0 }}
                                            size="small"
                                            type="number"
                                            value={formData.busTravelTime}
                                            onChange={(e) => handleInputChange('busTravelTime', e.target.value)}
                                            InputProps={{ endAdornment: <InputAdornment position="end">분</InputAdornment> }}
                                        />
                                    </div>
                                </FormControl>

                                <FormControl variant="outlined" size="small">
                                    <FormLabel>지하철</FormLabel>
                                    <TextField
                                        id="subwayStationDistance"
                                        label="지하철"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.subwayStationDistance}
                                        onChange={(e) => handleInputChange('subwayStationDistance', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">역</InputAdornment> }}
                                    />
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>소요시간</FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <RadioGroup
                                        name="subwayTravelMode"
                                        value={formData.subwayTravelMode}
                                        onChange={(e) => handleInputChange('subwayTravelMode', e.target.value)}
                                        style={{ flexDirection: 'row', display: 'flex' }}
                                    >
                                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                                    </RadioGroup>

                                        <TextField
                                            label=""
                                            variant="outlined"
                                            inputProps={{ min: 0 }}
                                            size="small"
                                            type="number"
                                            value={formData.subwayTravelTime}
                                            onChange={(e) => handleInputChange('subwayTravelTime', e.target.value)}
                                            InputProps={{ endAdornment: <InputAdornment position="end">분</InputAdornment> }}
                                        />
                                    </div>
                                </FormControl>

                                <FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <div> 판매 및 의료시설 </div>
                                        <div style={{ color: 'red' }}>*</div>
                                    </div>
                                </FormLabel>
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>백화점 및 할인매장</FormLabel>
                                    <TextField
                                        id="mallDistance"
                                        label="백화점 및 할인매장"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.mallDistance}
                                        onChange={(e) => handleInputChange('mallDistance', e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>소요시간</FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <RadioGroup
                                        name="mallTravelMode"
                                        value={formData.mallTravelMode}
                                        onChange={(e) => handleInputChange('mallTravelMode', e.target.value)}
                                        style={{ flexDirection: 'row', display: 'flex' }}
                                    >
                                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                                        
                                    </RadioGroup>
                                        <TextField
                                            label=""
                                            variant="outlined"
                                            inputProps={{ min: 0 }}
                                            size="small"
                                            type="number"
                                            value={formData.mallTravelTime}
                                            onChange={(e) => handleInputChange('mallTravelTime', e.target.value)}
                                            InputProps={{ endAdornment: <InputAdornment position="end">분</InputAdornment> }}
                                        />
                                        </div>
                                </FormControl>

                                <FormControl variant="outlined" size="small">
                                    <FormLabel>종합의료시설</FormLabel>
                                    <TextField
                                        id="medicalFacilityDistance"
                                        label="종합의료시설"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginLeft: '10px' }}
                                        value={formData.medicalFacilityDistance}
                                        onChange={(e) => handleInputChange('medicalFacilityDistance', e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>소요시간</FormLabel>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <RadioGroup
                                        name="medicalTravelMode"
                                        value={formData.medicalTravelMode}
                                        onChange={(e) => handleInputChange('medicalTravelMode', e.target.value)}
                                        style={{ flexDirection: 'row', display: 'flex' }}
                                    >
                                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                                        </RadioGroup>
                                        <TextField
                                            label=""
                                            variant="outlined"
                                            inputProps={{ min: 0 }}
                                            size="small"
                                            type="number"
                                            value={formData.medicalTravelTime}
                                            onChange={(e) => handleInputChange('medicalTravelTime', e.target.value)}
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
                                <RadioGroup
                                    name="parkingType"
                                    value={formData.parkingType}
                                    onChange={(e) =>{ 
                                        setparkingType(e.target.value);
                                        handleInputChange('parkingType', e.target.value)}}
                                    style={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="없음" control={<Radio />} label="없음" />
                                    <FormControlLabel value="전용주차시설" control={<Radio />} label="전용주차시설" />
                                    <FormControlLabel value="공용주차시설" control={<Radio />} label="공용주차시설" />
                                    <FormControlLabel value="그 외 주차시설" control={<Radio />} label="그 외 주차시설" />
                                </RadioGroup>
                                {parkingType === '그 외 주차시설' && (
                                        <TextField
                                            label="그 외 주차시설 입력"
                                            variant="outlined"
                                            size="small"
                                            value={formData.otherParking}
                                            onChange={(e) => handleInputChange('otherParking', e.target.value)}
                                        />
                                )}
                               </FormControl>
                            </Grid>
                        </div>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button onClick={() => handleNextSection('추가정보')}>Previous: 추가 정보</Button>
                            <Button onClick={() => handleNextSection('제출')}>Next: 제출</Button>
                        </Box>
                    </>
                )}

                {currentSection === '제출' && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>
                                매물 옵션 제출이 완료되었습니다.
                                <br />
                                이미지업로드를 눌러주세요.
                            </div>
                        </div>
                    </>
                )}
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
