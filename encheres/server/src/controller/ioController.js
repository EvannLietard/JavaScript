// ./controllers/ioController.js
import { Server } from 'socket.io';

export default class IOController {
    #io;
    #clients;
    #auctioneer;
    #lastBidSocket ;

  
    constructor(io) {
      this.#io = io;
      this.#clients = new Map();
      this.#auctioneer={id:"",bool:false}; 
      this.#lastBidSocket = null;
    }
  
    registerSocket(socket) {
      console.log(`new connection with id ${socket.id}`);
      this.setupListeners(socket);
      socket.emit("welcome"); 
    }
    setupListeners(socket) {
        socket.on( 'greatings' , (value) => this.greatings(socket, value));
        socket.on('start', (objet, value) => this.start(objet, value));
        socket.on('price', (value, idSocket) => this.newAuction(socket, value, idSocket));
        socket.on('montant', (montant) => this.#io.emit('montant', montant));
        socket.on('end', () => this.#io.emit('end',this.#lastBidSocket));
        socket.on( 'disconnect' , () => this.leave(socket) );
        socket.on('endAuction', () => this.endAuction());
        socket.on('lastbid', (idSocket) => this.#lastBidSocket = idSocket);
  

      }
    greatings(socket,value) {
      console.log(`greatings ${value} id: ${socket.id}`);
      if (value=== 'auctioneer') {
      this.haveAuctioneer(socket);} 
      this.#clients.set(socket.id, socket); 
      //console.log(this.#auctioneer) ;

     }
     haveAuctioneer(socket) {
      if (!this.#auctioneer.bool) {
          this.#auctioneer.id = socket.id;
          this.#auctioneer.bool = true;
          socket.emit('auctioneerStatus', { isAuctioneer: true });
      } else {
          socket.emit('auctioneerStatus', { isAuctioneer: false });
      } 
  }
  start(objet, value){
    this.#io.emit('start', objet, value);
  } 

  newAuction (socket, value, idSocket){
    this.#io.emit('price',value, idSocket); 
    socket.broadcast.emit('suite', value ,idSocket);
    //console.log(this.#lastBidSocket);
  }

  leave(socket) {
      console.log(`Déconnexion de ${socket.id}`);
      this.#clients.delete(socket.id);

      if (this.#auctioneer.bool && this.#auctioneer.id === socket.id) {
          this.#auctioneer.id = "";
          this.#auctioneer.bool = false;
      }
      console.log(this.#auctioneer) ;
  }
  endAuction() {
    this.#io.emit('endAuction');
}

    
  }
  