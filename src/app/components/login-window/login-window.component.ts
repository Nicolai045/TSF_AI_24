import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
//import { MessageEventTypes } from '../../services/message-type-store/message-event-types';
import { Socket } from 'ngx-socket-io';
import { MessageServiceService } from '../../services/message-service/message-service.service';
import { CrudMessageService } from '../../services/crud-message/crud-message.service';
import { LoginWindowMessages } from './login-window-messages';
import { UserDataService } from '../../services/user-data/user-data.service';
import { logoImage } from '../../constantStore/logoB64';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrl: './login-window.component.css',
})
export class LoginWindowComponent {
  public login_header = 'Login';
  public emailValue!: string;
  public passwordValue!: string;
  public errorLabelText!: string;
  public logoImage!: string;

  constructor(
    private socket: Socket,
    private router: Router,
    private messageService: MessageServiceService,
    private crudMessage: CrudMessageService,
    private changeRef: ChangeDetectorRef,
    private userDataService: UserDataService,
  ) {
    this.logoImage = logoImage;
  }

  async callLogin() {
    await this.checkForDispatch();
  }

  callRegister() {
    this.nagivateToRegister();
  }

  async checkForDispatch() {
    if (
      this.emailValue == null ||
      this.emailValue.length <= 0 ||
      this.passwordValue == null ||
      this.passwordValue.length <= 0
    ) {
      this.errorLabelText = LoginWindowMessages.fillInAllFieldsError;
      return;
    }
    this.dispatchLogin();
  }

  dispatchLogin() {
    this.crudMessage
      .loginUserPost({
        email: this.emailValue,
        password: this.passwordValue,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/main-window');
          this.userDataService.setCurrentUserEmail(this.emailValue);
        },
        error: (data) => {
          if (data?.error?.message?.length > 0) {
            this.errorLabelText = data.error.message;
          } else {
            this.errorLabelText = LoginWindowMessages.generalServerError;
          }
        },
      });
  }

  navigateToMainPage() {}

  nagivateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
