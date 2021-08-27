import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { io } from 'socket.io-client';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import './styles.scss';

const roomId = uuid();

const socket = io('http://localhost:3001');

type Room = {
  id: string;
  name: string;
};

const CreateRoom = () => {
  const history = useHistory();
  const [roomName, setRoomName] = useState<string>('');

  const handleCreateRoom = (): void => {
    if (!roomName.trim()) {
      return;
    }

    localStorage.setItem(
      roomId,
      JSON.stringify({
        name: roomName,
      })
    );

    const room = {
      id: roomId,
      name: roomName,
    } as Room;

    socket.emit('join', room);

    history.push(`/room/${roomId}`);
  };

  return (
    <>
      <Header />
      <main id="main__create-room">
        <h1 className="create-room__title">Create Room</h1>

        <section className="create-room__room__url">
          <label htmlFor="room-url">Room URL: </label>
          <Input id="room-url" value={roomId} disabled />
        </section>

        <section className="create-room__information">
          <Input
            placeholder="Room name"
            value={roomName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setRoomName(event.target.value)
            }
          />
        </section>

        <section className="create-room__action">
          <Button onClick={handleCreateRoom}>CREATE</Button>
        </section>
      </main>
    </>
  );
};

export default CreateRoom;
