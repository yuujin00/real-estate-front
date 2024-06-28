import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Stomp } from "@stomp/stompjs";


const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "/chatroom",
        {
          headers: headers,
        }
      );
      setChatRooms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setMessages(room.messages);
    navigate(`/chatroom/${room.propertyId}`);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    const newMsg = { sender: 'User1', text: newMessage, timestamp: new Date().toLocaleString() };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  // const chatRooms = [
  //   {
  //     id: 1,
  //     name: 'Room 1',
  //     messages: [
  //       { sender: 'User1', text: 'Hello!', timestamp: '9:00 AM' },
  //       { sender: 'User2', text: 'Hi there!', timestamp: '9:02 AM' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Room 2',
  //     messages: [
  //       { sender: 'User1', text: 'How are you?', timestamp: '10:00 AM' },
  //       { sender: 'User2', text: 'I\'m good, thank you!', timestamp: '10:05 AM' },
  //     ],
  //   },
  // ];

  return (
    <Container>
      <ChatRoomList>
        {chatRooms.map((room) => (
          <ChatRoomItem key={room.chatNo} onClick={() => handleRoomSelect(room)}>
            {room.chatNo}
          </ChatRoomItem>
        ))}
      </ChatRoomList>
      {selectedRoom && (
        <div>
          {messages.map((msg, index) => (
            <ChatBubble key={index}>
              <strong>{msg.sender}:</strong> {msg.text} <span style={{ fontSize: '0.8em', color: '#666' }}> ({msg.timestamp})</span>
            </ChatBubble>
          ))}
          <InputContainer>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </InputContainer>
        </div>
      )}
    </Container>
  );
};

export default Chat;



const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const ChatRoomList = styled.div`
  margin-bottom: 20px;
`;

const ChatRoomItem = styled.div`
  background-color: #f0f0f0;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
`;

const ChatBubble = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 10px 20px;
  border-radius: 8px;
`;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;