import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as IOServer } from 'socket.io';
import IOController from './controllers/ioController.js';


const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);
/*

const connectionListener = socket => {
	console.log(`connection with id ${socket.id} at ${new Date().toLocaleTimeString()}`);
	socket.on('pong',
			  () => {
				console.log(`pong recu par ${socket.id}`);
				socket.emit('ping');
			  });
  }*/
  
const io = new IOServer(server);
const ioController = new IOController(io);
io.on('connection', socket => ioController.registerSocket(socket)  );
	/*io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    setInterval(() => sendRandomNumber(socket), 2000);

    connectionListener(socket);

});*/


server.listen(8080);
