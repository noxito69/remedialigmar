import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(username:string, email:string,password:string,password_confirmation:string){

    return this.http.post('http://127.0.0.1:8000/api/auth/register',{

    name: username,
    email: email,
    password: password,
    password_confirmation: password_confirmation

    });

  }

}
