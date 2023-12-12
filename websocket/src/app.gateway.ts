import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: any): void {
    const { msg, nickname } = data;
    // this.server.emit(
    //   'message',
    //   `client-${socket.id.substring(0, 4)} : ${data}`,
    // );
    socket.broadcast.emit('message', `${nickname}: ${msg}`);
  }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
  constructor(private readonly chatGateway: ChatGateway) {}
  rooms = [];

  @WebSocketServer() server: Server;

  @SubscribeMessage('createRoom')
  handleCreateRoom(@MessageBody() data: any) {
    const { nickname, room } = data;
    this.chatGateway.server.emit('notice', {
      msg: `${nickname}님이 ${room}방을 만들었습니다.`,
    });
    this.rooms.push(room);
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('joinRoom')
  handelJoinRoom(socket: Socket, data: any) {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);
    this.chatGateway.server.emit('notice', {
      msg: `${nickname}님이 ${room}방에 입장했습니다.`,
    });
    socket.join(room);
  }

  @SubscribeMessage('message')
  handelMessageToRoom(socket: Socket, data: any) {
    const { nickname, room, msg } = data;
    socket.broadcast.to(room).emit('message', { msg: `${nickname}: ${msg}` });
  }
}
