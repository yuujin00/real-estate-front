import React, { useState, useEffect } from 'react';
import instance from '../api/axios';
import styled from 'styled-components'; // Import styled-components
import { Grid, Button } from '../components';

// Styled components
const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NoRooms = styled.p`
  text-align: center;
  color: #999;
`;

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`
      };

      const response = await instance.get(
        '/chatroom', 
        { headers }
      );
      
      console.log('Chat information API:', response.data);
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <Container>
      <Title>채팅방 목록</Title>
      <Grid>
        {chatRooms.length > 0 ? (
          <List>
            {chatRooms.map(chatRoom => (
              <ListItem key={chatRoom.chatNo}>
                채팅방 ID: {chatRoom.chatNo}, 매물 번호: {chatRoom.saleNo}, 매물 제목: {chatRoom.saleTitle}, 최근 메시지: {chatRoom.latestMessage?.context || "No messages"}
              </ListItem>
            ))}
          </List>
        ) : (
          <NoRooms>No chat rooms available.</NoRooms>
        )}
      </Grid>
    </Container>
  );
};

export default Chat;
