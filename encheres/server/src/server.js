// server.js

import http from 'http';
import { Server as IOServer } from 'socket.io';
import IOController from './controller/ioController.js';
import RequestController from './controller/RequestController.js';

const server = http.createServer(
  (request, response) => new RequestController(request, response).handleRequest()
);

const io = new IOServer(server);
const ioController = new IOController(io);
io.on('connection', socket => ioController.registerSocket(socket));
server.listen(8080);

