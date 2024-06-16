import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

export default function ListItem() {
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "http://3.35.10.79:8080/realEstate/property/list",
        {
          headers: headers,
        }
      );
      setPropertyData(response.data.result.content);
      console.log(response.data.result.content)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="list">
      {propertyData.map((item) => (
        <Link
          key={item.propertyId}
          to={`/detailapart/${item.propertyId}`}
          className="list-item"
          style={{ position: "relative" }} // Added relative positioning
        >
          <div className="list-image">
            <img
              src={item.imageUrls}
              alt="Property"
              style={{ width: "80px", height: "auto" }}
            />
          </div>
          <div
            className="list-details"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="list-title">{item.address.streetAddress}</div>
            <div
              className="info"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <div className="list-price">{item.price}</div>
              <p style={{ margin: 0, marginLeft: "5px" }}> /1주 </p>
            </div>
            <div
              className="list-deta"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="list-location">{item.address.city}</div>
              <button
                style={{
                  position: "absolute",
                  right: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#D99E73",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                상세보기
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
