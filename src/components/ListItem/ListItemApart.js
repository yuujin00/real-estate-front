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
        >
          <div className="list-image">
            {/* {item.imageUrls.length > 0 && <img src={item.imageUrls[0]} alt="Property" />} */}
          </div>
          <div className="list-details">
            <div className="list-title">{item.address.streetAddress}</div>
            <div className="list-price">{item.price}</div>
            <div className="list-deta">
              <div className="list-location">{item.address.city}</div>
              <div className="list-button-container">
                <button
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#D99E73",
                    color: "white",
                    border: "none",
                  }}
                >
                  상세보기
                </button>{" "}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
