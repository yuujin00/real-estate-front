import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import { Stomp } from "@stomp/stompjs";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import UnderBar from '../components/Bar/MainUnderBar.js';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

import SockJS from 'sockjs-client';
import StompJs, {Message as MessageType, Client} from '@stomp/stompjs';
const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [message, setMessage] = useState("");
  const createMember = localStorage.getItem('userInfo');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    createChatRoom();
    connect();
    return () => disconnect();
  }, []);

  useEffect(() => {
    if (chatRoomId) {
      fetchChatHistory();
    }
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connect = () => {
    const socket = new WebSocket("ws://localhost:3000/chat");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/sub/chatroom/${chatRoomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            model: {
              message: newMessage.message,
              direction: newMessage.senderSeq === createMember ? "outgoing" : "incoming",
            },
          },
        ]);
      });
    });
    console.log("방 번호", chatRoomId);
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  const createChatRoom = async () => {
    console.log('Chatroom', id);
    try {
      const response = await axios.post("/chatroom", {
        saleNo: id,
        createMember,
      });
      setChatRoomId(response.data.id);
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`http://3.35.10.79:8080/chatroom/${chatRoomId}`);
      const chatList = response.data.chatList;
      const formattedMessages = chatList.map(chat => ({
        model: {
          message: chat.message,
          direction: chat.direction === "outgoing" ? "outgoing" : "incoming",
        },
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleSend = async (input) => {
    try {
      if (stompClient.current && stompClient.current.connected && input) {
        const messageObj = {
          chatroomSeq: chatRoomId,
          senderSeq: createMember,
          message: input,
        };
        stompClient.current.send(`/pub/message`, {}, JSON.stringify(messageObj));
        setMessages([
          ...messages,
          {
            model: {
              message: input,
              direction: "outgoing",
            },
          },
        ]);
      } else {
        console.error("STOMP client is not connected.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  return (
    <div>
      <div style={{ position: "relative", height: "500px" }}>
        <h2>채팅방 정보</h2>
        <p>닉네임: {createMember}</p>
        <p>매물 번호: {id}</p>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((item, index) => (
                <Message key={index} model={item.model}>
                  {item.avatar ? (
                    <Avatar src={item.avatar.src} name={item.avatar.name} />
                  ) : null}
                </Message>
              ))}
              <div ref={messagesEndRef} />
            </MessageList>
            <MessageInput
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chatroom;
