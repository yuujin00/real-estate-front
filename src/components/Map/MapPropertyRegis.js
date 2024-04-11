import React, { useEffect, useRef, useState } from 'react';
import { Grid, Button, Img } from '..';
//import UnderBar from '../components/Bar/MapBar.js';

const MapPropertyRegis = ({ handleButtonClick }) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [address, setAddress] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [marker, setMarker] = useState(null); // 마커 상태 추가
  const [isVisible, setIsVisible] = useState(true);


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

    // 기본 위치에 마커 추가
    const defaultLatLng = new naver.maps.LatLng(latitude, longitude);
    const defaultMarker = new naver.maps.Marker({
      position: defaultLatLng,
      map: mapInstance
    });
    setMarker(defaultMarker);

    searchAddressToCoordinate('정자동 178-1');
  }, []);

  const searchCoordinateToAddress = (latlng) => {
    if (!infoWindow) return; // infoWindow가 null인 경우 함수 종료
    // infoWindow가 null이 아닐 때에만 close() 메서드 호출
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

  const handleClickConfirm = () => {
    handleButtonClick(address);
    setIsVisible(false); 
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  if (!isVisible) {
    return null; // isVisible이 false이면 컴포넌트를 렌더링하지 않음
  }

  return (
    <div style={mainWrap}>
      <div>
        <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button id="submit" onClick={() => searchAddressToCoordinate(address)}>검색</button>
      </div>
      <div id="map" style={{ width: '390px', height: '520px' }} ref={mapRef} />
      <div style={{ bottom: 0, left: 0, width: '100%', maxWidth: '390px', Height: '250px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>이 주소가 맞나요?</div>
        <div id="searchResult" dangerouslySetInnerHTML={{ __html: searchResult }}/>
        <Grid theme='startGrid'>
						<Button theme='startBtn' children='확인' onClick={handleClickConfirm}/>
		</Grid>
       </div>
    </div>
  );
};

const mainWrap = {
    height: '100%',
};

export default MapPropertyRegis;
