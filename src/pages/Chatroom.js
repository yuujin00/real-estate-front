import React, { useState, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axios from "../api/axios";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";


const Chatroom = ({ saleNo, createMember }) => {
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `/chatroom/${chatRoomId}`
        );
        const chatList = response.data.chatList;
        // 이전 채팅 내역을 메시지로 변환하여 상태에 설정
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

    if (chatRoomId) {
      fetchChatHistory();
    }
  }, [chatRoomId]);

  // 가짜 내역
  useEffect(() => {
    const fakeChatHistory = [
      {
        message: "안녕하세요!",
        direction: "incoming"
      },
      {
        message: "안녕하세요! 반갑습니다.",
        direction: "outgoing"
      },
      {
        message: "좋은 아침이에요.",
        direction: "incoming"
      },
      {
        message: "네, 맞아요. 좋은 아침입니다!",
        direction: "outgoing"
      }
    ];

    const formattedMessages = fakeChatHistory.map(chat => ({
      model: {
        message: chat.message,
        direction: chat.direction === "outgoing" ? "outgoing" : "incoming",
      },
    }));
    setMessages(formattedMessages);
  }, []);

  useEffect(() => {
    const createChatRoom = async () => {
      try {
        const response = await axios.post(
          "/chatroom",
          {
            saleNo,
            createMember,
          }
        );
        setChatRoomId(response.data.id);
      } catch (error) {
        console.error("Error creating chat room:", error);
      }
    };

    createChatRoom();
  }, [saleNo,createMember]);

  const handleSend = async (input) => {
    try {
      await axios.post(`/chatroom/message`, {
        chatNo: chatRoomId,
        contentType: "text",
        content: input,
        saleNo
      });
      // 사용자가 보낸 메시지를 화면에 표시
      setMessages([
        ...messages,
        {
          model: {
            message: input,
            direction: "outgoing",
          },
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendd = (input) => {
    try {
      // 사용자가 보낸 메시지를 화면에 표시
      setMessages([
        ...messages,
        {
          model: {
            message: input,
            direction: "outgoing",
          },
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div style={{ position: "relative", height: "500px" }}>
        <h2>채팅방 정보</h2>
        <p>닉네임: {saleNo}</p>
        <p>매물 번호: {createMember}</p>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((item, index) => (
                <Message key={index} model={item.model}>
                  {/* 사용자와 상대방의 채팅 메시지를 다르게 스타일링 */}
                  {item.avatar ? (
                    <Avatar src={item.avatar.src} name={item.avatar.name} />
                  ) : null}
                </Message>
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chatroom;
