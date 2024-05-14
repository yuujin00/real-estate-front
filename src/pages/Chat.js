import React, { useState, useEffect } from 'react';
import instance from '../api/axios';
import { Grid, Img, Button } from '../components/index.js';

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
      Authorization: `Bearer ${token}`,
      };
    
      const response = await instance.post('/chatroom', {
      headers,
      });
      console.log('채팅 정보 api', response.data);
      return response.data.data; 
    } catch (error) {
      console.error('Error fetching data from API: ', error);
      throw error;
    }};

  useEffect(() => {
  }, []);

  return (
    <div>
      <Grid>  </Grid>
      <h1>채팅방 목록</h1>
      <Button children='RegisStart' onClick={fetchChatRooms} ></Button>
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
