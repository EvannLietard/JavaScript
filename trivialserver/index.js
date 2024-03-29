import http from 'http';
import RequestController from './RequestControler.js';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest());

server.listen(8080);