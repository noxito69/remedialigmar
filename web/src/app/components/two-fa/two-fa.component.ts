import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/user-data';
import { SpinnerComponent } from '../spinner/spinner.component';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-two-fa',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './two-fa.component.html',
  styleUrl: './two-fa.component.css'
})
export class TwoFAComponent {
  constructor (private router : Router, private LS:LoginService){
  }
  public errorMessage: string|null = null
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
          this.errorMessage = error.error || error.error;
          console.log(error.error.two_factor_code)
          Swal.fire({
            title: 'Error!',
            text: this.errorMessage||"",
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          this.isLoading = false;  
        }
    );}
}
