import { Socket } from 'socket.io';
import { io } from '.';

type Message = {
  id: string;
  message: string;
  room: string;
};

io.on('connection', (socket: Socket) => {
  socket.on('join', (room) => {
    socket.join(room);

    socket.broadcast.emit('new-room', room);
  });

  socket.on('send-message.room', (data: Message) => {
    socket.in(data.room).emit('message-sent', data);
    socket.broadcast.to(data.room).emit('message-sent-by-user', data);
  });
});
