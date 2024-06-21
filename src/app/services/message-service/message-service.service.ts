import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MessageEventTypes } from '../message-type-store/message-event-types';

@Injectable({
  providedIn: 'root',
})
export class MessageServiceService {
  constructor(private socket: Socket) {}

  public sendMessage(messageType: MessageEventTypes, data: any) {
    this.socket.emit(messageType);
  }
}
