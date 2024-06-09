import React, { useEffect, useRef, useState } from 'react';
import { Grid, Button, Img } from '..';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import instance from '../../api/axios';
import TextField from '@mui/material/TextField';

const MapPropertyRegis = ({ handleButtonClick }) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [address, setAddress] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [marker, setMarker] = useState(null); 
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

  useEffect(() => {
    const { naver } = window;
  
    const latitude = 37.3595316; // 임의의 위도 값
    const longitude = 127.1052133; // 임의의 경도 값
    const location = new naver.maps.LatLng(latitude, longitude);
  
    const mapOptions = {
      center: location,
      zoom: 15,
      mapTypeControl: true
    };
  
    if (!mapRef.current) return; // Check if map container exists before initializing map
  
    const mapInstance = new naver.maps.Map(mapRef.current, mapOptions);
    map.current = mapInstance;
  
    const infoWindowInstance = new naver.maps.InfoWindow({
      anchorSkew: true
    });
  
    setInfoWindow(infoWindowInstance);
  
    mapInstance.setCursor('pointer');
  
    mapInstance.addListener('click', function(e) {
      searchCoordinateToAddress(e.coord);
    });
  
    // Rest of the code remains unchanged
  }, []);

  const searchCoordinateToAddress = (latlng) => {
    if (!infoWindow) return;

    if (infoWindow) {
      infoWindow.close();
    }

    const { naver } = window;
    naver.maps.Service.reverseGeocode({
      coords: latlng,
      orders: [
        naver.maps.Service.OrderType.ADDR,
        naver.maps.Service.OrderType.ROAD_ADDR
      ].join(',')
    }, function(status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }

      var items = response.v2.results,
        address = '',
        htmlAddresses = [];

      for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
        item = items[i];
        address = makeAddress(item) || '';
        addrType = item.name === 'roadaddr' ? '[지번 주소]' : '[도로명 주소]';

        htmlAddresses.push(addrType + ' ' + address);
      }

      const result = [
        htmlAddresses.join('<br />'),
        '</div>'
      ].join('\n');

      setSearchResult(result);

      infoWindow.setContent(result);
    });
  };

  const searchAddressToCoordinate = (address) => {
    if (!infoWindow) return;

    if (infoWindow) {
      infoWindow.close();
    }

    const { naver } = window;
    naver.maps.Service.geocode({
      query: address
    }, function(status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }

      if (response.v2.meta.totalCount === 0) {
        return alert('totalCount' + response.v2.meta.totalCount);
      }

      var htmlAddresses = [],
        item = response.v2.addresses[0],
        point = new naver.maps.Point(item.x, item.y);

      if (item.roadAddress) {
        htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
      }

      if (item.jibunAddress) {
        htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
      }

      const result = [
        htmlAddresses.join('<br />'),
        '</div>'
      ].join('\n');

      setSearchResult(result);

      infoWindow.setContent(result);
      map.current.setCenter(point);

      // 마커 위치 변경
      if (marker) {
        marker.setPosition(point);
      } else {
        // marker가 없을 경우 새로 생성 후 세팅
        const newMarker = new naver.maps.Marker({
          position: point,
          map: map.current
        });
        setMarker(newMarker);
      }
    })
  };

  const moveMarkerTo = (latlng) => {
    const { naver } = window;
    const newMarker = new naver.maps.Marker({
      position: latlng,
      map: map.current
    });

    // 기존 마커 제거
    if (marker) {
      marker.setMap(null);
    }

    // 새로운 마커 설정
    setMarker(newMarker);
  };

  // React 컴포넌트 내부에 함수를 정의합니다.
  const makeAddress = (item) => {
    if (!item) {
      return;
    }

    const { name, region, land } = item;
    const isRoadAddress = name === 'roadaddr';

    let sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

    if (hasArea(region.area1)) {
      sido = region.area1.name;
    }

    if (hasArea(region.area2)) {
      sigugun = region.area2.name;
    }

    if (hasArea(region.area3)) {
      dongmyun = region.area3.name;
    }

    if (hasArea(region.area4)) {
      ri = region.area4.name;
    }

    if (land) {
      if (hasData(land.number1)) {
        if (hasData(land.type) && land.type === '2') {
          rest += '산';
        }

        rest += land.number1;

        if (hasData(land.number2)) {
          rest += ('-' + land.number2);
        }
      }

      if (isRoadAddress === true) {
        if (checkLastString(dongmyun, '면')) {
          ri = land.name;
        } else {
          dongmyun = land.name;
          ri = '';
        }

        if (hasAddition(land.addition0)) {
          rest += ' ' + land.addition0.value;
        }
      }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
  };

  const hasArea = (area) => {
    return !!(area && area.name && area.name !== '');
  };

  const hasData = (data) => {
    return !!(data && data !== '');
  };

  const checkLastString = (word, lastString) => {
    return new RegExp(lastString + '$').test(word);
  };

  const hasAddition = (addition) => {
    return !!(addition && addition.value);
  };

  const handleClickConfirm = async () => {
    try {
      const response = await instance.post('/realEstate/property/step1', { streetAddress: address });
  
      // Assuming the addressId is in response.data.addressId
      const addressId = response.data.result.addressId;
      
      // Pass address and addressId to handleButtonClick
      handleButtonClick(address, addressId);
      setIsVisible(false);
    } catch (error) {
      console.error('에러 발생:', error);
      alert('주소 제출 중 에러가 발생했습니다. 다시 시도해 주세요.');
  
      // Optionally, handle the error case to proceed without an addressId
      handleButtonClick(address, 1);
      setIsVisible(false);
    }
  };  
  

  if (!isVisible) {
    return null;
  }
  

  return (
    <>
      <Container>
        <SearchContainer>
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            value={address}
            onChange={handleChangeAddress}
          />
          <Button id="submit" onClick={() => searchAddressToCoordinate(address)}>검색</Button>
          <Button id="submit" onClick={handleOpenModal}>등록</Button>
        </SearchContainer>
        <MapContainer id="map" ref={mapRef} />
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalContent>
            <div>이 주소가 맞나요?</div>
            <br/>
            <div id="searchResult" dangerouslySetInnerHTML={{ __html: searchResult }} />
            <Grid theme='startGrid'>
              <Button theme='startBtn' children='확인' onClick={handleClickConfirm} />
            </Grid>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const MapContainer = styled.div`
  width: 390px;
  height: 520px;
`;

const ModalContent = styled.div`
  position: absolute;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  right: 10%; 
  top: 30px;
  max-width: 70%; 
  max-height: 80%; 
  overflow: auto; 
`;

export default MapPropertyRegis;
