import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { LoginData } from '../../models/LoginData';
import { UserData } from '../../models/UserData';

@Injectable({
  providedIn: 'root',
})
export class CrudMessageService {
  baseServerUrl = 'http://127.0.0.1:4600/';

  constructor(private http: HttpClient) {}

  public createUserPost(userData: UserData): Observable<any> {
    return this.http.post(`${this.baseServerUrl}crud/create_user`, {
      data: userData,
    });
  }

  public loginUserPost(loginData: LoginData): Observable<any> {
    return this.http.post(`${this.baseServerUrl}crud/login_user`, {
      data: loginData,
    });
  }
}
