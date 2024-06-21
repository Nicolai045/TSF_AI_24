import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  callConfirm() {}

  callCancel() {
    this.backToLogin();
  }

  backToLogin() {
    this.router.navigateByUrl('/login');
  }
}
