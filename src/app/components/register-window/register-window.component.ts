import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginWindowMessages } from '../login-window/login-window-messages';
import { CrudMessageService } from '../../services/crud-message/crud-message.service';
import { UserData } from '../../models/UserData';

@Component({
  selector: 'app-register-window',
  templateUrl: './register-window.component.html',
  styleUrl: './register-window.component.css',
})
export class RegisterWindowComponent {
  public firstNameValue: any;
  public lastNameValue: any;
  public emailValue: any;
  public passwordValue: any;
  public errorLabelText!: string;

  constructor(
    private router: Router,
    private crudMessageService: CrudMessageService,
  ) {}

  callConfirm() {
    this.checkForDispatch();
  }

  checkForDispatch() {
    const values = [
      this.firstNameValue,
      this.lastNameValue,
      this.emailValue,
      this.passwordValue,
    ];
    for (const value of values) {
      if (value == null || value.length <= 0) {
        this.errorLabelText = LoginWindowMessages.fillInAllFieldsError;
        return;
      }
    }
    this.dispatchRegister();
  }

  dispatchRegister() {
    this.crudMessageService
      .createUserPost({
        firstName: this.firstNameValue,
        lastName: this.lastNameValue,
        email: this.emailValue,
        password: this.passwordValue,
      } as UserData)
      .subscribe({
        next: () => {
          this.backToLogin();
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

  callCancel() {
    this.backToLogin();
  }

  backToLogin() {
    this.router.navigateByUrl('/login');
  }
}
