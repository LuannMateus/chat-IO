import { ChangeEvent, useState } from 'react';
import { io } from 'socket.io-client';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { v4 as uuid } from 'uuid';

import './styles.scss';

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
        <p
          key={index}
          className={`${
            user === message.id
              ? 'global-chat__message--mine'
              : 'global-chat__message--other'
          }`}
        >
          {message.value}
        </p>
      );
    });
  };

  return (
    <main id="main">
      <span className="main__create-room">Create a room</span>
      <h1 className="main__title">Global chat</h1>

      <section className="main__global-chat">
        {renderChatMessages()}
        {/* <p className="global-chat__message--mine">John Doe: HI Marie!</p>
        <p className="global-chat__message--other">Marie Doe: HI John!</p> */}
      </section>

      <section className="main__action">
        <Input
          type="text"
          placeholder="Message..."
          onChange={handleInputChange}
          value={messageInput}
        />
        <Button onClick={handleSubmit}>Send</Button>
      </section>
    </main>
  );
};

export default Home;
