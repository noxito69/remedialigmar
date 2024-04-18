import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../interfaces/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }
  private logoutUrl = `${api}/user/logout`;

  logout() {
    return this.http.get('');
  }
  consumirlogout(): Observable<any>{
    return this.http.post<any>(this.logoutUrl, {})
  }
}

