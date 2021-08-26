import { server } from '../../index';

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

export { io };
