import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get('http://3.35.10.79:8080/chatroom');
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div>
      <h1>채팅방 목록</h1>
      <ul>
        {chatRooms.map(chatRoom => (
          <li key={chatRoom.id}>
            채팅방 ID: {chatRoom.id}, 매물 번호: {chatRoom.saleNo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
