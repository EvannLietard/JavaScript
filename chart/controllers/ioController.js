// ./controllers/ioController.js
import { Server } from 'socket.io';

export default class IOController {
    #io;
    #clients;
    #timers;
  
    constructor(io) {
      this.#io = io;
      this.#clients = new Map();
      this.#timers= new Map(); 
    }
  
    registerSocket(socket) {
      console.log(`new connection with id ${socket.id}`);
      this.setupListeners(socket);
    }
    setupListeners(socket) {
        socket.on( 'greatings'  , () => this.greatings(socket) );
        socket.on( 'disconnect' , () => this.leave(socket) );
      }

    setupRandomNumberSender() {
      setInterval(() => {
        this.sendRandomNumberToClientsDiff();
      }, 2000);
    }
    //Meme chiffre pour tous les socket du au io.emit
    /*sendRandomNumberToClients() {
      if (this.#io) {
        const randomNumber = this.generateRandomNumber();
        console.log('new number ',randomNumber);
        this.#io.emit('newData', randomNumber);
      }
    }*/
    sendRandomNumberToClientsDiff() {
      for (const [clientId, socket] of this.#clients) {
        const randomNumber = this.generateRandomNumber();
        console.log(`new number for ${socket.id}`, randomNumber);
        socket.emit('newData', randomNumber);
    }
      } 
      
      generateRandomNumber() {
        return Math.floor(Math.random() * (7)) + 2;
      }


    greatings(socket) {
      console.log(`greatings received from (id: ${socket.id})`);
      this.#clients.set(socket.id, socket);
      socket.emit('welcome');
      socket.emit('ping');
      socket.on('pong', () => {
          console.log(`pong received from ${socket.id}`);
      });
      const timerId = setInterval(() => {
        this.sendRandomNumberToClientsDiff();

      }, 2000);
      this.#timers.set(socket.id, timerId);
  }
  
      leave(socket) {
        console.log(`disconnection from ${socket.id}`);
        // Récupérer et arrêter le timer associé à ce client
        const timerId = this.#timers.get(socket.id);
        if (timerId) {
            clearInterval(timerId);
            this.#timers.delete(socket.id); // Retirer le timer de la Map
        }
        // Retirer le client de la Map
        this.#clients.delete(socket.id);
    }
    
  }
  