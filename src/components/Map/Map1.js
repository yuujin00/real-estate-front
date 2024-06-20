import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Map = ({ onCenterChanged }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const { naver } = window;

    const latitude = 37.3595316;
    const longitude = 127.1052133;
    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: location,
      zoom: 15,
      mapTypeControl: true,
    };

    if (!mapRef.current) return;

    const mapInstance = new naver.maps.Map(mapRef.current, mapOptions);

    mapInstance.setCursor("pointer");

    naver.maps.Event.addListener(mapInstance, "dragend", () => {
      const center = mapInstance.getCenter();
      onCenterChanged(center);
    });

    naver.maps.Event.addListener(mapInstance, "zoom_changed", () => {
      const center = mapInstance.getCenter();
      onCenterChanged(center);
    });
  }, [onCenterChanged]);

  return <MapContainer id="map" ref={mapRef} />;
};

const MapContainer = styled.div`
  width: 340px;
  height: 200px;
`;

export default Map;
