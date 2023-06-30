import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5736, {
  cors: true,
})
export class EventGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly eventService: EventService) {}
  @WebSocketServer() server: Server;


  // handle connect socket 
  handleConnection(client: Socket) {
    console.log(`Connected client id : ${client.id}`)
  }

  // handle disconnect
  handleDisconnect(client: Socket) {
    console.log(`client id : ${client.id}`)
  }
}
