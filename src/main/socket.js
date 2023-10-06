import { serverUrl } from './config';
const io = require('socket.io-client');

export class ClientSocket {
  constructor() {
    this.socket = io(serverUrl);
  }
  static getInstance() {
    if (!ClientSocket.instance) {
      ClientSocket.instance = new ClientSocket();
    }
    return ClientSocket.instance;
  }
  close() {
    this.socket.close();
  }
  subscribe(msg, callback) {
    console.log('subscribe to socket');
    this.socket.on(msg, data => {
      callback(data);
    });
  }

  sendMessage(msg, data) {
    this.socket.emit(msg, data);
  }
}
