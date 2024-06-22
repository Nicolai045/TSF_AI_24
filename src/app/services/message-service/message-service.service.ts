import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MessageEventTypes } from '../message-type-store/message-event-types';
import { UserData } from '../../models/UserData';
import { LoginData } from '../../models/LoginData';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageServiceService {
  constructor(private socket: Socket) {}

  public sendMessage(messageType: MessageEventTypes, data: any) {
    this.socket.emit(messageType);
  }

  public createUser(userData: UserData) {
    return this.socket
      .emit('create_user', userData)
      .pipe(map((data: any) => data));

    this.socket.emit('create_user', userData);
  }

  public loginInUser(loginData: LoginData) {
    return this.socket.fromEvent('response').pipe(map((data: any) => data));
  }

  public testTransfer(loginData: LoginData) {
    const headers: Headers = new Headers();
    // Add a few headers
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    // Add a custom header, which we can use to check
    headers.set('X-Custom-Header', 'CustomValue');

    // Create the request object, which will be a RequestInfo type.
    // Here, we will pass in the URL as well as the options object as parameters.
    const request: RequestInfo = new Request('./users.json', {
      method: 'GET',
      headers: headers,
    });

    // For our example, the data is stored on a static `users.json` file
    return (
      fetch(request)
        // the JSON body is taken from the response
        .then((res) => res.json())
        .then((res) => {
          // The response has an `any` type, so we need to cast
          // it to the `User` type, and return it from the promise
          return res;
        })
    );
  }
}
