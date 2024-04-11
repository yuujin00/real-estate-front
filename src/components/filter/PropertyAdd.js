import React, { useEffect, useRef, useState } from 'react';
import { Grid, Button, Img } from '..';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FormControl, Select, MenuItem, InputLabel,TextField, InputAdornment } from '@mui/material';

function PropertyAdd({address}){
    return(
        <>
            <div style={PropertyOptionAdd}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>매물 정보</div>
                    <div style={{ color: 'red', marginLeft: '220px' }}>*</div>
                    <div> 필수입력</div>
                </div>
                <hr style={{ width: '100%', height: '1px', border: 'none', backgroundColor: '#D9D9D9' }} />
                <div style={{ fontSize: '25px', fontWeight: 'bold', margin: '10px 0' }}>{address}</div>

                <Grid theme='registerForm'>
                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 한 문장으로 정리 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl variant="outlined" size="small">
                                <TextField
                                    id='managementCostInput'
                                    label='한 마디로 정리해 주세요.'
                                    variant='outlined'
                                    size='large'
                                    style={{ marginLeft: '10px' }}
                                />
                </FormControl>

                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 상세 설명 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl variant="outlined" size="small">
                                <TextField
                                    id='managementCostInput'
                                    label='상세 설명을 입력해 주세요.'
                                    variant='outlined'
                                    size='large'
                                    style={{ marginLeft: '10px' }}
                                />
                </FormControl>

                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 도로와의 관계 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl style={{ flexDirection: 'row', display: 'fixed' }}>
                            <TextField
                                label=''
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                       m
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <div style={{ fontWeight: 'bold', marginLeft: '10px', marginRight:'10px' }}>X</div>
                            <TextField
                                label=''
                                inputProps={{ min: 0 }}
                                variant='outlined'
                                size='small'
                                type='number'
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                       m
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                </FormControl>
                <RadioGroup
                        defaultValue="포장"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="포장" control={<Radio />} label="포장" />
                        <FormControlLabel value="비포장" control={<Radio />} label="비포장" />
                </RadioGroup>

                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 대중교통 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 버스 </div>
                        </div>
                                <TextField
                                    id='managementCostInput'
                                    label='버스'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           정류장
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                </FormControl>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 소요시간 </div>
                        </div>
                        <RadioGroup
                        defaultValue="도보"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                        <TextField
                                    label=''
                                    variant='outlined'
                                    inputProps={{ min: 0 }}
                                    size='small'
                                    type='number'
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           분
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                        </RadioGroup>
                </FormControl>

                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 지하철 </div>
                        </div>
                                <TextField
                                    id='managementCostInput'
                                    label='지하철'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           역
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                </FormControl>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 소요시간 </div>
                        </div>
                        <RadioGroup
                        defaultValue="도보"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                        <TextField
                                    label=''
                                    variant='outlined'
                                    inputProps={{ min: 0 }}
                                    size='small'
                                    type='number'
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           분
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                        </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 주차장 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                    <RadioGroup
                        defaultValue="주차장"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="없음" control={<Radio />} label="아파트" />
                        <FormControlLabel value="전용주차시설" control={<Radio />} label="빌라/투룸+" />
                        <FormControlLabel value="공용주차시설" control={<Radio />} label="오피스텔" />
                        <FormControlLabel value="그 외 주차시설" control={<Radio />} label="원룸" />
                        <FormControl variant="outlined" size="small">
                        <TextField
                                    label='그 외 주차시설 입력'
                                    variant='outlined'
                                    size='small'
                                />
                        </FormControl>
                    </RadioGroup>
                </FormControl>

                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 교육시설 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 초등학교 </div>
                        </div>
                                <TextField
                                    id='managementCostInput'
                                    label='초등'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           학교
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                </FormControl>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 소요시간 </div>
                        </div>
                        <RadioGroup
                        defaultValue="도보"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                        <TextField
                                    label=''
                                    variant='outlined'
                                    inputProps={{ min: 0 }}
                                    size='small'
                                    type='number'
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           분
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                        </RadioGroup>
                </FormControl>

                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 중학교 </div>
                        </div>
                                <TextField
                                    id='managementCostInput'
                                    label='중'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           학교
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                </FormControl>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 소요시간 </div>
                        </div>
                        <RadioGroup
                        defaultValue="도보"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                        <TextField
                                    label=''
                                    variant='outlined'
                                    inputProps={{ min: 0 }}
                                    size='small'
                                    type='number'
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           분
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                        </RadioGroup>
                </FormControl>
                
                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 판매 및 의료 시설 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 고등학교 </div>
                        </div>
                                <TextField
                                    id='managementCostInput'
                                    label='고등'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           학교
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                </FormControl>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 소요시간 </div>
                        </div>
                        <RadioGroup
                        defaultValue="도보"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                        <TextField
                                    label=''
                                    variant='outlined'
                                    inputProps={{ min: 0 }}
                                    size='small'
                                    type='number'
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           분
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                        </RadioGroup>
                </FormControl>

                <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 대중교통 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                    </FormLabel>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 백화점 및 할인매장 </div>
                        </div>
                                <TextField
                                    id='managementCostInput'
                                    label='백화점 및 할인매장'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                />
                </FormControl>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 소요시간 </div>
                        </div>
                        <RadioGroup
                        defaultValue="도보"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                        <TextField
                                    label=''
                                    variant='outlined'
                                    inputProps={{ min: 0 }}
                                    size='small'
                                    type='number'
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           분
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                        </RadioGroup>
                </FormControl>

                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 종합의료시설 </div>
                        </div>
                                <TextField
                                    id='managementCostInput'
                                    label='종합의료시설'
                                    variant='outlined'
                                    size='small'
                                    style={{ marginLeft: '10px' }}
                                />
                </FormControl>
                <FormControl variant="outlined" size="small">
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 소요시간 </div>
                        </div>
                        <RadioGroup
                        defaultValue="도보"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                        <TextField
                                    label=''
                                    variant='outlined'
                                    inputProps={{ min: 0 }}
                                    size='small'
                                    type='number'
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                           분
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                        </RadioGroup>
                </FormControl>

                <FormControl>
                    <RadioGroup
                        defaultValue="용의함"
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row', display: 'fixed' }} // Arrange radio buttons horizontally
                    >
                        <FormLabel >
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <div> 접근성 </div>
                            <div style={{ color: 'red' }}>*</div>
                        </div>
                        </FormLabel>
                        <FormControlLabel value="용의함" control={<Radio />} label="용의함" />
                        <FormControlLabel value="불편함" control={<Radio />} label="불편함" />
                    </RadioGroup>
                </FormControl>

                </Grid>
            </div>
        </>
    )
}

const PropertyOptionAdd = {
    height: '100%',
};

export default PropertyAdd;