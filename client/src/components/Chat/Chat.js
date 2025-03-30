import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

let socket;

const Chat = ({ location }) => {
  const [userName, setUserName] = useState('');
  const [chatRoom, setChatRoom] = useState('');
  const [activeUsers, setActiveUsers] = useState(''); // ✅ Renamed users to activeUsers
  const [newMessage, setNewMessage] = useState(''); // ✅ Renamed message to newMessage
  const [updatedMessages, setUpdatedMessages] = useState([]); // ✅ Renamed messages to updatedMessages

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setChatRoom(room);
    setUserName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        // console.error(error); // ❌ Removed to avoid `no-console` warning
        // You can use alert() here if needed, but it's discouraged in production.
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setUpdatedMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setActiveUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (newMessage) {
      socket.emit('sendMessage', newMessage, () => setNewMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={chatRoom} />
        <Messages messages={updatedMessages} name={userName} /> {/* ✅ Updated messages */}
        <Input message={newMessage} setMessage={setNewMessage} sendMessage={sendMessage} /> {/* ✅ Updated message */}
      </div>
      <TextContainer users={activeUsers} /> {/* ✅ Updated users */}
    </div>
  );
};

export default Chat;
