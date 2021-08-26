import { Socket } from 'socket.io';
import { io } from '.';

type Message = {
  id: string;
  message: string;
};

io.on('connection', (socket: Socket) => {
  socket.on('global.chat', (data: Message) => {
    socket.broadcast.emit('global.chat', data);
  });
});
