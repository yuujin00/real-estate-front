import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const { naver } = window;

    const latitude = 37.3595316; // 임의의 위도 값
    const longitude = 127.1052133; // 임의의 경도 값
    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: location,
      zoom: 15,
      mapTypeControl: true,
    };

    if (!mapRef.current) return; // Check if map container exists before initializing map

    const mapInstance = new naver.maps.Map(mapRef.current, mapOptions);

    mapInstance.setCursor("pointer");

    mapInstance.addListener("click", function (e) {
      // Handle click event...
    });

    // Rest of the code remains unchanged
  }, []);

  return <MapContainer id="map" ref={mapRef} />;
};

const MapContainer = styled.div`
  width: 390px;
  height: 520px;
`;

export default Map;
