import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required),
  });

  get username(){
    return this.registerForm.get('username') as FormControl;
  }
  get email(){
    return this.registerForm.get('email') as FormControl;
  }
  get password(){
    return this.registerForm.get('password') as FormControl;
  }
  get password_confirmation(){
    return this.registerForm.get('password_confirmation') as FormControl;
  }

  
  constructor(private fb: FormBuilder, private registerService: RegisterService) { }


  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.username.value, this.email.value, this.password.value, this.password_confirmation.value)
        .subscribe(
          response => {
            console.log("Registro exitoso", response);
            // Aquí podrías redirigir al usuario a una página de inicio de sesión o a otra página de tu aplicación.
          },
          error => {
            console.error("Error en el registro", error);
            // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario.
          }
        );
    }
  }

    



  

}
