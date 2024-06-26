import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Map = ({lat = 37.3595316, long = 127.1052133}) => {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!instanceRef.current) return;

    const { naver } = window;

    instanceRef.current.setCenter(new naver.maps.LatLng(lat, long));

  }, [lat, long]);

  useEffect(() => {
    const { naver } = window;

    const latitude = lat; // 임의의 위도 값
    const longitude = long; // 임의의 경도 값
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

    instanceRef.current = mapInstance;

    // Rest of the code remains unchanged
  }, []);

  return <MapContainer id="map" ref={mapRef} />;
};

const MapContainer = styled.div`
  width: 390px;
  height: 520px;
`;

export default Map;