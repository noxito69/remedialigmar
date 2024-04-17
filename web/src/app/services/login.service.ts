import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../interfaces/env';
import { User } from '../interfaces/user';
import { LoginReturn } from '../interfaces/login-return';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { 
  }
  private loginUrl = `${api}/auth/login`;
  private verificarCodigo = `${api}/auth/verify-two-factor-code`

  consumirLogin(User:User):Observable<LoginReturn>{
    return this.http.post<LoginReturn>(this.loginUrl, User)
  }

  consumirTwoFactor(two_factor_code: Number): Observable<any>{
    return this.http.post<UserData>(this.verificarCodigo, {two_factor_code: two_factor_code})
  }
  
}
