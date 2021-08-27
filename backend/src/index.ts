import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();

export const server = http.createServer(app);

import './infra/socketIo/globalChat';
import './infra/socketIo/roomChat';

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;
const HOSTNAME = 'localhost';

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is Running in http://localhost:3001
  `);
});
