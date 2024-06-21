import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { MessageEventTypes } from '../../services/message-type-store/message-event-types';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrl: './login-window.component.css',
})
export class LoginWindowComponent {
  public login_header = 'Login';
  public emailValue!: string;
  public passwordValue!: string;

  constructor(
    private socket: Socket,
    private router: Router,
  ) {}

  callLogin() {
    console.log('Login Called');
    this.socket.emit('sign_in');
  }

  callRegister() {
    this.router.navigateByUrl('/register');
  }
}
