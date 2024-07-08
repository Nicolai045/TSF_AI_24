import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  private userName!: string;
  private email!: string;

  public getCurrentUserName() {
    return this.userName;
  }

  public getCurrentUserMail() {
    return this.email;
  }

  public setCurrentUserName(userName: string) {
    this.userName = userName;
  }

  public setCurrentUserEmail(email: string) {
    this.email = email;
  }
}
