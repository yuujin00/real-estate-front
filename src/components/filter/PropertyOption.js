import React, { useEffect, useRef, useState } from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, Select, MenuItem,InputLabel,TextField, Checkbox,InputAdornment } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { Grid, Button, Img } from '..';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function PropertyOption({address}) {
    const [transactionType, setTransactionType] = useState('매매'); // 매매를 기본값으로 설정
    const [managementCost, setManagementCost] = useState('있음');
    const [otherPropertyType, setOtherPropertyType] = useState('');

    return (
        <>
            <div style={PropertyOptionWrap}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>매물 정보</div>
                    <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                    <div> 필수입력</div>
                </div>
                <hr style={{ width: '100%', height: '1px', border: 'none', backgroundColor: '#D9D9D9' }} />
                <div style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0' }}>{address}</div>

                <Grid theme='registerForm'>
                <FormControl>
                    <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 매물유형 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        defaultValue="아파트"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="아파트" control={<Radio />} label="아파트" />
                        <FormControlLabel value="빌라/투룸+" control={<Radio />} label="빌라/투룸+" />
                        <FormControlLabel value="오피스텔" control={<Radio />} label="오피스텔" />
                        <FormControlLabel value="원룸" control={<Radio />} label="원룸" />
                        <FormControlLabel value="기타" control={<Radio />} label="기타" />
                        <FormControl variant="outlined" size="small">
                        <InputLabel >기타매물유형선택</InputLabel>
                        <Select
                        label="기타"
                        value={otherPropertyType} // Set value to state
                        onChange={(e) => setOtherPropertyType(e.target.value)} // Update state on change
                        >
                        <MenuItem value='man'>1.........</MenuItem>
                        <MenuItem value='woman'>2.........</MenuItem>
                        </Select>
                        </FormControl>
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
                            <Select  label="건물유형">
                                    <MenuItem value='man'>1.........</MenuItem>
                                    <MenuItem value='woman'>2.......</MenuItem>
                            </Select>
                </FormControl>
                </Grid>

                {/*거래 정보 */}
                <hr style={{ width: '100%', height: '1px', border: 'none', backgroundColor: '#D9D9D9' }} />
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>거래 정보</div>
                    <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                    <div> 필수입력</div>
                </div>
                <hr style={{ width: '100%', height: '1px', border: 'none', backgroundColor: '#D9D9D9' }} />

                <Grid theme='registerForm'>
                <FormControl>
                    <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 계약형태 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        defaultValue="매매"
                        name="radio-buttons-group"
                        onChange={(e) => setTransactionType(e.target.value)}
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="매매" control={<Radio />} label="매매" />
                        <FormControlLabel value="전세" control={<Radio />} label="전세" />
                        <FormControlLabel value="월세" control={<Radio />} label="월세" />
                        <FormControlLabel value="단기" control={<Radio />} label="단기" />
                        {transactionType === '매매' && (
                            <FormLabel>
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <div> 매매 가격 정보 </div>
                                    <div style={{ color: 'red' }}>*</div>
                                </div>
                            </FormLabel>
                        )}
                        {transactionType === '매매' && (
                                <TextField
                                    id='managementCostInput'
                                    label='매매가격'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           원
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                            )}
                        {transactionType === '전세' && (
                            <FormLabel>
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <div> 전세 가격 정보 </div>
                                    <div style={{ color: 'red' }}>*</div>
                                </div>
                            </FormLabel>
                        )}
                        {transactionType === '전세' && (
                                <TextField
                                    id='managementCostInput'
                                    label='전세금 입력'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           원
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                        )}
                        {transactionType === '월세' && (
                            <FormLabel>
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <div> 월세 가격 정보 </div>
                                    <div style={{ color: 'red' }}>*</div>
                                </div>
                            </FormLabel>
                        )}
                        {transactionType === '월세' && (
                                <TextField
                                    id='managementCostInput'
                                    label='월세금 입력'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           원
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                                
                            )}
                        {transactionType === '월세' && (
                                <TextField
                                    id='managementCostInput'
                                    label='보증금 입력'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           원
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                                
                        )}
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
                            defaultValue="있음"
                            name="management-cost"
                            value={managementCost}
                            onChange={(e) => setManagementCost(e.target.value)}
                            style={{ flexDirection: 'row' }}
                        >
                            <FormControlLabel value="있음" control={<Radio />} label="있음" />
                            {managementCost === '있음' && (
                                <TextField
                                    id='managementCostInput'
                                    label='관리비'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           원
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                            )}
                        <FormControlLabel value="없음" control={<Radio />} label="없음" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <RadioGroup
                        defaultValue="있음"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 개별사용료 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                        </FormLabel>
                        <FormControlLabel value="있음" control={<Radio />} label="있음" />
                        <FormControlLabel value="없음" control={<Radio />} label="없음" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <RadioGroup
                        defaultValue="있음"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 가격협의 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                        </FormLabel>
                        <FormControlLabel value="가능" control={<Radio />} label="가능" />
                        <FormControlLabel value="불가능" control={<Radio />} label="불가능" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 입주가능일 </div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        defaultValue="있음"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >   
                        <FormControlLabel value="즉시입주" control={<Radio />} label="즉시입주" />
                        <FormControlLabel value="날짜선택" control={<Radio />} label="" />
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker  label="날짜선택" slotProps={{
                                                        textField: {
                                                            size: "small",
                                                        },}}/>
                        </LocalizationProvider>
                        <FormControlLabel style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', backgroundColor:'#D9D9D9'}} control={<Checkbox defaultChecked />} label="입주일 협의 가능" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <RadioGroup
                        defaultValue="있음"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 융자금 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                        </FormLabel>
                        <FormControlLabel value="있음" control={<Radio />} label="있음" />
                        <FormControlLabel value="없음" control={<Radio />} label="없음" />
                    </RadioGroup>
                </FormControl>
                </Grid>

                {/*상세정보 */}
                <hr style={{ width: '100%', height: '1px', border: 'none', backgroundColor: '#D9D9D9' }} />
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>상세 정보</div>
                    <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                    <div> 필수입력</div>
                </div>
                <hr style={{ width: '100%', height: '1px', border: 'none', backgroundColor: '#D9D9D9' }} />

                <Grid theme='registerForm'>
                
                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 방개수 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                </FormLabel>
                <TextField
                                id='age'
                                label='방개수'
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                            />
                </FormControl>

                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 욕실개수 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                </FormLabel >
                <TextField
                                id='age'
                                label='욕실개수'
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                            />
                </FormControl>

                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 공급 면적 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                            <TextField
                                id='age'
                                label='면적 입력'
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                       평
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <TextField
                                id='age'
                                label='면적 입력'
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                       ㎡
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                </FormControl>

                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 전용 면적 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                            <TextField
                                id='age'
                                label='면적 입력'
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                       평
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <TextField
                                id='age'
                                label='면적 입력'
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                       ㎡
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                </FormControl>
                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 해당 층 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                </FormLabel>
                <TextField
                                id='age'
                                label='방개수'
                                variant='outlined'
                                size='small'
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                       층
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                </FormControl>
                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 전체 층 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                </FormLabel>
                <TextField
                                id='age'
                                label='방개수'
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                       층
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                </FormControl>
                <FormControl>
                    <RadioGroup
                        defaultValue="있음"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 세대당 주차 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                        </FormLabel>
                        <FormControlLabel value="가능" control={<Radio />} label="가능" />
                        <FormControlLabel value="불가능" control={<Radio />} label="불가능" />
                    </RadioGroup>
                </FormControl>
                </Grid>
            </div>
        </>
    )
}

const PropertyOptionWrap = {
    height: '100%',
};
export default PropertyOption;
