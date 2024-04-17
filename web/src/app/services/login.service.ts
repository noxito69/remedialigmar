import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../interfaces/env';
import { User } from '../interfaces/user';
import { LoginReturn } from '../interfaces/login-return';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { 
  }
  private loginUrl = `${api}/auth/login`

  consumirLogin(User:User):Observable<LoginReturn>{
    return this.http.post<LoginReturn>(this.loginUrl, User)
  }
  
}
