import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Stomp, Client } from "@stomp/stompjs";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";


const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);

  // 사용자 정보
  const [userInfo, setUserInfo] = useState({
      id: localStorage.getItem('userInfo'),
      email: localStorage.getItem('userEmail'),
      name: null,
      avatar: null,
    }
  )

  const { id } = useParams();
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  // 최초 렌더링 시 채팅방 생성
  useEffect(() => {
    createChatRoom(); // 채팅방 생성
  }, []);
  
  // 채팅방이 생성되면 웹소켓 연결 및 채팅 기록 불러오기
  useEffect(() => {
    if (chatRoomId) {
      connect(); // 웹소켓 연결
      fetchChatHistory(); // 채팅 기록 불러오기
    }

    return () => disconnect();
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connect = () => {
    // 연결되어있는 경우 먼저 연결 해제
    disconnect();

    const socket = new WebSocket("ws://localhost:3000/chat"); //주소변경 필요
    stompClient.current = Stomp.over(socket); // STOMP 클라이언트 생성

    // 연결
    stompClient.current.connect({}, () => {
      //주소 변경 필
      stompClient.current.subscribe(`/sub/chatroom/${chatRoomId}`, (message) => {
        const newMessage = JSON.parse(message.body); // 받은 메시지 파싱

        // 받은 메시지를 메시지 목록에 추가
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            model: {
              message: newMessage.content,
              direction: newMessage.senderNo === userInfo.id ? "outgoing" : "incoming", // 메시지 송수신 여부
            },
          },
        ]);
      });
    });
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  const createChatRoom = async () => {
    console.log('Chatroom', id);
    try {
      const response = await axios.post("/chatroom");

      // 채팅방 생성 후 채팅방 ID와 사용자 정보 설정
      setUserInfo((prevUserInfo) => {
        return {
          ...prevUserInfo,
          name: response.data[0].participant.username,
        }
      })
      setChatRoomId(response.data.id);
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
    setChatRoomId(id);
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`http://3.35.10.79:8080/chatroom/${chatRoomId}`);
      const chatList = response.data.chatList;
      const formattedMessages = chatList.map(chat => ({
        model: {
          message: chat.content,
          direction: chat.senderNo === userInfo.id ? "outgoing" : "incoming",
        },
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // 메시지 전송
  const handleSend = async (input) => {
    try {
      if (stompClient.current && stompClient.current.connected && input) {

        // 메시지 객체 생성
        const messageObj = {
          chatNo: chatRoomId,
          contentType: "text",
          content: input,
          senderName: userInfo.name,
          senderNo: userInfo.id,
          saleNo: id,
          readCount: 2,
          senderEmail: userInfo.email,
        };
        
        // 메세지 전송
        stompClient.current.send(`/message`, {}, JSON.stringify(messageObj));
        // await axios.post("http://3.35.10.79:8080/chatroom/notification", messageObj ) // 기타 설명에 추가 request 요청

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
        <p>닉네임: { userInfo.name || userInfo.id }</p>
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