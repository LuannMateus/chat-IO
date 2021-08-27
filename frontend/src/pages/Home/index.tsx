import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import './styles.scss';
import { Chat } from '../../components/Chat';
import { Header } from '../../components/Header';

const socket = io('http://localhost:3001');
socket.on('connect', () => {});

const user = uuid();

type Message = {
  id: string;
  value: string;
};

const Home = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  socket.on('global.chat', (data) => {
    setChatMessages([...chatMessages, data]);
  });

  const handleInputChange = (currentValue: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(currentValue.currentTarget.value);
  };

  const handleSubmit = () => {
    const message = {
      id: user,
      value: messageInput,
    };

    if (!message?.value.trim()) {
      return;
    }

    socket.emit('global.chat', message);

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
        <Link to="/createRoom" className="main__create-room">
          <span className="main__create-room">Create a room</span>
        </Link>
        <h1 className="main__title">Global chat</h1>

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

export default Home;
