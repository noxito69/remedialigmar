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
    passwordConfirm: new FormControl('', Validators.required),
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
  get passwordConfirm(){
    return this.registerForm.get('passwordConfirm') as FormControl;
  }

  constructor(private fb: FormBuilder) { }



    onSubmit():void {
      console.warn(this.registerForm.value);
  }



  

}