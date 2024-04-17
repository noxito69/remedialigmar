import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/user-data';

@Component({
  selector: 'app-two-fa',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './two-fa.component.html',
  styleUrl: './two-fa.component.css'
})
export class TwoFAComponent {
  constructor (private router : Router, private LS:LoginService){
  }
  
  public message: string|null = null
  codigo: Number = 0
  public user: UserData = {
    message:"",
    data: {
      id: 0,
      name: "",
      email: "",
    },
    token: ""
  }
  public isLoading: boolean = false;

  user_id: Number = 0
  onSubmit(codigo: string) {
    const codigoEntero: number = parseInt(codigo);
    this.isLoading = true;  

    this.LS.consumirTwoFactor(codigoEntero).subscribe(
        (response) => {
            console.log(response);
            this.user.data.id = response.data.id;
            this.user.data.name = response.data.name;
            this.user.data.email = response.data.email;
            this.user.token = response.token;
            this.user_id = response.data.id;

            localStorage.setItem('token', response.token)

            this.router.navigate(['index'])
            this.isLoading = false;

        },
        (error) => {
          console.log(error.error.two_factor_code)
          
          this.message = error.error
          if(error.message == "Unauthenticated."){
            this.message = "Usuario no autenticado"
            
          } 
          if(error.error.two_factor_code){
            this.message = "El codigo de autenticación debe ser ingresado"
          }
          this.isLoading = false;  
        }
    );}
}
