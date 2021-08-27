import { ChangeEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Chat } from '../../components/Chat';
import { Header } from '../../components/Header';

import './styles.scss';

const roomId = window.location.pathname.split('/')[2];

const socket = io('http://localhost:3001');
socket.on('connect', () => {
  console.log('Connected');
  socket.emit('join', roomId);
});

const user = uuid();

type Message = {
  id: string;
  value: string;
  room: string;
};

const Room = () => {
  const { id: roomId } = useParams<{ id: string }>();

  const [chatName, setChatName] = useState<string>('');
  const [messageInput, setMessageInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  socket.on('message-sent-by-user', (data) => {
    setChatMessages([...chatMessages, data]);
  });

  useEffect(() => {
    const room = localStorage.getItem(roomId) ?? '';

    const roomName = JSON.parse(room) as { name: string };

    setChatName(roomName.name);
  }, [roomId]);

  const handleInputChange = (currentValue: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(currentValue.currentTarget.value);
  };

  const handleSubmit = () => {
    const message = {
      id: user,
      value: messageInput,
      room: roomId,
    };

    if (!message?.value.trim()) {
      return;
    }

    socket.emit('send-message.room', message);

    setChatMessages([...chatMessages, message]);

    setMessageInput('');
  };

  const renderChatMessages = () => {
    return chatMessages.map((message: Message, index) => {
      return (
        <div
          key={index}
          className={`${
            user === message.id
              ? 'global-chat__message--mine'
              : 'global-chat__message--other'
          }`}
        >
          <p>
            {message.value}
            <span>{format(new Date(), 'hh:mm')}</span>
          </p>
        </div>
      );
    });
  };

  return (
    <>
      <Header />
      <main id="main">
        <h1 className="main__title">{chatName} | Room chat</h1>

        <Chat>{renderChatMessages()}</Chat>

        <section className="main__action">
          <Input
            type="text"
            placeholder="Message..."
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') handleSubmit();
            }}
            value={messageInput}
          />
          <Button onClick={handleSubmit}>Send</Button>
        </section>
      </main>
    </>
  );
};

export default Room;
