import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';
import { LoginReturn } from '../../interfaces/login-return';
import { Route, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import Swal from 'sweetalert2'

-SpinnerComponent
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormsModule, CommonModule,RouterModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor (private LS: LoginService, private router:Router){}
  public errorMessage: string|null = null;
  public isLoading: boolean = false;

  public form = new FormGroup({
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  public User : User = {
    email:'', password:''
  }

  public LoginReturn:LoginReturn ={
    msg:'', token: ''
  }

  get email(){
    return this.form.get("email") as FormControl
  }
  get password(){
    return this.form.get("password") as FormControl
  }

  onSubmit() {
    this.isLoading = true;
    this.User.email = this.email.value;
    this.User.password = this.password.value;
    this.LS.consumirLogin(this.User).subscribe(
      (response)=>{
        console.log(response)
        this.LoginReturn.msg = response.msg
        this.LoginReturn.token = response.token
        localStorage.setItem('token', response.token)
        setTimeout(()=>{
          this.router.navigate(['/T2A'])
        })
        this.isLoading = false;
      }, (error)=>{
        this.errorMessage = error.error || error.error;
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: this.errorMessage||"",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        this.isLoading = false;
      }
    )
  }

}
