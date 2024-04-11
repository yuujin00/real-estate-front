import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function ListItem() {
  // 연동 전 데모 데이터
  const demoData = [
    {
      title: "두호SK뷰푸르지오1단지 103동 2층",
      price: "전세 3억 7천",
      content: "영일대 15분, 학군 밀집지역",
      id: 1,
    },
    {
      title: "임페리얼",
      price: "전세 1억",
      content: "일이삼사오육칠팔구십일일일",
      id: 2,
    },
    {
      title: "임페리얼",
      price: "전세 1억",
      content: "일이삼사오육칠팔구십일일일",
      id: 3,
    },
  ];

  return (
    <div className="list">
      {demoData.map((item) => (
        <Link key={item.id} to={`/detailapart/${item.id}`} className="list-item">
          <div className="list-image">
            <div className="placeholder-box"></div>
          </div>
          <div className="list-details">
            <div className="list-title">{item.title}</div>
            <div className="list-price">{item.price}</div>
            <div className="list-deta">
              <div className="list-location">{item.content}</div>
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
